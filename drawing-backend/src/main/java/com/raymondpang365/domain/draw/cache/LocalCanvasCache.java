package com.raymondpang365.domain.draw.cache;

import java.util.ArrayList;
import java.util.List;



public class LocalCanvasCache {
    
    private List<List<Pixel>> canvas = null;

    public List<List<Pixel>> getCanvas() {
        return this.canvas;
    }

    public void setCanvas(List<List<Pixel>> canvas) {
        this.canvas = canvas;
    }

   public LocalCanvasCache(int width, int height) {
        canvas = new ArrayList<>();
        for (int i = 0; i < height; i++) {
            List<Pixel> row = new ArrayList<>();
            for (int j = 0; j < width; j++) {
                row.add(new Pixel()); // Initialize with 0 (empty)
            }
            canvas.add(row);
        }
    }



    public void clearPixel(int x, int y) {
        if (x >= 0 && x < canvas.get(0).size() && y >= 0 && y < canvas.size()) {
            canvas.get(y).set(x, new Pixel());
        }
    }

    public void fillPixel(int x, int y, String color) {
        if (x >= 0 && x < canvas.get(0).size() && y >= 0 && y < canvas.size()) {
            Pixel pixel = new Pixel();
            pixel.setIsFilled(true);
            pixel.setColor(color);
            canvas.get(y).set(x, pixel);
        }
    }
}
