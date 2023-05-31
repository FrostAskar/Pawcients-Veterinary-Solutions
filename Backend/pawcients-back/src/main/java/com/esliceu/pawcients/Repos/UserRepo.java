package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    List<User> findByEmail(String email);

    List<User> findByName(String name);

    List<User> findBySurname(String surname);

    List<User> findByNameAndSurname(String name, String surname);

    List<User> findByPhone(String phone);

    List<User> findByClinicId(String clinicId);

    List<User> findByTypeNot(String type);
}

 
