package com.example.retoatenea3de2023.Repository;


import com.example.retoatenea3de2023.Model.Gama;
import com.example.retoatenea3de2023.Repository.CRUD.GamaCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class GamaRepository {
    @Autowired
    private GamaCrudRepository gamaCrudRepository;

    public List<Gama> findAll(){
        return (List<Gama>) gamaCrudRepository.findAll();
    }

    public Optional<Gama> getGama(int id){
        return gamaCrudRepository.findById(id);
    }

    public Gama save (Gama gama){
        return gamaCrudRepository.save(gama);
    }

    public void delete (Gama gama){
        gamaCrudRepository.delete(gama);
    }
}
