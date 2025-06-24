package com.hotelmanagement.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RequestMapping("/booking")
public interface BookingRest {

    @PostMapping("/create/{userId}/{roomId}/{checkInDate}/{checkOutDate}")
    ResponseEntity<?> createBooking(
            @PathVariable Long userId,
            @PathVariable Long roomId,
            @PathVariable String checkInDate,
            @PathVariable String checkOutDate
    );
}
