package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Forms.LoginForm;
import com.esliceu.pawcients.Forms.RegisterForm;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.UserRepo;
import com.esliceu.pawcients.Utils.Encrypt;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public class UserService {
    UserRepo userRepo;
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public String save(RegisterForm registerForm) throws NoSuchAlgorithmException {
        User user = new User();
        user.setName(registerForm.getName());
        user.setSurname(registerForm.getSurname());
        user.setLicense(registerForm.getLicense());
        user.setEmail(registerForm.getEmail());
        user.setPhone(registerForm.getPhone());
        user.setType(registerForm.getType());
        user.setPassword(Encrypt.sha512(registerForm.getPassword()));
        user.setProfile_picture("https://www.w3schools.com/howto/img_avatar.png");
        //Generate a random nuber of 6 characters
        String code = String.valueOf((int)(Math.random()*1000000));
        user.setVerification_code_email(code);
        user.setVerification_code_email_checked("false");



        if(checkEmailIsInUse(user)){
            return "Email is already in use";
        }


        userRepo.save(user);
        return "ok";
    }

    boolean checkEmailIsInUse(User user) {
        return userRepo.findByEmail(user.getEmail()).size() > 0;
    }

    public String checkLogin(LoginForm loginForm) throws NoSuchAlgorithmException {
        //return boolean if email and password are correct
        if (userRepo.findByEmail(loginForm.getEmail()).size() > 0) {
            User user = userRepo.findByEmail(loginForm.getEmail()).get(0);
            if (user.getPassword().equals(Encrypt.sha512(loginForm.getPassword()))) {

                return "ok";
            }
        }
        return "Email or password are incorrect";
    }
}
