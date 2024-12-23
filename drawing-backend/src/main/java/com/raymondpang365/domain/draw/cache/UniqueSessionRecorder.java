package com.raymondpang365.domain.draw.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

@Component
public class UniqueSessionRecorder {

    private final Set<String> userSessionIds = new HashSet<>();
    private final Map<String, String> wsToAppSessions = new HashMap<>();

    private static final Logger logger = LoggerFactory.getLogger(UniqueSessionRecorder.class);

    /**
     * Generate a unique ID that does not exist in the HashMap.
     * Synchronized to prevent race conditions.
     */
    public synchronized String generateUniqueSessionId() {
        String uniqueId;
        do {
            uniqueId = UUID.randomUUID().toString();
        } while (userSessionIds.contains(uniqueId));
        userSessionIds.add(uniqueId);
        logger.debug("Created unique Id {}:", uniqueId);
        return uniqueId;
    }

    public synchronized void linkWsSessionId(
            String wsSessionId,
            String userSessionId
    ) {
        logger.debug("Linking wsSessionId {} to user session Id {}:",
                wsSessionId, userSessionId);
        if(userSessionIds.contains(userSessionId)) {
            userSessionIds.add(userSessionId);
            wsToAppSessions.put(wsSessionId, userSessionId);
        }
    }

    public synchronized String removeSession(
            String wsSessionId
    ) {

        String userSessionId = null;
        logger.debug("Removing wsSessionId {}:", wsSessionId);
        if(wsToAppSessions.containsKey(wsSessionId)){
            userSessionId = wsToAppSessions.get(wsSessionId);
            logger.debug("Removing user SessionId {}:", userSessionId);
            userSessionIds.remove(userSessionId);
            wsToAppSessions.remove(wsSessionId);
        }
        return userSessionId;
    }
}
