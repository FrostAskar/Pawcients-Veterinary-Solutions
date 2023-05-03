package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.LoginForm;
import com.esliceu.pawcients.Forms.RegisterForm;
import com.esliceu.pawcients.Services.EmailSenderService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
public class UserController {


    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup/vet")
    @CrossOrigin
    public Map<String, String> registerVet(@RequestBody RegisterForm registerForm, HttpServletResponse response) throws NoSuchAlgorithmException {
        Map<String, String> result = new HashMap<>();

        String execResult = userService.save(registerForm);
        if (execResult.equals("ok")) {
            response.setStatus(200);
            result.put("result", execResult);
        } else {
            result.put("result", execResult);
            response.setStatus(409);
        }
        return result;

    }
    //Logins de trabajadores y el de los clientes estará separado.
    @PostMapping("/login")
    @CrossOrigin
    public Map<String, String> login(@RequestBody LoginForm loginForm, HttpServletResponse response) throws NoSuchAlgorithmException {
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




}
