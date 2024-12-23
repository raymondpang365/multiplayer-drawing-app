package com.raymondpang365.domain.draw.cache;

import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class LocalPlayerStateCache {
    private final Map<String, Player> players = new ConcurrentHashMap<>();

    public void setPlayerDrawingState(DrawingActionDto drawingActionDto){
        String sessionId = drawingActionDto.getSessionId();
        players.compute(sessionId, (key, existingPlayer) -> {
            if (existingPlayer != null) {
                // Update the existing player
                existingPlayer.setSessionNickname(drawingActionDto.getSessionNickname());
                existingPlayer.setColor(drawingActionDto.getColor());
                existingPlayer.setX(drawingActionDto.getX2());
                existingPlayer.setY(drawingActionDto.getY2());
                existingPlayer.setSelectedTool(drawingActionDto.getSelectedTool());
                return existingPlayer;
            } else {
                // Create a new player if none exists
                return Player.builder()
                        .selectedTool(drawingActionDto.getSelectedTool())
                        .color(drawingActionDto.getColor())
                        .x(drawingActionDto.getX2())
                        .y(drawingActionDto.getY2())
                        .sessionNickname(drawingActionDto.getSessionNickname())
                        .sessionId(drawingActionDto.getSessionId())
                        .build();
            }
        });
    }

    public void removePlayer(String sessionId){
        players.remove(sessionId);
    }

    public Map<String, Player> getPlayers(){
        return players;
    }

}
