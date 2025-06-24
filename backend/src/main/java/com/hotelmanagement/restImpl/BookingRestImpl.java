package com.hotelmanagement.restImpl;

import com.hotelmanagement.pojo.Booking;
import com.hotelmanagement.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingRestImpl {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create/{userId}/{roomId}/{checkInDate}/{checkOutDate}")
    public ResponseEntity<Booking> createBooking(
            @PathVariable("userId") Integer userId,
            @PathVariable("roomId") Integer roomId,
            @PathVariable("checkInDate") String checkInDate,
            @PathVariable("checkOutDate") String checkOutDate
    ) {
        Booking booking = bookingService.createBooking(userId, roomId, checkInDate, checkOutDate);
        return ResponseEntity.ok(booking);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable("userId") Integer userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable("id") Integer id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Réservation annulée avec succès");
    }
}
