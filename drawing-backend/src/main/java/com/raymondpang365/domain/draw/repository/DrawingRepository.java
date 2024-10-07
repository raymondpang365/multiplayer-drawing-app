package com.raymondpang365.domain.draw.repository;
import com.raymondpang365.domain.draw.document.DrawingAction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface DrawingRepository extends MongoRepository<DrawingAction,Long> {

    List<DrawingAction> findByTimeGreaterThan(long timestamp);
}



