package com.raymondpang365.domain.draw.repository;

import com.raymondpang365.domain.draw.document.Snapshot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SnapshotRepository extends MongoRepository<Snapshot,Long> {
    @Query(sort = "{ 'timeOfLastAction' : -1 }")
    Snapshot findTopByOrderByTimeOfLastActionDesc();
}
