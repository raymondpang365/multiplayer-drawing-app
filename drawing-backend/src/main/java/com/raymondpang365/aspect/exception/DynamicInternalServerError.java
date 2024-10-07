package com.raymondpang365.aspect.exception;

public class DynamicInternalServerError extends DynamicException {


    public DynamicInternalServerError(String message) {
        super(message, "INTERNAL_SERVER_ERROR");
    }

    public DynamicInternalServerError(String message, String code) {
        super(message, code);
    }
}
