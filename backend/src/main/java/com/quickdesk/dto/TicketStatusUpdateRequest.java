package com.quickdesk.dto;

import com.quickdesk.model.Status;
import jakarta.validation.constraints.NotNull;

public class TicketStatusUpdateRequest {

    @NotNull(message = "Status is required (OPEN, IN_PROGRESS, or RESOLVED)")
    private Status status;

    public TicketStatusUpdateRequest() {
    }

    public TicketStatusUpdateRequest(Status status) {
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
