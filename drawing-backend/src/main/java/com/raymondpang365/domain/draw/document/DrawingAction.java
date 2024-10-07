package com.raymondpang365.domain.draw.document;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "drawing_action")
@Data
public class DrawingAction {
    @MongoId
    private String id;

    private Integer x1;
    private Integer x2;
    private Integer y1;
    private Integer y2;
    private String color;
    private Integer thickness;
    private String selectedTool; // pen or eraser
    private Boolean isMouseDown;
    private String sessionId;
    private String sessionNickname;
    private Long time;

    public void setDrawingAction(DrawingActionDto drawingActionDto){
        setX1(drawingActionDto.getX1());
        setX2(drawingActionDto.getX2());
        setY1(drawingActionDto.getY1());
        setY2(drawingActionDto.getY2());
        setColor(drawingActionDto.getColor());
        setThickness(drawingActionDto.getThickness());
        setSelectedTool(drawingActionDto.getSelectedTool());
        setIsMouseDown(drawingActionDto.getIsMouseDown());
        setSessionId(drawingActionDto.getSessionId());
        setSessionNickname(drawingActionDto.getSessionNickname());
        setTime(drawingActionDto.getTime());
    }
}
