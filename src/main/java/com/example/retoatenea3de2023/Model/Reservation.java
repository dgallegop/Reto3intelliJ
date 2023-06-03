package com.example.retoatenea3de2023.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer idReservation;

    private String startDate;
    private String devolutionDate;
    private String status ="created";

    //car
    @ManyToOne
    @JoinColumn (name = "carId")
    @JsonIgnoreProperties({"reservations"})
    private Car car;
    //clientes
    @ManyToOne
    @JoinColumn (name = "clientId")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client ;
    //scores

    @OneToOne
    @JsonIgnoreProperties({"reservation"})
    private Score score;

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(String devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Score getScore() {
        return score;
    }

    public void setScore(Score score) {
        this.score = score;
    }
}
