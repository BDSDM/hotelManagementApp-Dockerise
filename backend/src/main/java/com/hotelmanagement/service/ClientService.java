package com.hotelmanagement.service;

import com.hotelmanagement.pojo.Client;
import java.util.List;

public interface ClientService {
    Client createClient(Client client);
    List<Client> getAllClients();
    Client getClientById(Integer id);
    Client updateClient(Integer id, Client client);
    void deleteClient(Integer id);
}
