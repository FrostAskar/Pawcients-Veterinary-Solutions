package com.esliceu.pawcients;

import com.esliceu.pawcients.Interceptors.TokenInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.ZoneId;

@SpringBootApplication
public class PawcientsApplication implements WebMvcConfigurer {

	TokenInterceptor tokenInterceptor;

	public PawcientsApplication(TokenInterceptor tokenInterceptor) {
		this.tokenInterceptor = tokenInterceptor;
	}

	public static ZoneId timeZone = ZoneId.systemDefault();

	public static void main(String[] args) {
		SpringApplication.run(PawcientsApplication.class, args);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(tokenInterceptor)
				.addPathPatterns("/vetdashboard")
				.addPathPatterns("/vet/**")
				.addPathPatterns("/client/**")
				.addPathPatterns("/mascot/**")
				.addPathPatterns("/profilesettings")
				.addPathPatterns("/profilesettings/changepassword")
				.addPathPatterns("/verifyemail")
				.addPathPatterns("/vetcalendar")
				.addPathPatterns("/getprofile");
	}
}
