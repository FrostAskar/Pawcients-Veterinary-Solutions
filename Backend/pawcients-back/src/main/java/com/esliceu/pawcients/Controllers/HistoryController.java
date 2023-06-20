package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.ExpiredUserException;
import com.esliceu.pawcients.Exceptions.NotFoundHistoryException;
import com.esliceu.pawcients.Exceptions.NotFoundMascotException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Forms.UpdateHistoryForm;
import com.esliceu.pawcients.Models.History;
import com.esliceu.pawcients.Models.HistoryDetails.Visit;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.HistoryService;
import com.esliceu.pawcients.Services.MascotService;
import com.esliceu.pawcients.Services.PermissionService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HistoryController {

    HistoryService historyService;
    MascotService mascotService;
    PermissionService permissionService;
    UserService userService;

    public HistoryController(HistoryService historyService, MascotService mascotService,
                             PermissionService permissionService, UserService userService) {
        this.historyService = historyService;
        this.mascotService = mascotService;
        this.permissionService = permissionService;
        this.userService = userService;
    }

    @GetMapping("/mascot/{mascotId}/history")
    @CrossOrigin
    public Map<String, Object> getHistoryForMascot(@PathVariable String mascotId,
                                                   HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            Mascot mascot = mascotService.findMascotById(mascotId);
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, mascot.getOwnerId());
            History history = historyService.getHistoryFromMascot(mascot);
            result.put("history", history);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundMascotException | NotFoundHistoryException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PostMapping("/mascot/{mascotId}/history")
    @CrossOrigin
    public Map<String, Object> createVisitForHistory(@PathVariable String mascotId,
                                             HttpServletRequest req, HttpServletResponse res,
                                             @RequestBody UpdateHistoryForm updateHistoryForm) {
        Map<String, Object> result = new HashMap<>();
        LocalDate today = LocalDate.now();
        try{
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            Mascot mascot = mascotService.findMascotById(mascotId);
            Visit visit = new Visit(today, updateHistoryForm.getVisitNotes());
            String historyId = historyService.registerVisit(mascot, visit, updateHistoryForm);
            mascot.setHistoryId(historyId);
            mascotService.saveMascot(mascot);
            result.put("historyId", historyId);
        } catch(ExpiredUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch(NotFoundMascotException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }
}
