package com.esliceu.pawcients.Utils;

import com.esliceu.pawcients.PawcientsApplication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@Component
public class TimeZoneConverter {

    public LocalDateTime transformIntoClinicTimeZone(LocalDateTime timeUTC) {
        return ZonedDateTime.of(timeUTC, ZoneOffset.UTC).withZoneSameInstant(PawcientsApplication.timeZone).toLocalDateTime();
    }
}
