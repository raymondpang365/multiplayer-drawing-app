package com.raymondpang365.domain.draw;
import com.raymondpang365.domain.draw.cache.LocalCanvasCache;
import com.raymondpang365.domain.draw.cache.Pixel;
import com.raymondpang365.domain.draw.cache.PixelImageConverter;
import com.raymondpang365.domain.draw.document.Snapshot;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import com.raymondpang365.domain.draw.repository.SnapshotRepository;
import com.raymondpang365.domain.draw.document.DrawingAction;
import com.raymondpang365.domain.draw.repository.DrawingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class DrawingService {

    @Autowired
    DrawingRepository drawingRepository;

    @Autowired
    PixelImageConverter pixelImageConverter;

    @Autowired
    SnapshotRepository snapshotRepository;


    private MongoTemplate mongoTemplate;

    LocalCanvasCache localCanvasCache = new LocalCanvasCache(1920, 1080);

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
            List<List<Pixel>> canvas =  pixelImageConverter.decodePixelImage(snapshot.getBase64Image());
            localCanvasCache.setCanvas(canvas);
        }
        if(drawingActions.size() > 0) {
            for (DrawingAction drawingAction : drawingActions) {
                drawLine(
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

    public CompletableFuture<Void> logDrawingAsync(DrawingActionDto drawingActionDto) {
        return CompletableFuture.runAsync(() -> logDrawing(drawingActionDto));
    }

    private void logDrawing(DrawingActionDto drawingActionDto){
        DrawingAction drawingAction = new DrawingAction();
        drawingAction.setDrawingAction(drawingActionDto);
        drawingRepository.save(drawingAction);
    }

    public List<DrawingAction> getFullHistory() {
        return drawingRepository.findAll();
    }


    public void drawLine(int x1, int y1, int x2, int y2,
                         int thickness, String color, String tool) {
        int dx = x2 - x1;
        int dy = y2 - y1;
        double distance = Math.sqrt(dx * dx + dy * dy);
        double steps = distance;


        for (int i = 0; i < steps; i++) {
            int x = (int) (x1 + (dx * i) / steps);
            int y = (int) (y1 + (dy * i) / steps);

            for (int j = -thickness / 2; j <= thickness / 2; j++) {
                for (int k = -thickness / 2; k <= thickness / 2; k++) {
                    if (tool.equals(Tools.PENCIL.label)) {
//                        System.out.println(String.format("Filling: %d, %d", x + j, y + k);
                        localCanvasCache.fillPixel(x + j, y + k, color); // 1 represents color
                    } else if (tool.equals(Tools.ERASER.label)) {
//                        System.out.println(String.format("Erasing: %d, %d", x + j, y + k);
                        localCanvasCache.clearPixel(x + j, y + k); // 0 represents erase
                    }
                }
            }
        }
    }




}
