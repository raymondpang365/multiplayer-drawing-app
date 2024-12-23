package com.raymondpang365.domain.draw.cache;

import com.raymondpang365.domain.draw.Tools;
import com.raymondpang365.domain.draw.dto.DrawingActionDto;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class LocalCanvasCache {

    private static final int WIDTH = 1920;
    private static final int HEIGHT = 1080;
    private Pixel[][] canvas;

    public LocalCanvasCache() {
        canvas = new Pixel[HEIGHT][WIDTH];
        for (int i = 0; i < HEIGHT; i++) {
            for (int j = 0; j < WIDTH; j++) {
                canvas[i][j] = new Pixel(); // Initialize with default Pixel
            }
        }
    }

    public Pixel[][] getCanvas() {
        return this.canvas;
    }

    public void setCanvas(Pixel[][] canvas) {
        this.canvas = canvas;
    }

    public void clearPixel(int x, int y) {
        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            Pixel pixel = canvas[y][x];
            pixel.setIsFilled(false);
            pixel.setColor(null);
        }
    }

    public void fillPixel(int x, int y, String color) {
        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            Pixel pixel = new Pixel();
            pixel.setIsFilled(true);
            pixel.setColor(color);
            canvas[y][x] = pixel;
        }
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
                        fillPixel(x + j, y + k, color); // 1 represents color
                    } else if (tool.equals(Tools.ERASER.label)) {
//                        System.out.println(String.format("Erasing: %d, %d", x + j, y + k);
                        clearPixel(x + j, y + k); // 0 represents erase
                    }
                }
            }
        }
    }
}