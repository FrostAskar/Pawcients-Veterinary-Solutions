package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.IncorrectLoginException;
import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
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

    public UserService(UserRepo userRepo, ClinicService clinicService) {
        this.userRepo = userRepo;
        this.clinicService = clinicService;
    }

    public String saveVet(RegisterVetAndClinicForm registerVetAndClinicForm, String clinicId) {
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

    public String saveAux(RegisterAuxForm registerAuxForm) {
        User user = new User(
                null,
                registerAuxForm.getName(),
                registerAuxForm.getSurname(),
                registerAuxForm.getLicense(),
                registerAuxForm.getEmail(),
                registerAuxForm.getPhone(),
                registerAuxForm.getType(),
                Encrypt.sha512(registerAuxForm.getPassword())
        );
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerificationCodeEmail(code);

        if(checkEmailIsInUse(user)) {
            throw new IncorrectRegisterException("This email is already in use");
        }

        userRepo.save(user);
        return "ok";
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
                registerClientForm.getPassword()
        );
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerificationCodeEmail(code);

        if(checkEmailIsInUse(user)) {
            throw new IncorrectRegisterException("This email is already in use");
        }

        userRepo.save(user);
        return "ok";
    }

    boolean checkEmailIsInUse(User user) {
        return userRepo.findByEmail(user.getEmail()).size() > 0;
    }

//    public String checkLogin(LoginForm loginForm) {
//        //return boolean if email and password are correct
//        if (userRepo.findByEmail(loginForm.getEmail()).size() > 0) {
//            User user = userRepo.findByEmail(loginForm.getEmail()).get(0);
//            if (user.getPassword().equals(Encrypt.sha512(loginForm.getPassword()))) {
//                return "ok";
//            }
//        }
//        return "Email or password are incorrect";
//    }

    public User authenticateUser(String email, String password) {
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
}
