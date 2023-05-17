package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.UserRepo;
import com.esliceu.pawcients.Utils.Encrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public String saveVet(RegisterVetAndClinicForm registerVetAndClinicForm, String clinic_id) {
        User user = new User();
        user.setName(registerVetAndClinicForm.getName());
        user.setSurname(registerVetAndClinicForm.getSurname());
        user.setLicense(registerVetAndClinicForm.getLicense());
        user.setEmail(registerVetAndClinicForm.getEmail());
        user.setPhone(registerVetAndClinicForm.getPhone());
        user.setType(registerVetAndClinicForm.getType());
        user.setPassword(Encrypt.sha512(registerVetAndClinicForm.getPassword()));
        user.setProfile_picture("https://www.w3schools.com/howto/img_avatar.png");
        //Generate a random number of 6 characters
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerification_code_email(code);
        user.setVerification_code_email_checked(false);
        user.setClinic_id(clinic_id);

        if(checkEmailIsInUse(user)){
            throw new IncorrectRegisterException("This email is already in use");
        }

        userRepo.save(user);
        return "ok";
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
        user.setVerification_code_email(code);

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
        user.setVerification_code_email(code);

        if(checkEmailIsInUse(user)) {
            throw new IncorrectRegisterException("This email is already in use");
        }

        userRepo.save(user);
        return "ok";
    }

    boolean checkEmailIsInUse(User user) {
        return userRepo.findByEmail(user.getEmail()).size() > 0;
    }

    public String checkLogin(LoginForm loginForm) {
        //return boolean if email and password are correct
        if (userRepo.findByEmail(loginForm.getEmail()).size() > 0) {
            User user = userRepo.findByEmail(loginForm.getEmail()).get(0);
            if (user.getPassword().equals(Encrypt.sha512(loginForm.getPassword()))) {
                return "ok";
            }
        }
        return "Email or password are incorrect";
    }

    public User generateUser(String userId) {
        return userRepo.findById(userId).get();
    }

    //Debugging to get data from users through postman
    //todo Pending
    public List<User> getUsersByForm(FindUserForm fuf) {
//        List<User> users = new ArrayList<>();
//        if(!fuf.getId().isEmpty()) {
//            users.add(userRepo.findById(fuf.getId()).get());
//        } else if(!fuf.getName().isEmpty() && !fuf.getSurname().isEmpty()) {
//            users = userRepo.findByNameAndSurname();
//        }
        return null;
    }
}
