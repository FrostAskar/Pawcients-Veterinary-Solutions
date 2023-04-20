package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.History;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepo extends MongoRepository<History, String> {
}
