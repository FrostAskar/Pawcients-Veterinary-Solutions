package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.VetRegisterForm;
import com.esliceu.pawcients.Models.Worker;
import com.esliceu.pawcients.Repos.WorkerRepo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    WorkerRepo workerRepo;

    public UserController(WorkerRepo workerRepo) {
        this.workerRepo = workerRepo;
    }

    @PostMapping("/signup/vet")
    @CrossOrigin
    public Map<String, String> registerVet(@RequestBody VetRegisterForm vetRegisterForm) {
        Map<String, String> result = new HashMap<>();
        Worker worker = new Worker(
                null,
                vetRegisterForm.getName(),
                vetRegisterForm.getSurname(),
                vetRegisterForm.getLicense(),
                vetRegisterForm.getEmail(),
                vetRegisterForm.getPhone(),
                vetRegisterForm.getType()
        );
        workerRepo.save(worker);
        result.put("result", "worked");
        return result;
    }

}
