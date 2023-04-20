package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Mascot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MascotRepo extends MongoRepository<Mascot, String> {
}
