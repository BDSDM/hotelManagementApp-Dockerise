package com.hotelmanagement.serviceImpl;

import com.hotelmanagement.dao.ClientDao;
import com.hotelmanagement.pojo.Client;
import com.hotelmanagement.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientDao clientDao;

    @Override
    public Client createClient(Client client) {
        return clientDao.save(client);
    }

    @Override
    public List<Client> getAllClients() {
        return clientDao.findAll();
    }

    @Override
    public Client getClientById(Integer id) {
        return clientDao.findById(id).orElse(null);
    }

    @Override
    public Client updateClient(Integer id, Client client) {
        Optional<Client> existing = clientDao.findById(id);
        if (existing.isPresent()) {
            Client c = existing.get();
            c.setNom(client.getNom());
            c.setPrenom(client.getPrenom());
            c.setEmail(client.getEmail());
            c.setTelephone(client.getTelephone());
            c.setAdresse(client.getAdresse());
            return clientDao.save(c);
        }
        return null;
    }

    @Override
    public void deleteClient(Integer id) {
        clientDao.deleteById(id);
    }
}
