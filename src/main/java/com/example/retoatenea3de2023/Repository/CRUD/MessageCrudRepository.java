package com.example.retoatenea3de2023.Repository.CRUD;


import com.example.retoatenea3de2023.Model.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
