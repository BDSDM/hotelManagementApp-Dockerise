package com.hotelmanagement.rest;

import com.hotelmanagement.dto.UserDto;
import com.hotelmanagement.pojo.User;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface UserRest {
    List<UserDto> getAllUsers();
    ResponseEntity<User> getUserById(Integer id);
    ResponseEntity<User> saveUser(User user);
    ResponseEntity<User> updateUser(Integer id, User user);
    ResponseEntity<Void> deleteUser(Integer id);
}
