package com.raymondpang365.aspect.exception;

import lombok.Getter;


@Getter
public class DynamicException extends Exception{
    private final String code;

    public DynamicException(String message, String code) {
        super(message);
        System.out.println(message);
        this.code = code;
    }
}

