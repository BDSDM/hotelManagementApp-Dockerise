package com.hotelmanagement.serviceImpl;

import com.hotelmanagement.dao.UserDao;
import com.hotelmanagement.dto.UserDto;
import com.hotelmanagement.dto.BookingDto;
import com.hotelmanagement.dto.RoomDto;
import com.hotelmanagement.pojo.User;
import com.hotelmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userDao.findAll();

        return users.stream().map(user -> {
            UserDto dto = new UserDto();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());

            List<BookingDto> bookingDtos = user.getBookings() != null
                    ? user.getBookings().stream().map(b -> {
                BookingDto bDto = new BookingDto();
                bDto.setId(b.getId());
                bDto.setCheckInDate(b.getCheckInDate());
                bDto.setCheckOutDate(b.getCheckOutDate());
                bDto.setStatus(b.getStatus());

                // Mapping Room vers RoomDto
                if (b.getRoom() != null) {
                    RoomDto rDto = new RoomDto();
                    rDto.setNumber(b.getRoom().getNumber());
                    rDto.setType(b.getRoom().getType());
                    rDto.setPrice(b.getRoom().getPrice());
                    bDto.setRoom(rDto);
                }

                return bDto;
            }).collect(Collectors.toList())
                    : new ArrayList<>();

            dto.setBookings(bookingDtos);

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public User getUserById(Integer id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public User saveUser(User user) {
        return userDao.save(user);
    }

    @Override
    public User updateUser(Integer id, User updatedUser) {
        User user = userDao.findById(id).orElse(null);
        if (user != null) {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            return userDao.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(Integer id) {
        userDao.deleteById(id);
    }
}
