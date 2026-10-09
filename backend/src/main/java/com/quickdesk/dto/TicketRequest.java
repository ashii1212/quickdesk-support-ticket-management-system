package com.quickdesk.dto;

import com.quickdesk.model.Category;
import com.quickdesk.model.Priority;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TicketRequest {

    @NotBlank(message = "Customer name is required")
    @Size(max = 100, message = "Customer name must not exceed 100 characters")
    private String customerName;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Please provide a valid email address (e.g., user@example.com)")
    @Size(max = 120, message = "Customer email must not exceed 120 characters")
    private String customerEmail;

    @NotBlank(message = "Issue title is required")
    @Size(max = 200, message = "Issue title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Issue description is required")
    @Size(max = 4000, message = "Issue description must not exceed 4000 characters")
    private String description;

    @NotNull(message = "Category is required (TECHNICAL, BILLING, ACCOUNT, or OTHER)")
    private Category category;

    @NotNull(message = "Priority is required (LOW, MEDIUM, or HIGH)")
    private Priority priority;

    public TicketRequest() {
    }

    public TicketRequest(String customerName, String customerEmail, String title,
                         String description, Category category, Priority priority) {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
