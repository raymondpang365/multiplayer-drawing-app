package com.raymondpang365.aspect.exception;


import lombok.Data;

@Data
public class ErrorMessage {
  private String message;
  private String code;

  public ErrorMessage(String message, String code){
      this.message = message;
      this.code = code;
  }

}