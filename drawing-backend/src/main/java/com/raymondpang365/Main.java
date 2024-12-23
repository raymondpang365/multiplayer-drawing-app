package com.raymondpang365;

import com.raymondpang365.aspect.SecurityConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ResourceLoader;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@Import(SecurityConfig.class)
public class Main {

    private static final Logger logger = LoggerFactory.getLogger(Main.class);

    @Autowired
    ResourceLoader resourceLoader;
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Main.class, args);
        logger.info("This is an INFO-level message.");
        logger.debug("This is a DEBUG-level message.");
        logger.error("This is an ERROR-level message.");
    }
}
