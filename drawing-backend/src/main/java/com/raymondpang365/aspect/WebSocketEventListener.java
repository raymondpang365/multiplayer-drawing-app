package com.raymondpang365.aspect;

import com.raymondpang365.domain.draw.cache.LocalPlayerStateCache;
import com.raymondpang365.domain.draw.cache.UniqueSessionRecorder;
import com.raymondpang365.domain.draw.dto.DisconnectionEvent;
import com.raymondpang365.domain.draw.service.LocalCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    LocalCacheService localCacheService;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String wsSessionId = event.getSessionId();
        System.out.format("SessionID disconnected: %s", wsSessionId);
        UniqueSessionRecorder recorder = localCacheService.getUniqueSessionRecorder();
        LocalPlayerStateCache playerStateCache = localCacheService.getLocalPlayerStateCache();
        String quitterSessionId = recorder.removeSession(wsSessionId);
        playerStateCache.removePlayer(quitterSessionId);
        DisconnectionEvent disconnectionEvent = new DisconnectionEvent();
        disconnectionEvent.setSessionId(quitterSessionId);
        messagingTemplate.convertAndSend("/topic/disconnect", disconnectionEvent);
    }
}