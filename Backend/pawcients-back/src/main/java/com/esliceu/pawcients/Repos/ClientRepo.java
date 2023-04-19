package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepo extends MongoRepository<Client, String> {
}
