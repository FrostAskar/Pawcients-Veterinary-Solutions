package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.*;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.ClinicService;
import com.esliceu.pawcients.Services.TokenService;
import com.esliceu.pawcients.Services.UserService;
import com.esliceu.pawcients.Utils.Encrypt;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {


    UserService userService;
    ClinicService clinicService;
    TokenService tokenService;

    public UserController(UserService userService,
                          ClinicService clinicService,
                          TokenService tokenService) {
        this.userService = userService;
        this.clinicService = clinicService;
        this.tokenService = tokenService;
    }

    @PostMapping("/signup/admin")
    @CrossOrigin
    public Map<String, String> registerAdminAndClinic(@RequestBody RegisterVetAndClinicForm registerVetAndClinicForm, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        String clinicId = "";
        String adminId = "";
        try {
            Clinic clinic = new Clinic(null,
                    registerVetAndClinicForm.getClinicName(),
                    registerVetAndClinicForm.getClinicAddress(),
                    registerVetAndClinicForm.getClinicPhoneNumber(),
                    registerVetAndClinicForm.getClinicZipCode());
            clinicId = clinicService.saveClinic(clinic);
            try {
                User user = new User(null,
                        registerVetAndClinicForm.getName(),
                        registerVetAndClinicForm.getSurname(),
                        registerVetAndClinicForm.getLicense(),
                        registerVetAndClinicForm.getEmail(),
                        registerVetAndClinicForm.getPhone(),
                        "admin",
                        Encrypt.sha512(registerVetAndClinicForm.getPassword()),
                        clinicId);
                user.setVerificationCodeEmailCheck(true);
                adminId = userService.saveAdmin(user);
            } catch (IncorrectRegisterException e) {
                //Clinic is required to be registered to have an ID for the user. If user can't be registered, delete clinic
                clinicService.deleteClinic(clinicId);
                result.put("error", e.getMessage());
                response.setStatus(409);
                return result;
            }
            result.put("clinicId", clinicId);
            result.put("adminId", adminId);
            result.put("status", "Ok");
        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            response.setStatus(409);
            return result;
        }

        response.setStatus(200);
        
        return result;

    }
    @PostMapping("/login")
    @CrossOrigin
    public Map<String, Object> login(@RequestBody LoginForm loginForm, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        User user = null;
        try{
            user = userService.authenticateUser(loginForm.getEmail(), loginForm.getPassword());
            res.setStatus(200);
        } catch (IncorrectLoginException e) {
            result.put("message", e.getMessage());
            res.setStatus(401);
            return result;
        }
        result.put("user", user);
        result.put("token", tokenService.createToken(user));
        return result;
    }

    @PostMapping("/vet/worker")
    @CrossOrigin
    public Map<String, String> registerWorker(@RequestBody RegisterUserForm registerUserForm,
                                              HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String workerId;
        User actualUser = (User) req.getAttribute("user");
        try {
            User user = new User(null,
                    registerUserForm.getName(),
                    registerUserForm.getSurname(),
                    registerUserForm.getLicense(),
                    registerUserForm.getEmail(),
                    registerUserForm.getPhone(),
                    registerUserForm.getType(),
                    Encrypt.sha512(registerUserForm.getPassword()),
                    actualUser.getClinicId());
            workerId = userService.saveUser(user, actualUser);
            result.put("workerId", workerId);

        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }


    @PostMapping("/vet/client")
    @CrossOrigin
    public Map<String, String> registerClient(@RequestBody RegisterUserForm registerUserForm,
                                              HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String clientId = "";
        User actualUser = (User) req.getAttribute("user");
        try {
            User user = new User(null,
                    registerUserForm.getName(),
                    registerUserForm.getSurname(),
                    registerUserForm.getEmail(),
                    registerUserForm.getPhone(),
                    registerUserForm.getType(),
                    Encrypt.sha512(registerUserForm.getPassword()),
                    actualUser.getClinicId());
            clientId = userService.saveUser(user, actualUser);
            result.put("clientId", clientId);
            result.put("status", "ok");

        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    //Debugger methods to recover data for postman
    @GetMapping("/users")
    @CrossOrigin
    public Map<String, Object> getUsers(@RequestBody FindUserForm findUserForm,
                                        HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<User> usersFound = userService.getUsersByForm(findUserForm);
            result.put("users", usersFound);
        } catch (NotFoundUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @GetMapping("/getprofile")
    @CrossOrigin
    public User getProfile(HttpServletRequest req) {
        return (User) req.getAttribute("user");
    }

    @DeleteMapping("/vet/client/{clientId}")
    @CrossOrigin
    public Map<String, String> deleteUser(@PathVariable String clientId,
                             HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        User actualUser = (User) req.getAttribute("user");
        try {
            String action = userService.deleteUser(clientId, actualUser);
            result.put("action", action);
            res.setStatus(200);
        } catch (UnverifiedUserException | UnauthorizedUserException | FailedActionException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PostMapping("/verifyemail")
    @CrossOrigin
    public Map<String, String> verifyEmail(@RequestBody VerifyEmailForm verifyEmailForm,
                                           HttpServletResponse res, HttpServletRequest req) {
        Map<String, String> result = new HashMap<>();
        User user = (User) req.getAttribute("user");
        try {
            userService.verifyEmail(verifyEmailForm.getCode(), user);
            res.setStatus(204);
        } catch (IncorrectVerificationCodeException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @GetMapping("/vet/workers")
    @CrossOrigin
    public List<User> getWorkers() {
        List<User> workers = new ArrayList<>();
        workers.addAll(userService.getWorkers());
        return workers;
    }
}
