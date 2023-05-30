package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.IncorrectLoginException;
import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
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
    public Map<String, String> registerWorker(@RequestBody RegisterWorkerForm registerWorkerForm,
                                              HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String workerId;
        User actualUser = (User) req.getAttribute("user");
        try {
            User user = new User(null,
                    registerWorkerForm.getName(),
                    registerWorkerForm.getSurname(),
                    registerWorkerForm.getLicense(),
                    registerWorkerForm.getEmail(),
                    registerWorkerForm.getPhone(),
                    registerWorkerForm.getType(),
                    Encrypt.sha512(registerWorkerForm.getPassword()),
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
    public Map<String, String> registerClient(@RequestBody RegisterClientForm registerClientForm,
                                              HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String clientId = "";
        User actualUser = (User) req.getAttribute("user");
        try {
<<<<<<< HEAD
            User user = new User(null,
                    registerClientForm.getName(),
                    registerClientForm.getSurname(),
                    registerClientForm.getEmail(),
                    registerClientForm.getPhone(),
                    registerClientForm.getType(),
                    Encrypt.sha512(registerClientForm.getPassword()),
                    actualUser.getClinicId());
            clientId = userService.saveUser(user, actualUser);
=======
            clientId = userService.saveClient(registerClientForm);
            result.put("clientId", clientId);
>>>>>>> a34c224d7694a7c6bc82fcd916eebeb2de2fbdc3

        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        result.put("clientId", clientId);
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

    @DeleteMapping("/user/{userId}")
    @CrossOrigin
    public String deleteUser(@PathVariable String userId) {
        return userService.deleteUser(userId);
    }

    @PostMapping("/verifyemail")
    @CrossOrigin
    public Map<String, String> verifyEmail(@RequestBody VerifyEmailForm verifyEmailForm,
                                           HttpServletResponse res, @RequestHeader("Authorization") String token) {
        Map<String, String> result = new HashMap<>();
        try {
           String status = userService.verifyEmail(verifyEmailForm.getCode(), token);

            //userService.verifyEmail(verifyEmailForm.getCode(), );
            result.put("status", status);
            if (status.equals("ok")) {
                res.setStatus(200);
            } else {
                res.setStatus(409);
            }
        } catch (NotFoundUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }
}
