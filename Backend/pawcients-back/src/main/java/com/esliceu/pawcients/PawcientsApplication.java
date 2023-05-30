package com.esliceu.pawcients;

import com.esliceu.pawcients.Interceptors.TokenInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PawcientsApplication implements WebMvcConfigurer {

	TokenInterceptor tokenInterceptor;

	public PawcientsApplication(TokenInterceptor tokenInterceptor) {
		this.tokenInterceptor = tokenInterceptor;
	}

	public static void main(String[] args) {
		SpringApplication.run(PawcientsApplication.class, args);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(tokenInterceptor)
				.addPathPatterns("/vetdashboard")
				.addPathPatterns("/getprofile");
	}
}
