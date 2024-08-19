package backend.hanpum.config.s3;

import backend.hanpum.exception.exception.s3.FileDeleteFailedException;
import backend.hanpum.exception.exception.s3.FileFormatUnsupportedException;
import backend.hanpum.exception.exception.s3.FilePutFailedException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3ImageService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String uploadImage(MultipartFile multipartFile) {
        this.validateImageFileExtension(multipartFile.getOriginalFilename());
        try {
            return this.uploadImageToS3(multipartFile);
        } catch (IOException e) {
            throw new FilePutFailedException();
        }
    }

    private void validateImageFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new FileFormatUnsupportedException();
        }

        String extension = filename.substring(lastDotIndex + 1).toLowerCase();
        List<String> allowedExtensionList = Arrays.asList("jpg", "jpeg", "png");

        if (!allowedExtensionList.contains(extension)) {
            throw new FileFormatUnsupportedException();
        }
    }

    private String uploadImageToS3(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename(); //원본 파일 명
        String s3FileName = UUID.randomUUID().toString().substring(0, 10) + originalFilename; //변경된 파일 명

        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getSize());
            amazonS3.putObject(bucketName, s3FileName, multipartFile.getInputStream(), objectMetadata);
        } catch (Exception e) {
            throw new FilePutFailedException();
        }

        return amazonS3.getUrl(bucketName, s3FileName).toString();
    }

    public void deleteImage(String imageAddress) {
        String key = getKeyFromImageAddress(imageAddress);
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
        } catch (Exception e) {
            throw new FileDeleteFailedException();
        }
    }

    private String getKeyFromImageAddress(String imageAddress) {
        try {
            URL url = new URL(imageAddress);
            String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
            return decodingKey.substring(1); // 맨 앞의 '/' 제거
        } catch (MalformedURLException | UnsupportedEncodingException e) {
            throw new FileDeleteFailedException();
        }
    }
}