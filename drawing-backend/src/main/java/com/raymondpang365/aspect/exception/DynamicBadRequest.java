package com.raymondpang365.aspect.exception;

public class DynamicBadRequest extends DynamicException{

    public DynamicBadRequest(String message) {
        super(message, "BAD_REQUEST");
    }

    public DynamicBadRequest(String message, String code) {
        super(message, code);
    }
}
