package com.example.retoatenea3de2023.Controller;

import com.example.retoatenea3de2023.Model.Gama;
import com.example.retoatenea3de2023.Service.GamaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*",methods= {RequestMethod.GET , RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/Gama")
public class GamaController {

    @Autowired
    private GamaService gamaService;

    @GetMapping("/all") //local host/api/Gama/all
    public List<Gama> getAll(){
        return gamaService.getAll();
    }

    @GetMapping("/{id}") //local host/api/Gama/id
    public Optional<Gama> getGama(@PathVariable int id){
        return gamaService.getGama(id);
    }


    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Gama save (@RequestBody Gama gama){
        return gamaService.save(gama);


    }
}
