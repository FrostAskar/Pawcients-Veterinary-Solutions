package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.IncorrectLoginException;
import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.UserRepo;
import com.esliceu.pawcients.Utils.Encrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {
    UserRepo userRepo;
    ClinicService clinicService;

    public UserService(UserRepo userRepo, ClinicService clinicService) {
        this.userRepo = userRepo;
        this.clinicService = clinicService;



    }

    //TODO modify this autowired
    @Autowired
    EmailSenderService emailSenderService;
    @Autowired
    TokenService tokenService;


    public String saveAdmin(RegisterVetAndClinicForm registerVetAndClinicForm, String clinicId) {
        User user = new User();
        user.setName(registerVetAndClinicForm.getName());
        user.setSurname(registerVetAndClinicForm.getSurname());
        user.setLicense(registerVetAndClinicForm.getLicense());
        user.setEmail(registerVetAndClinicForm.getEmail());
        user.setPhone(registerVetAndClinicForm.getPhone());
        user.setType(registerVetAndClinicForm.getType());
        user.setPassword(Encrypt.sha512(registerVetAndClinicForm.getPassword()));
        user.setProfilePicture("https://www.w3schools.com/howto/img_avatar.png");
        //Generate a random number of 6 characters
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerificationCodeEmail(code);
        user.setVerificationCodeEmailCheck(false);
        user.setClinicId(clinicId);

        if(checkEmailIsInUse(user)){
            throw new IncorrectRegisterException("This email is already in use");
        }

        return userRepo.save(user).getId();
    }

    public String saveWorker(RegisterWorkerForm registerWorkerForm) {
        User user = new User(
                null,
                registerWorkerForm.getName(),
                registerWorkerForm.getSurname(),
                registerWorkerForm.getLicense(),
                registerWorkerForm.getEmail(),
                registerWorkerForm.getPhone(),
                registerWorkerForm.getType(),
                Encrypt.sha512(registerWorkerForm.getPassword()),
                registerWorkerForm.getClinicId()
        );
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerificationCodeEmail(code);




        if(checkEmailIsInUse(user)) {
            throw new IncorrectRegisterException("This email is already in use");
        }
        System.out.println("Sending code to client " + user.getEmail());//Send verification email
        emailSenderService.SendWelcomeEmail(user.getEmail(), user.getName(), user.getSurname(), user.getVerificationCodeEmail());

        return userRepo.save(user).getId();
    }

    public String saveClient(RegisterClientForm registerClientForm) {
        User user = new User(
                null,
                registerClientForm.getName(),
                registerClientForm.getSurname(),
                null,
                registerClientForm.getEmail(),
                registerClientForm.getPhone(),
                registerClientForm.getType(),
                Encrypt.sha512(registerClientForm.getPassword()),
                registerClientForm.getClinicId()
        );
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerificationCodeEmail(code);

        if(checkEmailIsInUse(user)) {
            throw new IncorrectRegisterException("This email is already in use");
        }
        emailSenderService.SendWelcomeEmail(user.getEmail(), user.getName(), user.getSurname(), user.getVerificationCodeEmail());

        return userRepo.save(user).getId();
    }

    boolean checkEmailIsInUse(User user) {
        return userRepo.findByEmail(user.getEmail()).size() > 0;
    }

    public User authenticateUser(String email, String password) {
        if (userRepo.findByEmail(email).size() == 0) {
            throw new IncorrectLoginException("Email or password incorrect");
        }
        User user = userRepo.findByEmail(email).get(0);
        String passtest = Encrypt.sha512(password);
        if (user.getPassword().equals(passtest)) {
            return user;
        } else {
            throw new IncorrectLoginException("Email or password incorrect");
        }
    }

    public User generateUser(String userId) {
        return userRepo.findById(userId).get();
    }

    //Debugging to get data from users through postman
    public List<User> getUsersByForm(FindUserForm fuf) {
        List<User> users = new ArrayList<>();
        if(!fuf.getId().isEmpty()) {
            try {
                users.add(userRepo.findById(fuf.getId()).get());
            } catch (NoSuchElementException e){
                throw new NotFoundUserException("This user ID does not exist");
            }
        } else if(!fuf.getEmail().isEmpty()){
            try {
                users = userRepo.findByEmail(fuf.getEmail());
            } catch (NoSuchElementException e){
                throw new NotFoundUserException("This user email does not exist");
            }
        } else if(!fuf.getName().isEmpty() && !fuf.getSurname().isEmpty()) {
            try {
                users = userRepo.findByNameAndSurname(fuf.getName(), fuf.getSurname());
            } catch (NoSuchElementException e){
                throw new NotFoundUserException("This user does not exist");
            }
        } else if(!fuf.getPhone().isEmpty()) {
            try {
                users = userRepo.findByPhone(fuf.getPhone());
            } catch (NoSuchElementException e){
                throw new NotFoundUserException("This user phone does not exist");
            }
        } else if(!fuf.getName().isEmpty()) {
            try {
                users = userRepo.findByName(fuf.getName());
            } catch (NoSuchElementException e){
                throw new NotFoundUserException("This user name does not exist");
            }
        } else if(!fuf.getSurname().isEmpty()) {
            try {
                users = userRepo.findBySurname(fuf.getSurname());
            } catch (NoSuchElementException e){
                throw new NotFoundUserException("This user surname does not exist");
            }
        }
        return users;
    }

    public String deleteUser(String userId) {
        List<User> users = findUserById(userId);
        //Checks user exists to proceed
        if(users.size() < 1) {
            return "User not found";
        }
        userRepo.deleteById(userId);
        //Additional check. If no more users for that clinic, delete the clinic
        List<User> usersOnClinic = checkUsersOnClinic(users.get(0).getClinicId());
        if(usersOnClinic.size() < 1) {
            clinicService.deleteClinic(users.get(0).getClinicId());
        }

        //Verification delete has proceeded without error
        users = findUserById(userId);
        if(users.size() < 1) {
            return "User deleted successfully";
        } else {
            return "Something went kaboom, please check";
        }
    }

    public List<User> findUserById(String userId) {
        return userRepo.findById(userId).stream().toList();
    }

    private List<User> checkUsersOnClinic(String clinicId) {
        return userRepo.findByClinicId(clinicId);
    }

    public void deleteAllUsersInClinic(String clinicId) {
        List<User> usersInClinic = userRepo.findByClinicId(clinicId);
        for(User user : usersInClinic) {
            userRepo.deleteById(user.getId());
        }
    }

    public String verifyEmail(String code, String token) {
        String userId = tokenService.getUser(token.replace("Bearer ", ""));
        User u = userRepo.findById(userId).get();
        String email = u.getEmail();

        if(userRepo.findByEmail(email).get(0).getVerificationCodeEmail().equals(code)) {
            u.setVerificationCodeEmailCheck(true);
            userRepo.save(u);
            emailSenderService.sendEmailWithoutAttachment(email, "Email verified", "Your email has been verified successfully!");
            return "ok";

        } else {
            return "failed";
        }

    }
}
