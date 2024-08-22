package backend.hanpum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HanpumApplication {

	public static void main(String[] args) {
		SpringApplication.run(HanpumApplication.class, args);
	}

}
