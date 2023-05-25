package com.example.retoatenea3de2023.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

@Entity
@Table(name="message")
public class Message {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    //carros

    @ManyToOne
    @JoinColumn (name = "carId")
    @JsonIgnoreProperties({"messages" , "reservations"})
    private Car car;

    //(cascade = {cascadeType.PERSIST}, mappedBy = "car")
    //cliente

    @ManyToOne
    @JoinColumn (name ="clientId")
    @JsonIgnoreProperties ({"messages" , "reservations"})
    private Client client;

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
