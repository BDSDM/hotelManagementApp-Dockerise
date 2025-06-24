package com.hotelmanagement.serviceImpl;

import com.hotelmanagement.dao.RoomDao;
import com.hotelmanagement.dto.RoomDto;
import com.hotelmanagement.pojo.Room;
import com.hotelmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomDao roomDao;

    @Override
    public Room addRoom(Room room) {
        return roomDao.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomDao.findAll();
    }

    @Override
    public Room updateRoom(RoomDto roomDto) {
        Room existingRoom = roomDao.findById(roomDto.getId())
                .orElseThrow(() -> new RuntimeException("Chambre non trouvée avec l'ID : " + roomDto.getId()));

        existingRoom.setNumber(roomDto.getNumber());
        existingRoom.setType(roomDto.getType());
        existingRoom.setPrice(roomDto.getPrice());
        existingRoom.setAvailable(roomDto.isAvailable()); // très important

        return roomDao.save(existingRoom);
    }


    @Override
    public void deleteRoom(Integer id) {
        roomDao.deleteById(id);
    }
}
