package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepo extends MongoRepository<Client, String> {
}
