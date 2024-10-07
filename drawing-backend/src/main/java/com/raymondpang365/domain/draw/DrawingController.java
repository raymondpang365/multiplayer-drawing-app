package com.raymondpang365.domain.draw;

import com.raymondpang365.domain.draw.document.DrawingAction;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import com.raymondpang365.domain.draw.dto.NewSessionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
public class DrawingController {

    @Autowired
    DrawingService drawingService;


    @MessageMapping("/ws.draw")
    @SendTo("/topic/draw")
    public DrawingActionDto draw(DrawingActionDto drawingActionDto) throws Exception {
        if(drawingActionDto.getIsMouseDown() && !drawingActionDto.getSelectedTool().equals(Tools.DEFAULT.label)) {
            drawingService.logDrawingAsync(drawingActionDto);
            drawingService.drawLine(
                    drawingActionDto.getX1(),
                    drawingActionDto.getY1(),
                    drawingActionDto.getX2(),
                    drawingActionDto.getY2(),
                    drawingActionDto.getThickness(),
                    drawingActionDto.getColor(),
                    drawingActionDto.getSelectedTool()
            );
        }
        return drawingActionDto;
    }



    @MessageMapping("/ws.new_session")
    @SendTo("/topic/new_session")
    public NewSessionResponse createNewSession(Boolean drawingActionDto) throws Exception {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        NewSessionResponse newSessionResponse = new NewSessionResponse();
        newSessionResponse.setSessionId(uuid);
        List<DrawingAction> drawingActions = drawingService.getFullHistory();
        newSessionResponse.setRecentServerActivities(drawingActions);
        String base64Image = drawingService.getCanvasAsImage();
        newSessionResponse.setBase64Image(base64Image);
        return newSessionResponse;
    }
}
