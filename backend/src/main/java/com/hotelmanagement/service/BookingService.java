package com.hotelmanagement.service;

import com.hotelmanagement.pojo.Booking;
import com.hotelmanagement.pojo.Room;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking createBooking(Integer userId, Integer roomId, String checkInDate, String checkOutDate);

    Optional<Booking> getConfirmedBookingByRoom(Room room);

    List<Booking> getAllBookings();

    List<Booking> getBookingsByUserId(Integer userId);

    void cancelBooking(Integer bookingId);

}
