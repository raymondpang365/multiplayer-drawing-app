package com.raymondpang365.domain.draw.dto;

import com.raymondpang365.domain.draw.cache.Player;
import com.raymondpang365.domain.draw.document.DrawingAction;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class NewSessionResponse {
    private String sessionId;
    private String base64Image;
    private List<DrawingAction> recentServerActivities;
    private Map<String, Player> players;

}
