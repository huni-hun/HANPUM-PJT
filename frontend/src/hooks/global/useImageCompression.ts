import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const useImageCompression = () => {
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const compressImage = async (imageFile: File) => {
    // console.log('imageFile ::::', imageFile);
    setLoading(true);
    setError(null);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      initialQuality: 0.8,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(imageFile, options);

      const compressedFile = new File([compressedBlob], imageFile.name, {
        type: imageFile.type,
        lastModified: Date.now(),
      });

      setCompressedImage(compressedFile);
      setLoading(false);
      return compressedFile;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setLoading(false);
    }
  };

  // console.log('compressedImage ::', compressedImage);
  return { compressedImage, compressImage };
};

export default useImageCompression;
