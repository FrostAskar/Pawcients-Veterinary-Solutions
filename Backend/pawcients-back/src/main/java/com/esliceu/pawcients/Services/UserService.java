package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.*;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.UserRepo;
import com.esliceu.pawcients.Utils.Encrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {
    UserRepo userRepo;
    ClinicService clinicService;
    EmailSenderService emailSenderService;
    TokenService tokenService;

    public UserService(UserRepo userRepo, ClinicService clinicService, EmailSenderService emailSenderService, TokenService tokenService) {
        this.userRepo = userRepo;
        this.clinicService = clinicService;
        this.emailSenderService = emailSenderService;
        this.tokenService = tokenService;
    }

    public String saveAdmin(User user) {
        if(!checkEmailValidity(user.getEmail())) throw new IncorrectRegisterException("Email is not a valid email");
        if(checkEmailIsInUse(user)) {
            throw new IncorrectRegisterException("This email is already in use");
        }
        return userRepo.save(user).getId();
    }

    public String saveUser(User user, User actualUser) {
        if(!checkEmailValidity(user.getEmail())) throw new IncorrectRegisterException("Email is not a valid email");
        String verificationCode = String.valueOf((int)(Math.random()*1000000));
        user.setVerificationCodeEmail(verificationCode);
        //If the user doing the register is the admin, goes through
        if(actualUser.getType().equals("admin")) {
            if (checkEmailIsInUse(user)) {
                throw new IncorrectRegisterException("This email is already in use");
            }
        //If the user doing the register is any worker, can only register other vets, aux and clients
        } else if (!actualUser.getType().equals("client")) {
            if(!actualUser.getVerificationCodeEmailCheck()) {
                throw new UnverifiedUserException("This user is not verified yet");
            }
            if(checkEmailIsInUse(user)) {
                throw new IncorrectRegisterException("This email is already in use");
            //Only one admin can be allowed
            } else if(user.getType().equals("admin")) {
                throw new IncorrectRegisterException("Admin users cannot be registered");
            }
        } else {
            //User is client. Deny creation
            throw new UnauthorizedUserException("This user is not allowed to register users");
        }
        System.out.println("Sending code to client " + user.getEmail());//Send verification email
        emailSenderService.SendWelcomeEmail(user.getEmail(), user.getName(), user.getSurname(), user.getVerificationCodeEmail());
        return userRepo.save(user).getId();
    }

    private boolean checkEmailIsInUse(User user) {
        return userRepo.findByEmail(user.getEmail()).size() > 0;
    }

    private boolean checkEmailValidity(String userEmail) {
        String emailRegex = "[\\w!#$%&'*+-\\/=?^_`{|}~]*@\\w+.(\\w{2,3})";
        return userEmail.matches(emailRegex);
    }

    public User authenticateUser(String email, String password) {
        if (userRepo.findByEmail(email).isEmpty()) {
            throw new IncorrectLoginException("Email or password incorrect");
        }
        User user = userRepo.findByEmail(email).get(0);
        String passtest = Encrypt.sha512(password);
        if (!user.getPassword().equals(passtest)) {
            throw new IncorrectLoginException("Email or password incorrect");
        }
        return user;
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

    public String deleteUser(String userId, User actualUser) {
        if(actualUser.getVerificationCodeEmailCheck()) throw new UnverifiedUserException("User not verified");
        if(actualUser.getType().equals("client") && !actualUser.getId().equals(userId))
            throw new UnauthorizedUserException("This user cannot delete users");
        User toDeleteUser = null;
        //Checks user exists to proceed
        if(userRepo.findById(userId).isEmpty()){
            throw new NotFoundUserException("User not found");
        } else {
            toDeleteUser = userRepo.findById(userId).get();
            userRepo.deleteById(userId);
        }
        //Additional check. If no more users for that clinic, delete the clinic
        List<User> usersOnClinic = checkUsersOnClinic(toDeleteUser.getClinicId());
        if(usersOnClinic.size() < 1) {
            clinicService.deleteClinic(toDeleteUser.getClinicId());
        }
        //Verification delete has proceeded without error
        if(userRepo.findById(userId).isEmpty()) {
            return "User deleted successfully";
        } else {
            throw new FailedActionException("Delete Action Failed");
        }
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

    public List<User> getWorkers() {
        return userRepo.findByTypeNot("client");
    }

    public void verifyEmail(String code, User user) {
        if(user.getVerificationCodeEmailCheck()) throw new IncorrectVerificationCodeException("User is already verified");
        String email = user.getEmail();
        if(userRepo.findByEmail(email).get(0).getVerificationCodeEmail().equals(code)) {
            user.setVerificationCodeEmailCheck(true);
            userRepo.save(user);
            emailSenderService.sendEmailWithoutAttachment(email, "Email verified", "Your email has been verified successfully!");
        } else {
            throw new IncorrectVerificationCodeException("Verification code does not match up");
        }
    }
}