package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.NotFoundMascotException;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Exceptions.UnverifiedUserException;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Forms.UpdateMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.MascotRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class MascotService {

    MascotRepo mascotRepo;
    UserService userService;

    public MascotService(MascotRepo mascotRepo, UserService userService) {
        this.mascotRepo = mascotRepo;
        this.userService = userService;
    }

    public Mascot findMascotById(String mascotId) {
        if (mascotRepo.findById(mascotId).isEmpty()) {
            throw new NotFoundMascotException("This mascot does not exist");
        }
        return mascotRepo.findById(mascotId).get();
    }

    public List<Mascot> findMascotsByUser(String userId) {
        return mascotRepo.findByOwnerId(userId);
    }

    public String saveMascot(Mascot mascot){
        if(userService.userRepo.findById(mascot.getOwnerId()).isEmpty())
            throw new NotFoundUserException("User not found");
        return mascotRepo.save(mascot).getId();
    }

    public List<Mascot> findMascotsByClinic(String clinicId) {
        return mascotRepo.findByClinicId(clinicId);
    }

    public Mascot updateMascotInfo(Mascot mascotToUpdate, UpdateMascotForm updateMascotForm) {
        mascotToUpdate.setAge(updateMascotForm.getAge());
        mascotToUpdate.setGender(updateMascotForm.getGender());
        mascotToUpdate.setWeight(updateMascotForm.getWeight());
        mascotToUpdate.setColor(updateMascotForm.getColor());
        mascotToUpdate.setIdentificationSerial(updateMascotForm.getIdentificationNumber());
        mascotToUpdate.setPhoto(updateMascotForm.getPhoto());
        mascotToUpdate.setBreed(updateMascotForm.getBreed());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate birthDate = LocalDate.parse(updateMascotForm.getBirthDate(), formatter);
        mascotToUpdate.setBirthDate(birthDate);
        return mascotToUpdate;
    }

    public void updateMascot(Mascot mascotToUpdate) {
        mascotRepo.save(mascotToUpdate);
    }

    public void deleteMascotByOwnerId(String ownerId) {
        List<Mascot> mascotsFromOwner = mascotRepo.findByOwnerId(ownerId);
        if(mascotsFromOwner.size() > 0){
            for(Mascot m : mascotsFromOwner) {
                mascotRepo.deleteById(m.getId());
            }
        }
    }
}
