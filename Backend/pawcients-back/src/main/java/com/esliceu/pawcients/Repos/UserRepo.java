package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    List<User> findByEmail(String email);

    List<User> findByClinicId(String clinicId);

    List<User> findByTypeNotAndClinicId(String type, String clinicId);

    List<User> findByTypeAndClinicId(String type, String clinicId);

}

 
