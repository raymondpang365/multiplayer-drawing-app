package com.raymondpang365.domain.draw;

import com.raymondpang365.domain.draw.document.DrawingAction;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import com.raymondpang365.domain.draw.dto.NewSessionResponse;
import com.raymondpang365.domain.draw.dto.SessionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Header;

import java.util.List;
import java.util.UUID;

@Controller
public class DrawingController {

    @Autowired
    DrawingService drawingService;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

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
    public void createNewSession(String uuid) throws Exception {
        NewSessionResponse newSessionResponse = new NewSessionResponse();
        String base64Image = drawingService.getCanvasAsImage();
        newSessionResponse.setBase64Image(base64Image);
        //
        // Send the session ID back to the connected user
        messagingTemplate.convertAndSendToUser(uuid, "/welcome", newSessionResponse);

    }
}
