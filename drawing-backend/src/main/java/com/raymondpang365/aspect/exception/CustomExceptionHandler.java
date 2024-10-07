package com.raymondpang365.aspect.exception;

import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import java.util.concurrent.ExecutionException;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(value = {JwtException.class})
    public ResponseEntity<Object> handleJwtException(Exception ex, WebRequest request) {
        String requestUri = ((ServletWebRequest)request).getRequest().getRequestURI().toString();
        ErrorMessage exceptionMessage = new ErrorMessage(ex.getMessage(), "INVALID_JWT_TOKEN");
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(exceptionMessage);
    }



    @ExceptionHandler(value = {DynamicUnauthorized.class})
    public ResponseEntity<Object> handleUnauthorizedException(DynamicException ex, WebRequest request) {
        String requestUri = ((ServletWebRequest)request).getRequest().getRequestURI().toString();
        ErrorMessage  exceptionMessage = new ErrorMessage(ex.getMessage(), ex.getCode());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(exceptionMessage);
    }

    @ExceptionHandler(value = {DynamicBadRequest.class})
    public ResponseEntity<Object> handleBadRequestException(DynamicException ex, WebRequest request) {
        String requestUri = ((ServletWebRequest)request).getRequest().getRequestURI().toString();
        ErrorMessage  exceptionMessage = new ErrorMessage(ex.getMessage(), ex.getCode());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(exceptionMessage);
    }

    @ExceptionHandler(value = {DynamicInternalServerError.class})
    public ResponseEntity<Object> handleInternalServerError(DynamicException ex, WebRequest request) {
        String requestUri = ((ServletWebRequest)request).getRequest().getRequestURI().toString();
        ErrorMessage  exceptionMessage = new ErrorMessage(ex.getMessage(), ex.getCode());
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exceptionMessage);
    }

    @ExceptionHandler(value = {Exception.class, ExecutionException.class})
    public ResponseEntity<Object> handleOtherErrors(Exception ex, WebRequest request) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

}