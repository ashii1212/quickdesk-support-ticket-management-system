package com.quickdesk.service;

import com.quickdesk.dto.DashboardStatsResponse;
import com.quickdesk.dto.TicketRequest;
import com.quickdesk.dto.TicketResponse;
import com.quickdesk.model.Category;
import com.quickdesk.model.Priority;
import com.quickdesk.model.Status;

import java.util.List;

public interface TicketService {

    TicketResponse createTicket(TicketRequest request);

    List<TicketResponse> getTickets(String search, Status status, Priority priority, Category category);

    TicketResponse getTicketById(Long id);

    TicketResponse updateTicketStatus(Long id, Status newStatus);

    TicketResponse updateTicket(Long id, TicketRequest request);

    void deleteTicket(Long id);

    DashboardStatsResponse getDashboardStats();
}
