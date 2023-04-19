package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.History;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HistoryRepo extends MongoRepository<History, String> {
}
