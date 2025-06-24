package com.hotelmanagement.dao;

import com.hotelmanagement.pojo.Booking;
import com.hotelmanagement.pojo.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomDao extends JpaRepository<Room, Integer> {
    Room findByNumber(String number);

}
