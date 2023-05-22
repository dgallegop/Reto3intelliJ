package com.example.retoatenea3de2023.Repository;


import com.example.retoatenea3de2023.Model.Car;
import com.example.retoatenea3de2023.Repository.CRUD.CarCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CarRepository {

    @Autowired
    private CarCrudRepository carCrudRepository;

    public List<Car> findAll(){
        return (List<Car>) carCrudRepository.findAll();
    }

    public Optional<Car> getCar(int id){
        return carCrudRepository.findById(id);
    }

    public Car save (Car car){
        return carCrudRepository.save(car);
    }

    public void delete (Car car){
        carCrudRepository.delete(car);
    }

}
