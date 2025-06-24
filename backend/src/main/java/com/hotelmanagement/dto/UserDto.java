package com.hotelmanagement.dto;

import java.util.List;

public class UserDto {
    private Integer id;
    private String name;
    private String email;
    private String role;
    private List<BookingDto> bookings;

    // Getters
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public List<BookingDto> getBookings() {
        return bookings;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setBookings(List<BookingDto> bookings) {
        this.bookings = bookings;
    }
}
