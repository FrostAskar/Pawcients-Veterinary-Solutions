package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Worker;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkerRepo extends MongoRepository<Worker, String> {

    List<Worker> findByEmail(String email);

    boolean existsByEmail(String email);
}

 
