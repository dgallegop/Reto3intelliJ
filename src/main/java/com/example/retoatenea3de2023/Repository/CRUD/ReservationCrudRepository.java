package com.example.retoatenea3de2023.Repository.CRUD;


import com.example.retoatenea3de2023.Model.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

<<<<<<< HEAD
import javax.management.ObjectName;
=======
>>>>>>> 64779f416f2450cbd7588db39065427b6f4e8e59
import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {

    public List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date fechaA, Date fechaB);

<<<<<<< HEAD
    public List<Reservation> findAllByStatus(String status);

    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT(c.client) DESC")
    public List<Object[]> getTotalReservationsByClient();

=======
    public List<Reservation>  findAllByStatus(String status);


    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT(c.client) DESC")
    public List<Object[]> getTotalReservationsByClient();
>>>>>>> 64779f416f2450cbd7588db39065427b6f4e8e59
}
