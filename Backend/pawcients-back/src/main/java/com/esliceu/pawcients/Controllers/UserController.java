package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.DTO.ClientDTO;
import com.esliceu.pawcients.Exceptions.*;
import com.esliceu.pawcients.Forms.*;
import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.PawcientsApplication;
import com.esliceu.pawcients.Services.*;
import com.esliceu.pawcients.Utils.Encrypt;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UserController {


    UserService userService;
    ClinicService clinicService;
    TokenService tokenService;
    AppointmentService appointmentService;
    MascotService mascotService;
    PermissionService permissionService;
    EmailSenderService emailSenderService;

    public UserController(UserService userService,
                          ClinicService clinicService,
                          TokenService tokenService,
                          AppointmentService appointmentService,
                          MascotService mascotService,
                          PermissionService permissionService,
                          EmailSenderService emailSenderService) {
        this.userService = userService;
        this.clinicService = clinicService;
        this.tokenService = tokenService;
        this.appointmentService = appointmentService;
        this.mascotService = mascotService;
        this.permissionService = permissionService;
        this.emailSenderService = emailSenderService;
    }

    @GetMapping("/getprofile")
    @CrossOrigin
    public User getProfile(HttpServletRequest req) {
        return (User) req.getAttribute("user");
    }

    @GetMapping("/vet/workers")
    @CrossOrigin
    public List<User> getWorkers(HttpServletRequest req) {
        User actualUser = (User) req.getAttribute("user");
        return userService.getWorkersByClinic(actualUser.getClinicId());
    }

    @GetMapping("/vet/clients")
    @CrossOrigin
    public List<ClientDTO> getClients(HttpServletRequest req, HttpServletResponse res) {
        List<ClientDTO> clientData = new ArrayList<>();
        List<User> clients = new ArrayList<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            clients = userService.getClientsByClinic(actualUser.getClinicId());
            res.setStatus(200);
        } catch (ExpiredUserException e) {
            res.setStatus(409);
            return null;
        }
        for (User u: clients) {
            ClientDTO cdto = new ClientDTO();
            cdto.setAppointment(appointmentService.getEarliestClientAppointment(u.getId()));
            cdto.setClient(u);
            clientData.add(cdto);
        }
        return clientData;
    }

    @GetMapping("/recoverpass/{userId}")
    @CrossOrigin
    public Map<String, Object> sendNewPassword(@PathVariable String userId, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try{
            User user = userService.generateUser(userId);
            String newPass = Encrypt.createTempPassword();
            if(PawcientsApplication.emailSenderEnable) {
                emailSenderService.sendNewPassword(user, newPass);
            }
            result.put("Success", "New password has been sent to your email");
            res.setStatus(200);
        } catch (NotFoundUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
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
                        registerVetAndClinicForm.getEmail().toLowerCase(),
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
            user = userService.authenticateUser(loginForm.getEmail().toLowerCase(), loginForm.getPassword());
            res.setStatus(200);
        } catch (IncorrectLoginException e) {
            result.put("message", e.getMessage());
            res.setStatus(401);
            return result;
        }
        String token = tokenService.createToken(user);
        result.put("user", user);
        result.put("iat", tokenService.getIat(token).toInstant().toEpochMilli());
        result.put("token", token);
        return result;
    }

    @PostMapping("/vet/worker")
    @CrossOrigin
    public Map<String, String> registerWorker(@RequestBody RegisterUserForm registerUserForm,
                                              HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String workerId;
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            User user = new User(null,
                    registerUserForm.getName(),
                    registerUserForm.getSurname(),
                    registerUserForm.getLicense(),
                    registerUserForm.getEmail().toLowerCase(),
                    registerUserForm.getPhone(),
                    registerUserForm.getType(),
                    actualUser.getClinicId());
            permissionService.isActualUserWorker(actualUser);
            workerId = userService.saveUser(user);
            result.put("workerId", workerId);
            result.put("status", "ok");
            res.setStatus(200);
        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        } catch (UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }


    @PostMapping("/vet/client")
    @CrossOrigin
    public Map<String, String> registerClient(@RequestBody RegisterUserForm registerUserForm,
                                              HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        String clientId = "";
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            User user = new User(null,
                    registerUserForm.getEmail().toLowerCase(),
                    registerUserForm.getName(),
                    registerUserForm.getSurname(),
                    "client",
                    actualUser.getClinicId(),
                    registerUserForm.getPhone());
            clientId = userService.saveUser(user);
            result.put("clientId", clientId);
            result.put("status", "ok");
            res.setStatus(200);
        } catch (IncorrectRegisterException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }

    @PostMapping("/verifyemail")
    @CrossOrigin
    public Map<String, String> verifyEmail(@RequestBody VerifyEmailForm verifyEmailForm,
                                           HttpServletResponse res, HttpServletRequest req) {
        Map<String, String> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            userService.verifyEmail(verifyEmailForm.getCode(), actualUser);
            res.setStatus(204);
        } catch (IncorrectVerificationCodeException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PostMapping("/passwordreset")
    @CrossOrigin
    public Map<String, Object> requestNewPassword(@RequestBody ChangePasswordForm changePasswordForm,
                                               HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try{
            User user = userService.getUserByEmail(changePasswordForm.getEmail());
            if(PawcientsApplication.emailSenderEnable) {
                emailSenderService.sendPasswordRecoveryEmail(user);
            }
            result.put("action", "Password recovery email sent");
            res.setStatus(200);
        } catch (NotFoundUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @DeleteMapping("/vet/{userId}")
    @CrossOrigin
    public Map<String, String> deleteUser(@PathVariable String userId,
                                          HttpServletRequest req, HttpServletResponse res) {
        Map<String, String> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, userId);
            User target = userService.generateUser(userId);
            String action = userService.deleteUser(target);
            mascotService.deleteMascotByOwnerId(userId);
            appointmentService.deleteAppointmentByClientId(userId);
            result.put("action", action);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (UnverifiedUserException | NotFoundUserException | FailedActionException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PutMapping("/profilesettings")
    @CrossOrigin
    public Map<String, Object> updateProfile(@RequestBody UpdateUserForm updateUserForm,
                                             HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserRequestingUser(actualUser, updateUserForm.getClient_id());
            String userId = userService.updateUser(actualUser, updateUserForm);
            result.put("userId", userId);
            res.setStatus(200);
        } catch (ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }

    @PutMapping("/profilesettings/changepassword")
    @CrossOrigin
    public Map<String, Object> updatePassword(@RequestBody ChangePasswordForm changePasswordForm,
                                              HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserRequestingUser(actualUser, changePasswordForm.getClient_id());
            String userId = userService.updateUserPassword(actualUser, changePasswordForm);
            result.put("userId", userId);
            res.setStatus(200);
        } catch (ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (InvalidPasswordException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }
}
