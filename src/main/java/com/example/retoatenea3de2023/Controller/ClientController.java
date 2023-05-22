package com.example.retoatenea3de2023.Controller;


import com.example.retoatenea3de2023.Model.Client;
import com.example.retoatenea3de2023.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*",methods= {RequestMethod.GET , RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all") //local host/api/Client/all
    public List<Client> getAll(){
        return clientService.getAll();
    }

    @GetMapping("/{id}") //local host/api/cClient/id
    public Optional<Client> getClient(@PathVariable int id){
        return clientService.getClient(id);
    }


    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save (@RequestBody Client client){
        return clientService.save(client);


    }
}
