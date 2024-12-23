package com.raymondpang365.domain.draw;

import com.raymondpang365.domain.draw.cache.UniqueSessionRecorder;
import com.raymondpang365.domain.draw.service.LocalCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GenerateSessionController {

    @Autowired
    LocalCacheService localCacheService;
    
    @GetMapping("/register-session")
    public ResponseEntity<?> registerSession(){
        UniqueSessionRecorder uniqueSessionRecorder = localCacheService.getUniqueSessionRecorder();
        String uniqueId = uniqueSessionRecorder.generateUniqueSessionId();
        return ResponseEntity.ok(uniqueId);
    }
}
