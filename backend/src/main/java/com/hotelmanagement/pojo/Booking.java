package com.hotelmanagement.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String status; // "CONFIRMED", "CANCELLED"

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public Booking() {}

    public Booking(LocalDate checkInDate, LocalDate checkOutDate, String status, Room room, User user) {
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.status = status;
        this.room = room;
        this.user = user;
    }

    // Getters / Setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public LocalDate getCheckInDate() { return checkInDate; }

    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }

    public LocalDate getCheckOutDate() { return checkOutDate; }

    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Room getRoom() { return room; }

    public void setRoom(Room room) { this.room = room; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}
