package com.hotelmanagement.dao;

import com.hotelmanagement.pojo.Booking;
import com.hotelmanagement.pojo.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingDao extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserId(Integer userId);
    List<Booking> findByRoomId(Integer roomId);
    Optional<Booking> findByRoomAndStatus(Room room, String status);

}
