package com.raymondpang365.domain.draw.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "snapshot")
@Data
public class Snapshot {
    @MongoId
    private String id;
    Long timeOfLastAction;
    String base64Image;
}
