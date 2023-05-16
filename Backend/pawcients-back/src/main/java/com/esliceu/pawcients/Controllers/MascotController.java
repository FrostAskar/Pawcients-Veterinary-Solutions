package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Services.MascotService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
public class MascotController {

    MascotService mascotService;

    public MascotController(MascotService mascotService) {
        this.mascotService = mascotService;
    }

    @GetMapping
    @CrossOrigin
    public List<Mascot> getMascot(@RequestBody FindMascotForm findMascotForm) {
        return mascotService.findMascot(findMascotForm);
    }

    @PostMapping
    @CrossOrigin
    public Map<String, Object> registerMascot (@RequestBody RegisterMascotForm registerMascotForm) {
        Map<String, Object> result = new HashMap<>();

        mascotService.saveMascot(registerMascotForm);

        return result;
    }
}
