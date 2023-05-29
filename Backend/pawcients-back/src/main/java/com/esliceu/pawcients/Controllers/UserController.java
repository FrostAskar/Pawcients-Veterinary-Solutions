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
        Clinic clinic = new Clinic(null,
                registerVetAndClinicForm.getClinicName(),
                registerVetAndClinicForm.getClinicAddress(),
                registerVetAndClinicForm.getClinicPhoneNumber(),
                registerVetAndClinicForm.getClinicZipCode());
        User user = new User(null,
                registerVetAndClinicForm.getName(),
                registerVetAndClinicForm.getSurname(),
                registerVetAndClinicForm.getLicense(),
                registerVetAndClinicForm.getEmail(),
                registerVetAndClinicForm.getPhone(),
                "admin",
                Encrypt.sha512(registerVetAndClinicForm.getPassword()),
                clinicId);
        try {
            clinicId = clinicService.saveClinic(registerVetAndClinicForm);
            try {
                adminId = userService.saveAdmin(registerVetAndClinicForm, clinicId);
            } catch (IncorrectRegisterException e) {
                result.put("error", e.getMessage());
                response.setStatus(409);
                return result;
            }
        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            response.setStatus(409);
            return result;
        }

        result.put("status", "Ok");
        result.put("adminId", adminId);
        result.put("clinicId", clinicId);
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
        try {
            workerId = userService.saveWorker(registerWorkerForm);
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
                                              HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String clientId;
        try {
            clientId = userService.saveClient(registerClientForm);
            result.put("clientId", clientId);
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

    @DeleteMapping("/user/{userId}")
    @CrossOrigin
    public String deleteUser(@PathVariable String userId) {
        return userService.deleteUser(userId);
    }
}
