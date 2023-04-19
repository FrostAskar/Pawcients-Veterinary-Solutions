package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Worker;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkerRepo extends MongoRepository<Worker, String> {
}
