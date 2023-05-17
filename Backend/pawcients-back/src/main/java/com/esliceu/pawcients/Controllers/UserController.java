package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.ClinicService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {


    UserService userService;
    ClinicService clinicService;

    public UserController(UserService userService, ClinicService clinicService) {
        this.userService = userService;
        this.clinicService = clinicService;
    }

    @PostMapping("/signup/vet")
    @CrossOrigin
    public Map<String, String> registerVetAndClinic(@RequestBody RegisterVetAndClinicForm registerVetAndClinicForm, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        String clinic_id = clinicService.saveClinic(registerVetAndClinicForm);
        String execResult = userService.saveVet(registerVetAndClinicForm, clinic_id);
        if (execResult.equals("ok")) {
            result.put("execResult", execResult);
            response.setStatus(200);
        } else {
            result.put("execResult", execResult);
            response.setStatus(409);
        }
        return result;

    }
    //Logins de trabajadores y el de los clientes estará separado.
    @PostMapping("/login")
    @CrossOrigin
    public Map<String, String> login(@RequestBody LoginForm loginForm, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();

        String execResult = userService.checkLogin(loginForm);
        //return forbidden if login is incorrect
        result.put("message", execResult);

        if (!execResult.equals("ok")) {
            //return forbidden if login is incorrect
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
        
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
    public List<User> getUsers(@RequestBody FindUserForm findUserForm) {
        return userService.getUsersByForm(findUserForm);
    }
}
