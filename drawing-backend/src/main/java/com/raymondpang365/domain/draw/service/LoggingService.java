package com.raymondpang365.domain.draw.service;

import com.raymondpang365.domain.draw.Tools;
import com.raymondpang365.domain.draw.document.DrawingAction;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import com.raymondpang365.domain.draw.repository.DrawingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class LoggingService {

    @Autowired
    DrawingRepository drawingRepository;

    public void logDrawingActionAsync(DrawingActionDto drawingActionDto) {
        if(drawingActionDto.getIsMouseDown() && !drawingActionDto.getSelectedTool().equals(Tools.DEFAULT.label)) {
            CompletableFuture.runAsync(() -> logDrawingAction(drawingActionDto));
        }
    }

    private void logDrawingAction(DrawingActionDto drawingActionDto){
        DrawingAction drawingAction = new DrawingAction();
        drawingAction.setDrawingAction(drawingActionDto);
        drawingRepository.save(drawingAction);
    }
}
