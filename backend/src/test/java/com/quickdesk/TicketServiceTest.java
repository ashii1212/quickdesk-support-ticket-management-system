package com.quickdesk;

import com.quickdesk.dto.DashboardStatsResponse;
import com.quickdesk.dto.TicketRequest;
import com.quickdesk.dto.TicketResponse;
import com.quickdesk.model.Category;
import com.quickdesk.model.Priority;
import com.quickdesk.model.Status;
import com.quickdesk.model.Ticket;
import com.quickdesk.repository.TicketRepository;
import com.quickdesk.service.TicketServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketServiceImpl ticketService;

    private Ticket sampleTicket;

    @BeforeEach
    void setUp() {
        sampleTicket = new Ticket();
        sampleTicket.setId(1L);
        sampleTicket.setTicketCode("QD-1001");
        sampleTicket.setCustomerName("Alice Test");
        sampleTicket.setCustomerEmail("alice@test.com");
        sampleTicket.setTitle("Login issue");
        sampleTicket.setDescription("Unable to log into customer portal.");
        sampleTicket.setCategory(Category.TECHNICAL);
        sampleTicket.setPriority(Priority.HIGH);
        sampleTicket.setStatus(Status.OPEN);
    }

    @Test
    void testCreateTicket() {
        TicketRequest request = new TicketRequest(
                "Alice Test",
                "alice@test.com",
                "Login issue",
                "Unable to log into customer portal.",
                Category.TECHNICAL,
                Priority.HIGH
        );

        when(ticketRepository.save(any(Ticket.class))).thenReturn(sampleTicket);

        TicketResponse response = ticketService.createTicket(request);

        assertNotNull(response);
        assertEquals("QD-1001", response.getTicketCode());
        assertEquals("Alice Test", response.getCustomerName());
        assertEquals(Status.OPEN, response.getStatus());
        verify(ticketRepository, atLeastOnce()).save(any(Ticket.class));
    }

    @Test
    void testGetTicketById_Found() {
        when(ticketRepository.findById(1L)).thenReturn(Optional.of(sampleTicket));

        TicketResponse response = ticketService.getTicketById(1L);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Login issue", response.getTitle());
    }

    @Test
    void testUpdateTicketStatus() {
        when(ticketRepository.findById(1L)).thenReturn(Optional.of(sampleTicket));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(sampleTicket);

        TicketResponse response = ticketService.updateTicketStatus(1L, Status.IN_PROGRESS);

        assertNotNull(response);
        assertEquals(Status.IN_PROGRESS, sampleTicket.getStatus());
        verify(ticketRepository).save(sampleTicket);
    }

    @Test
    void testGetDashboardStats() {
        when(ticketRepository.count()).thenReturn(10L);
        when(ticketRepository.countByStatus(Status.OPEN)).thenReturn(4L);
        when(ticketRepository.countByStatus(Status.IN_PROGRESS)).thenReturn(3L);
        when(ticketRepository.countByStatus(Status.RESOLVED)).thenReturn(3L);

        DashboardStatsResponse stats = ticketService.getDashboardStats();

        assertEquals(10L, stats.getTotalTickets());
        assertEquals(4L, stats.getOpenTickets());
        assertEquals(3L, stats.getInProgressTickets());
        assertEquals(3L, stats.getResolvedTickets());
    }
}
