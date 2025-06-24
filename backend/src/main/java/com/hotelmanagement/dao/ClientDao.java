package com.hotelmanagement.dao;

import com.hotelmanagement.pojo.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientDao extends JpaRepository<Client, Integer> {
}
