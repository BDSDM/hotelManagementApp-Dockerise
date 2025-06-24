package com.hotelmanagement.serviceImpl;

import com.hotelmanagement.dao.BookingDao;
import com.hotelmanagement.dao.RoomDao;
import com.hotelmanagement.dao.UserDao;
import com.hotelmanagement.pojo.Booking;
import com.hotelmanagement.pojo.Room;
import com.hotelmanagement.pojo.User;
import com.hotelmanagement.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private RoomDao roomDao;
    @Autowired
    private UserDao userDao;
    @Override
    public Optional<Booking> getConfirmedBookingByRoom(Room room) {
        return bookingDao.findByRoomAndStatus(room, "CONFIRMED");
    }


    @Override
    public Booking createBooking(Integer userId, Integer roomId, String checkInDate, String checkOutDate) {
        Room room = roomDao.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Chambre non trouvée"));

        User user = userDao.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        room.setAvailable(false);
        roomDao.save(room);

        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setUser(user);
        booking.setCheckInDate(LocalDate.parse(checkInDate));
        booking.setCheckOutDate(LocalDate.parse(checkOutDate));
        booking.setStatus("CONFIRMED");

        return bookingDao.save(booking);
    }


    @Override
    public List<Booking> getAllBookings() {
        return bookingDao.findAll();
    }

    @Override
    public List<Booking> getBookingsByUserId(Integer userId) {
        return bookingDao.findByUserId(userId);
    }

    @Override
    public void cancelBooking(Integer bookingId) {
        Booking booking = bookingDao.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus("cancelled");
            booking.getRoom().setAvailable(true);
            bookingDao.save(booking);
            roomDao.save(booking.getRoom());
        }
    }
}
