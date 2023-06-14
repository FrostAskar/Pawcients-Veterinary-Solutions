package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Exceptions.UnverifiedUserException;
import com.esliceu.pawcients.Models.User;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    UserService userService;

    public PermissionService(UserService userService) {
        this.userService = userService;
    }

    public boolean isActualUserVerified(User actualUser) {
        if(!actualUser.getVerificationCodeEmailCheck()){
            throw new UnverifiedUserException("User is not verified");
        }
        return true;
    }

    public boolean isActualUserAuthorized(User actualUser, String requestedUserId) {
        if (actualUser.getType().equals("client") && actualUser.getId().equals(requestedUserId)) {
            return true;
        } else if (isActualUserWorker(actualUser)) {
            return true;
        }
        throw new UnauthorizedUserException("User is not authorized");
    }

    public boolean isUserRegistered(User actualUser) {
        return true;
    }

    public boolean isActualUserWorker(User actualUser) {
        if(actualUser.getType().equals("admin") || actualUser.getType().equals("vet") || actualUser.getType().equals("aux")){
            return true;
        }
        throw new UnauthorizedUserException("User is not authorized");
    }

    public boolean isActualUserAdmin(User actualUser) {
        if(actualUser.getType().equals("admin")){
            return true;
        }
        throw new UnauthorizedUserException("User is not authorized");
    }

}
