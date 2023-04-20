package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Worker;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepo extends MongoRepository<Worker, String> {
}
