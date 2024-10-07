package com.raymondpang365.domain.draw.dto;


import lombok.Data;

@Data
public class DrawingActionDto {
    private Integer x1;
    private Integer x2;
    private Integer y1;
    private Integer y2;
    private String color;
    private Integer thickness;
    private Boolean isMouseDown;
    private String sessionId;
    private String sessionNickname;
    private String selectedTool;
    private Long time;
}
