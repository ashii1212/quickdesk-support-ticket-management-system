package com.quickdesk.data;

import com.quickdesk.model.Category;
import com.quickdesk.model.Priority;
import com.quickdesk.model.Status;
import com.quickdesk.model.Ticket;
import com.quickdesk.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TicketRepository ticketRepository;

    public DataInitializer(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(String... args) {
        if (ticketRepository.count() == 0) {
            Ticket t1 = new Ticket();
            t1.setTicketCode("QD-1001");
            t1.setCustomerName("Sarah Jenkins");
            t1.setCustomerEmail("sarah.jenkins@acmecorp.com");
            t1.setTitle("Cannot export monthly revenue CSV");
            t1.setDescription("When clicking the 'Export CSV' button on the billing reports tab, the screen freezes and returns HTTP 504 gateway timeout after 30 seconds.");
            t1.setCategory(Category.TECHNICAL);
            t1.setPriority(Priority.HIGH);
            t1.setStatus(Status.OPEN);
            t1.setCreatedAt(LocalDateTime.now().minusHours(5));
            t1.setUpdatedAt(LocalDateTime.now().minusHours(5));
            ticketRepository.save(t1);

            Ticket t2 = new Ticket();
            t2.setTicketCode("QD-1002");
            t2.setCustomerName("Michael Chang");
            t2.setCustomerEmail("mchang@innovate.io");
            t2.setTitle("Duplicate charge on annual subscription");
            t2.setDescription("Customer was billed twice on October 1st for Invoice #INV-8821. Requesting refund for the duplicate transaction of $499.00.");
            t2.setCategory(Category.BILLING);
            t2.setPriority(Priority.HIGH);
            t2.setStatus(Status.IN_PROGRESS);
            t2.setCreatedAt(LocalDateTime.now().minusDays(1));
            t2.setUpdatedAt(LocalDateTime.now().minusHours(2));
            ticketRepository.save(t2);

            Ticket t3 = new Ticket();
            t3.setTicketCode("QD-1003");
            t3.setCustomerName("Elena Rostova");
            t3.setCustomerEmail("elena.rostova@globaltech.com");
            t3.setTitle("Reset 2FA device for team admin account");
            t3.setDescription("The primary admin lost their authentication hardware key during travel and cannot log into the admin dashboard. Identity verification documents provided.");
            t3.setCategory(Category.ACCOUNT);
            t3.setPriority(Priority.MEDIUM);
            t3.setStatus(Status.OPEN);
            t3.setCreatedAt(LocalDateTime.now().minusHours(2));
            t3.setUpdatedAt(LocalDateTime.now().minusHours(2));
            ticketRepository.save(t3);

            Ticket t4 = new Ticket();
            t4.setTicketCode("QD-1004");
            t4.setCustomerName("David Miller");
            t4.setCustomerEmail("dmiller@nexuscloud.net");
            t4.setTitle("Request for custom webhook signature header");
            t4.setDescription("Our security audit requires inbound webhooks to include HMAC-SHA256 signature headers. Inquiring if this is supported or on the roadmap.");
            t4.setCategory(Category.OTHER);
            t4.setPriority(Priority.LOW);
            t4.setStatus(Status.RESOLVED);
            t4.setCreatedAt(LocalDateTime.now().minusDays(3));
            t4.setUpdatedAt(LocalDateTime.now().minusDays(1));
            ticketRepository.save(t4);

            Ticket t5 = new Ticket();
            t5.setTicketCode("QD-1005");
            t5.setCustomerName("Priya Sharma");
            t5.setCustomerEmail("priya.sharma@finflow.org");
            t5.setTitle("API rate limit error during batch sync");
            t5.setDescription("Sync jobs running at midnight UTC fail with 429 Too Many Requests despite total requests being well below the agreed tier limits.");
            t5.setCategory(Category.TECHNICAL);
            t5.setPriority(Priority.MEDIUM);
            t5.setStatus(Status.IN_PROGRESS);
            t5.setCreatedAt(LocalDateTime.now().minusDays(2));
            t5.setUpdatedAt(LocalDateTime.now().minusHours(8));
            ticketRepository.save(t5);

            System.out.println(">>> Initialized QuickDesk sample tickets in database successfully!");
        }
    }
}
