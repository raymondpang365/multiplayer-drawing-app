package com.raymondpang365;

import com.raymondpang365.aspect.SecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ResourceLoader;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@Import(SecurityConfig.class)
public class Main {

    @Autowired
    ResourceLoader resourceLoader;
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Main.class, args);
    }
}
