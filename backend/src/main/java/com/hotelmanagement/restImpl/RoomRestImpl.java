package com.hotelmanagement.restImpl;

import com.hotelmanagement.dto.RoomDto;
import com.hotelmanagement.pojo.Booking;
import com.hotelmanagement.pojo.Room;
import com.hotelmanagement.service.BookingService;
import com.hotelmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomRestImpl {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookingService bookingService;

    @PostMapping("/add")
    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.addRoom(room));
    }

    @GetMapping("/all")
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDto> roomDtos = new ArrayList<>();

        for (Room room : rooms) {
            RoomDto dto = new RoomDto();

            dto.setId(room.getId());
            dto.setNumber(room.getNumber());
            dto.setType(room.getType());
            dto.setPrice(room.getPrice());
            dto.setAvailable(room.isAvailable()); // ✅ On récupère la vraie valeur depuis la base

            Optional<Booking> bookingOpt = bookingService.getConfirmedBookingByRoom(room);
            if (bookingOpt.isPresent()) {
                Booking booking = bookingOpt.get();
                dto.setBookingId(booking.getId());
                if (booking.getUser() != null) {
                    dto.setUserId(booking.getUser().getId());
                }
            } else {
                dto.setUserId(null);
                dto.setBookingId(null);
            }

            roomDtos.add(dto);
        }
        return ResponseEntity.ok(roomDtos);
    }


    @PutMapping("/update")
    public ResponseEntity<Room> updateRoom(@RequestBody RoomDto roomDto) {
        Room updatedRoom = roomService.updateRoom(roomDto);
        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable("id") Integer id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Chambre supprimée avec succès");
    }
}
