package com.raymondpang365.domain.draw.cache;

import com.raymondpang365.domain.draw.Tools;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class Player {
    String sessionId;
    String sessionNickname;
    Integer x;
    Integer y;
    String color;
    String selectedTool;
    Integer thickness;
}
