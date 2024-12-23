package com.raymondpang365.domain.draw;

import com.raymondpang365.domain.draw.cache.Player;
import com.raymondpang365.domain.draw.cache.UniqueSessionRecorder;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import com.raymondpang365.domain.draw.dto.NewSessionResponse;
import com.raymondpang365.domain.draw.service.LocalCacheService;
import com.raymondpang365.domain.draw.service.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class DrawingController {

    @Autowired
    LocalCacheService localCacheService;

    @Autowired
    LoggingService loggingService;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/ws.draw")
    @SendTo("/topic/draw")
    public DrawingActionDto draw(DrawingActionDto drawingActionDto) throws Exception {
        loggingService.logDrawingActionAsync(drawingActionDto);
        localCacheService.saveDrawingAction(drawingActionDto);
        return drawingActionDto;
    }

    @MessageMapping("/ws.new_session")
    public void createNewSession(@Payload String sessionId,
                                 @Header("simpSessionId") String wsSessionId) throws Exception {

        UniqueSessionRecorder uniqueSessionRecorder = localCacheService.getUniqueSessionRecorder();
        uniqueSessionRecorder.linkWsSessionId(wsSessionId, sessionId);

        NewSessionResponse newSessionResponse = new NewSessionResponse();
        newSessionResponse.setBase64Image(localCacheService.getCanvasAsImage());
        Map<String, Player> players = localCacheService.getLocalPlayerStateCache().getPlayers();
        System.out.println(players);
        newSessionResponse.setPlayers(players);
        //
        // Send the session ID back to the connected user
        messagingTemplate.convertAndSendToUser(sessionId, "/welcome", newSessionResponse);
    }
}
