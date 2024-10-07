package com.raymondpang365.aspect;

import com.raymondpang365.domain.draw.dto.SessionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    @Autowired
    SimpMessagingTemplate messagingTemplate;


//    @EventListener
//    public void handleWebSocketConnectListener(SessionConnectEvent event) {
//        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
//
//        // Send the session ID back to the connected user
//        messagingTemplate.convertAndSendToUser(sessionId, "/topic/session", sessionId);
//
//        // Broadcast the new session ID to all users
//        messagingTemplate.convertAndSend("/topic/connect", sessionId);
//    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();

        SessionEvent sessionEvent = new SessionEvent();
        sessionEvent.setSessionId(sessionId);
        messagingTemplate.convertAndSend("/topic/disconnect", sessionEvent);
    }
}