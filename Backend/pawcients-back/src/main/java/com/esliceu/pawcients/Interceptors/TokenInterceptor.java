package com.esliceu.pawcients.Interceptors;

import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.TokenService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    TokenService tokenService;
    UserService userService;

    public TokenInterceptor (TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
        String method = req.getMethod();
        if(method.equals("OPTIONS")) {
            return true;
        }
        String authHeader = req.getHeader("Authorization");
        if(authHeader == null) {
            return false;
        } else {
            try {
                String token = authHeader.replace("Bearer ", "");
                String userId = tokenService.getUser(token);
                User user = userService.generateUser(userId);
                req.setAttribute("user", user);
                return true;
            } catch (Exception e) {
                return false;
            }
        }
    }
}
