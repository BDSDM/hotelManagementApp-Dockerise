package com.hotelmanagement.service;

import com.hotelmanagement.dto.UserDto;
import com.hotelmanagement.pojo.User;
import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
    User getUserById(Integer id);
    User saveUser(User user);
    User updateUser(Integer id, User user);
    void deleteUser(Integer id);
}
