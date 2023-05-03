package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Repos.UserRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendEmailWithoutAttachment(String to, String subject, String text) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        if (to == null || to.equals("")) return "error";
        //check regex to see if email is valid
        if (!to.matches("^[A-Za-z0-9+_.-]+@(.+)$")) return "error";

        try {
            helper = new MimeMessageHelper(message, false);
            helper.setFrom("noreply.pawcients@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            mailSender.send(message);
            return "ok";

        } catch (MessagingException e) {

            throw new RuntimeException(e);

        }
    }
}
