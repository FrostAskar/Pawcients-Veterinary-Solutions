package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Forms.VetLoginForm;
import com.esliceu.pawcients.Forms.VetRegisterForm;
import com.esliceu.pawcients.Models.Worker;
import com.esliceu.pawcients.Repos.WorkerRepo;
import com.esliceu.pawcients.Utils.Encrypt;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public class WorkerService {
    WorkerRepo workerRepo;
    public WorkerService(WorkerRepo workerRepo) {
        this.workerRepo = workerRepo;
    }

    public String save(VetRegisterForm vetRegisterForm) throws NoSuchAlgorithmException {



        Worker worker = new Worker();
        worker.setName(vetRegisterForm.getName());
        worker.setSurname(vetRegisterForm.getSurname());
        worker.setEmail(vetRegisterForm.getEmail());
        worker.setPhone(vetRegisterForm.getPhone());
        worker.setLicense(vetRegisterForm.getLicense());
        worker.setType(vetRegisterForm.getType());
        worker.setProfile_picture("https://www.w3schools.com/howto/img_avatar.png");
        // Encrypt password to sha256
        //TODO regex for password complexity
        worker.setPassword(Encrypt.sha512(vetRegisterForm.getPassword()));


        if(checkEmailIsInUse(worker)){
            return "Email is already in use";
        }


        workerRepo.save(worker);
        return "ok";
    }

    boolean checkEmailIsInUse(Worker worker) {
        return workerRepo.findByEmail(worker.getEmail()).size() > 0;
    }

    public String checkLogin(VetLoginForm vetLoginForm) throws NoSuchAlgorithmException {
        //return boolean if email and password are correct
        if (workerRepo.findByEmail(vetLoginForm.getEmail()).size() > 0) {
            Worker worker = workerRepo.findByEmail(vetLoginForm.getEmail()).get(0);
            if (worker.getPassword().equals(Encrypt.sha512(vetLoginForm.getPassword()))) {

                return "ok";
            }
        }
        return "Email or password are incorrect";
    }
}
