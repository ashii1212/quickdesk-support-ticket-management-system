package com.quickdesk.repository;

import com.quickdesk.model.Category;
import com.quickdesk.model.Priority;
import com.quickdesk.model.Status;
import com.quickdesk.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByTicketCode(String ticketCode);

    @Query("SELECT t FROM Ticket t WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           " LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(t.customerName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(t.ticketCode) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR t.status = :status) AND " +
           "(:priority IS NULL OR t.priority = :priority) AND " +
           "(:category IS NULL OR t.category = :category) " +
           "ORDER BY t.createdAt DESC")
    List<Ticket> searchAndFilter(
            @Param("search") String search,
            @Param("status") Status status,
            @Param("priority") Priority priority,
            @Param("category") Category category
    );

    long countByStatus(Status status);
}
