package com.raymondpang365.domain.draw.service;
import com.raymondpang365.domain.draw.Tools;
import com.raymondpang365.domain.draw.cache.*;
import com.raymondpang365.domain.draw.document.Snapshot;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import com.raymondpang365.domain.draw.repository.SnapshotRepository;
import com.raymondpang365.domain.draw.document.DrawingAction;
import com.raymondpang365.domain.draw.repository.DrawingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class LocalCacheService {

    @Autowired
    DrawingRepository drawingRepository;

    @Autowired
    PixelImageConverter pixelImageConverter;

    @Autowired
    SnapshotRepository snapshotRepository;

    @Autowired
    LocalCanvasCache localCanvasCache;

    @Autowired
    LocalPlayerStateCache localPlayerStateCache;

    @Autowired
    UniqueSessionRecorder uniqueSessionRecorder;

    @PostConstruct
    public void init() throws IOException{
        Snapshot snapshot = snapshotRepository.findTopByOrderByTimeOfLastActionDesc();
        List<DrawingAction> drawingActions;
        if (snapshot == null){
            drawingActions = drawingRepository.findAll();
        }
        else{
            drawingActions = drawingRepository.findByTimeGreaterThan(
                    snapshot.getTimeOfLastAction()
            );
            Pixel[][] canvas =  pixelImageConverter.decodePixelImage(snapshot.getBase64Image());
            localCanvasCache.setCanvas(canvas);
        }
        if(drawingActions.size() > 0) {
            for (DrawingAction drawingAction : drawingActions) {
                localCanvasCache.drawLine(
                        drawingAction.getX1(),
                        drawingAction.getY1(),
                        drawingAction.getX2(),
                        drawingAction.getY2(),
                        drawingAction.getThickness(),
                        drawingAction.getColor(),
                        drawingAction.getSelectedTool()
                );
            }
            Snapshot newSnapshot = new Snapshot();
            newSnapshot.setBase64Image(pixelImageConverter.getPixelImage(
                    localCanvasCache.getCanvas()
            ));
            newSnapshot.setTimeOfLastAction(drawingActions.getLast().getTime());
            snapshotRepository.save(newSnapshot);
        }
    }

    public String getCanvasAsImage() throws IOException {
        return pixelImageConverter.getPixelImage(localCanvasCache.getCanvas());
    }

    public UniqueSessionRecorder getUniqueSessionRecorder(){
        return uniqueSessionRecorder;
    }

    public LocalPlayerStateCache getLocalPlayerStateCache() { return localPlayerStateCache; }

    public void saveDrawingAction(DrawingActionDto drawingActionDto){
        localPlayerStateCache.setPlayerDrawingState(drawingActionDto);
        if(drawingActionDto.getIsMouseDown() && !drawingActionDto.getSelectedTool().equals(Tools.DEFAULT.label)) {
            localCanvasCache.drawLine(
                    drawingActionDto.getX1(),
                    drawingActionDto.getY1(),
                    drawingActionDto.getX2(),
                    drawingActionDto.getY2(),
                    drawingActionDto.getThickness(),
                    drawingActionDto.getColor(),
                    drawingActionDto.getSelectedTool()
            );
        }
    }


}
