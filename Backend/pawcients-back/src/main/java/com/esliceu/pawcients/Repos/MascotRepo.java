package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Mascot;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MascotRepo extends MongoRepository<Mascot, String> {
}
