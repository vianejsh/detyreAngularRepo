package com.rayonit.cameraManagement;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "com.rayonit.cameraManagement.Repository")
@SpringBootApplication (exclude = {DataSourceAutoConfiguration.class })

public class DetyreRayonitApplication {

	public static void main(String[] args) {
		SpringApplication.run(DetyreRayonitApplication.class, args);
	}

}
