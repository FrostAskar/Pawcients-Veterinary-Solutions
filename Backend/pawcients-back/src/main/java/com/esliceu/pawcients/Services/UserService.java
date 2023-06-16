package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.*;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.PawcientsApplication;
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

    public String saveUser(User user) {
        if(!checkEmailValidity(user.getEmail()))
            throw new IncorrectRegisterException("Email is not a valid email");
        if (checkEmailIsInUse(user))
            throw new IncorrectRegisterException("This email is already in use");
        String verificationCode = String.valueOf((int)(Math.random()*1000000));
        String tempPassword = Encrypt.createTempPassword();
        System.out.println(tempPassword);
        user.setVerificationCodeEmail(verificationCode);
        user.setPassword(Encrypt.sha512(tempPassword));
        if(PawcientsApplication.emailSenderEnable) {
            emailSenderService.SendWelcomeEmail(user, tempPassword);
        }
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
        if(userRepo.findById(userId).isEmpty())
            throw new NotFoundUserException("User does not exist");
        return userRepo.findById(userId).get();
    }

    public String deleteUser(User targetUser) {
        if (targetUser.getType().equals("admin"))
            throw new FailedActionException("Admin can not be deleted");
        userRepo.deleteById(targetUser.getId());
        //Additional check. If no more users for that clinic, delete the clinic
        List<User> usersOnClinic = getUsersByClinic(targetUser.getClinicId());
        if(usersOnClinic.size() < 1) {
            clinicService.deleteClinic(targetUser.getClinicId());
        }
        //Verification delete has proceeded without error
        if(!userRepo.findById(targetUser.getId()).isEmpty()) {
            throw new FailedActionException("Delete Action Failed");
        }
        return "User deleted successfully";
    }

    public List<User> getUsersByClinic(String clinicId) {
        return userRepo.findByClinicId(clinicId);
    }

    public void deleteAllUsersInClinic(String clinicId) {
        List<User> usersInClinic = userRepo.findByClinicId(clinicId);
        for(User user : usersInClinic) {
            userRepo.deleteById(user.getId());
        }
    }

    public List<User> getWorkersByClinic(String clinicId) {
        return userRepo.findByTypeNotAndClinicId("client", clinicId);
    }

    public void verifyEmail(String code, User user) {
        if(user.getVerificationCodeEmailCheck()) throw new IncorrectVerificationCodeException("User is already verified");
        String email = user.getEmail();
        if(userRepo.findByEmail(email).get(0).getVerificationCodeEmail().equals(code)) {
            user.setVerificationCodeEmailCheck(true);
            userRepo.save(user);
            if(PawcientsApplication.emailSenderEnable) {
                emailSenderService.sendEmailWithoutAttachment(email, "Email verified", "Your email has been verified successfully!");
            }
        } else {
            throw new IncorrectVerificationCodeException("Verification code does not match up");
        }
    }

    public List<User> getClientsByClinic(String clinicId) {
        List<User> clientsInClinic = userRepo.findByTypeAndClinicId("client", clinicId);
        if(clientsInClinic.size() < 1) {
            throw new NotFoundUserException("No clients were found in this clinic");
        }
        return clientsInClinic;
    }

    public User getActualUser(User actualUser) {
        if (actualUser == null) {
            throw new ExpiredUserException("User has expired. Please, log back in");
        }
        return actualUser;
    }

    public User getUserByEmail(String email) {
        if(userRepo.findByEmail(email).isEmpty())
            throw new NotFoundUserException("This email is not registered");
        return userRepo.findByEmail(email).get(0);
    }

    public String updateUserPassword(User actualUser, ChangePasswordForm changePasswordForm) {
        if(changePasswordForm.getCurrentpassword().isEmpty() || changePasswordForm.getNewpassword().isEmpty())
            throw new InvalidPasswordException("Passwords cannot be empty");
        if(changePasswordForm.getCurrentpassword().equals(changePasswordForm.getNewpassword()))
            throw new InvalidPasswordException("New passwords can not match with old password");
        if(!actualUser.getPassword().equals(Encrypt.sha512(changePasswordForm.getCurrentpassword())))
            throw new InvalidPasswordException("Current password is incorrect");
        actualUser.setPassword(Encrypt.sha512(changePasswordForm.getNewpassword()));
        return userRepo.save(actualUser).getId();
    }

    public String updateUser(User actualUser, UpdateUserForm updateUserForm) {
        actualUser.setName(updateUserForm.getName());
        actualUser.setSurname(updateUserForm.getSurname());
        actualUser.setPhone(updateUserForm.getPhone());
        return userRepo.save(actualUser).getId();
    }
}