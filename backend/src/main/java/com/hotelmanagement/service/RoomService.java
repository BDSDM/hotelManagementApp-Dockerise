package com.hotelmanagement.service;

import com.hotelmanagement.dto.RoomDto;
import com.hotelmanagement.pojo.Room;

import java.util.List;

public interface RoomService {
    Room addRoom(Room room);
    List<Room> getAllRooms();
    Room updateRoom(RoomDto roomDto);

    void deleteRoom(Integer id);
}
