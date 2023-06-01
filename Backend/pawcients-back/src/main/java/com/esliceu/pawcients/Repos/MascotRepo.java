package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.DTO.MascotDTO;
import com.esliceu.pawcients.Models.Mascot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotRepo extends MongoRepository<Mascot, String> {

    List<Mascot> findByOwnerId(String owner_id);

    List<Mascot> findByName(String mascot_name);

}
