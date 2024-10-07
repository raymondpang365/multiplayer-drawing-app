package com.raymondpang365.domain.draw.cache;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class PixelImageConverter {

    public String getPixelImage(Pixel[][] canvas) throws IOException {
        int height = canvas.length;
        int width = canvas[0].length;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                Pixel pixel = canvas[y][x];
                if (pixel.getIsFilled()) {
                    image.setRGB(x, y, Color.decode(pixel.getColor()).getRGB());
                } else {
                    image.setRGB(x, y, new Color(0, 0, 0, 0).getRGB()); // Transparent
                }
            }
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        return "data:image/png;base64," + base64Image;
    }

    public Pixel[][] decodePixelImage(String base64Image) throws IOException {
        // Remove the data URL prefix
        String base64Data = base64Image.split(",")[1];

        // Decode base64 to byte array
        byte[] imageBytes = Base64.getDecoder().decode(base64Data);

        // Convert byte array to BufferedImage
        ByteArrayInputStream bais = new ByteArrayInputStream(imageBytes);
        BufferedImage image = ImageIO.read(bais);

        int height = image.getHeight();
        int width = image.getWidth();
        Pixel[][] canvas =  new Pixel[height][width];

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int argb = image.getRGB(x, y);
                Color color = new Color(argb, true);

                Pixel pixel = new Pixel();
                pixel.setIsFilled(color.getAlpha() != 0); // Check if the pixel is not transparent

                if (pixel.getIsFilled()) {
                    pixel.setColor(
                            String.format("#%02x%02x%02x", color.getRed(), color.getGreen(), color.getBlue())
                    );
                } else {
                    pixel.setColor( null);
                }

                canvas[y][x] = pixel;
            }
        }

        return canvas;
    }
}
