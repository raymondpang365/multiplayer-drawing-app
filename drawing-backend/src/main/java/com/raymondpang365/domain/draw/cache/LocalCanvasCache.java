package com.raymondpang365.domain.draw.cache;

import java.util.ArrayList;
import java.util.List;



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
}