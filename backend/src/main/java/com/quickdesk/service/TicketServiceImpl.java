package com.quickdesk.service;

import com.quickdesk.dto.DashboardStatsResponse;
import com.quickdesk.dto.TicketRequest;
import com.quickdesk.dto.TicketResponse;
import com.quickdesk.exception.ResourceNotFoundException;
import com.quickdesk.model.Category;
import com.quickdesk.model.Priority;
import com.quickdesk.model.Status;
import com.quickdesk.model.Ticket;
import com.quickdesk.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    public TicketServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public TicketResponse createTicket(TicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setCustomerName(request.getCustomerName().trim());
        ticket.setCustomerEmail(request.getCustomerEmail().trim());
        ticket.setTitle(request.getTitle().trim());
        ticket.setDescription(request.getDescription().trim());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(Status.OPEN);

        Ticket saved = ticketRepository.save(ticket);

        // Assign formatted readable ticket code: QD-1000 + id
        if (saved.getTicketCode() == null || saved.getTicketCode().startsWith("QD-")) {
            saved.setTicketCode(String.format("QD-%04d", 1000 + saved.getId()));
            saved = ticketRepository.save(saved);
        }

        return TicketResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TicketResponse> getTickets(String search, Status status, Priority priority, Category category) {
        String cleanSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        List<Ticket> tickets = ticketRepository.searchAndFilter(cleanSearch, status, priority, category);
        return tickets.stream()
                .map(TicketResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TicketResponse getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        return TicketResponse.fromEntity(ticket);
    }

    @Override
    public TicketResponse updateTicketStatus(Long id, Status newStatus) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        ticket.setStatus(newStatus);
        Ticket updated = ticketRepository.save(ticket);
        return TicketResponse.fromEntity(updated);
    }

    @Override
    public TicketResponse updateTicket(Long id, TicketRequest request) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));

        ticket.setCustomerName(request.getCustomerName().trim());
        ticket.setCustomerEmail(request.getCustomerEmail().trim());
        ticket.setTitle(request.getTitle().trim());
        ticket.setDescription(request.getDescription().trim());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());

        Ticket updated = ticketRepository.save(ticket);
        return TicketResponse.fromEntity(updated);
    }

    @Override
    public void deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ticket not found with id: " + id);
        }
        ticketRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        long total = ticketRepository.count();
        long open = ticketRepository.countByStatus(Status.OPEN);
        long inProgress = ticketRepository.countByStatus(Status.IN_PROGRESS);
        long resolved = ticketRepository.countByStatus(Status.RESOLVED);

        return new DashboardStatsResponse(total, open, inProgress, resolved);
    }
}
