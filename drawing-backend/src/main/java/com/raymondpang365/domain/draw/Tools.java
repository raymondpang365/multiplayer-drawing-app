package com.raymondpang365.domain.draw;

public enum Tools {
    PENCIL("pencil"),
    ERASER("eraser"),
    DEFAULT("default");

    public static Tools valueOfLabel(String label) {
        for (Tools e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        return null;
    }
    public final String label;

    private Tools(String label) {
        this.label = label;
    }
}

