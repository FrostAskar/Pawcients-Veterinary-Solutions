package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.IncorrectLoginException;
import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.ClinicService;
import com.esliceu.pawcients.Services.TokenService;
import com.esliceu.pawcients.Services.UserService;
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

    @PostMapping("/signup/vet")
    @CrossOrigin
    public Map<String, String> registerVetAndClinic(@RequestBody RegisterVetAndClinicForm registerVetAndClinicForm, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        String clinicId = "";
        String vetId = "";

        try {
            clinicId = clinicService.saveClinic(registerVetAndClinicForm);
        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            response.setStatus(409);
            return result;
        }

        try {
            vetId = userService.saveVet(registerVetAndClinicForm, clinicId);
        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            response.setStatus(409);
            return result;
        }

        result.put("status", "Ok");
        result.put("vetId", vetId);
        result.put("clinicId", clinicId);
        response.setStatus(200);

        return result;

    }
    //Logins de trabajadores y el de los clientes estará separado.
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

    @PostMapping("/vet/aux")
    @CrossOrigin
    public Map<String, String> registerAux(@RequestBody RegisterAuxForm registerAuxForm) {
        Map<String, String> result = new HashMap<>();
        String execResult;
        try {
            execResult = userService.saveAux(registerAuxForm);
            result.put("result", execResult);
        } catch (Exception e) {
            execResult = e.getMessage();
            result.put("result", execResult);
        }
        return result;
    }

    @PostMapping("/vet/client")
    @CrossOrigin
    public Map<String, String> registerClient(@RequestBody RegisterClientForm registerClientForm) {
        Map<String, String> result = new HashMap<>();
        String execResult;
        try {
            execResult = userService.saveClient(registerClientForm);
            result.put("result", execResult);
        } catch (Exception e) {
            execResult = e.getMessage();
            result.put("result", execResult);
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
