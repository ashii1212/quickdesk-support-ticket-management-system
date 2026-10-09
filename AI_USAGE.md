# AI Usage Report — QuickDesk

This document outlines the usage of AI tools during the development of the **QuickDesk — Support Ticket Management System**, including what AI helped implement, architectural decisions made, what was changed or rejected, and the verification process.

---

## 1. AI Tools Used
- **Google Antigravity / Gemini Model**: Used for project scaffolding, Spring Boot backend boilerplate generation, React UI component structure, styling patterns, and unit/integration test composition.

---

## 2. What AI Helped Implement
1. **Spring Boot REST Architecture**:
   - Entity model (`Ticket`), Enums (`Priority`, `Status`, `Category`).
   - DTOs with validation rules (`TicketRequest`, `TicketResponse`, `TicketStatusUpdateRequest`, `DashboardStatsResponse`).
   - Spring Data JPA custom multi-criteria JPQL query for combined search (by customer name and issue title) and filters (by status, priority, and category).
   - Global exception handling (`@RestControllerAdvice`) returning structured JSON error payloads with field-level validation messages.
   - Initial seed dataset (`DataInitializer`) populating realistic support complaints across various priorities and categories.

2. **React Frontend Components**:
   - Modern, responsive user interface without external bloated CSS frameworks.
   - Interactive KPI cards for Dashboard Summary (`Total`, `Open`, `In Progress`, `Resolved`) that act as one-click filters.
   - Real-time search with debounce and multi-filter dropdowns working together.
   - Modals for ticket creation (with field-by-field validation and regex email check) and full detail inspection.
   - Toast notification system for instant feedback on user actions.

3. **Automation & Developer Ergonomics**:
   - Provided one-click Windows launch scripts (`run-backend.bat`, `run-frontend.bat`) to simplify local evaluation.

---

## 3. What Was Changed, Refined, or Rejected
1. **Rejected Generic Spring Data Query Methods**:
   - Initially considered separate Spring Data finder methods for each combination of query parameters.
   - **Change**: Replaced with a unified JPQL query (`ticketRepository.searchAndFilter(...)`) handling optional parameters (`:search IS NULL OR ...`) to ensure search and multiple filters work together correctly in a single database roundtrip.

2. **CORS Configuration Adjustment**:
   - Initial configuration attempted using wildcard `allowedOrigins("*")` alongside `allowCredentials(true)`, which is rejected by Spring Web security standards.
   - **Refinement**: Switched to `allowedOriginPatterns("*")` and explicitly registered `http://localhost:5173` and `http://localhost:3000` to allow secure cross-origin requests from the React dev server.

3. **Database Portability & Credentials**:
   - Added environment variable fallback patterns `${DB_PASSWORD:ABDULashiq@1212}` in `application.properties` so the application runs seamlessly out-of-the-box locally while allowing external evaluators to override credentials with `DB_PASSWORD` or `DB_USERNAME`.

4. **Eliminated Junk & Heavy Boilerplate**:
   - Stripped away unnecessary demo files from initial Vite templates (such as `counter.ts`, vanilla TS configs) to keep the repository clean and maintainable.
   - Avoided heavy UI frameworks like full Material UI or Bootstrap to ensure lightning-fast Vite build times (under 450ms) and clean, maintainable CSS.

---

## 4. How the Code Was Verified

1. **Backend Compilation & Testing**:
   - Verified clean compilation with `mvn clean test-compile`.
   - Executed automated unit tests (`TicketServiceTest`) verifying ticket creation, ID assignment, status mutation, and dashboard metric calculations (`mvn test`). Result: 4/4 passing tests.

2. **Database Schema & Persistence**:
   - Validated against a live local MySQL 8.0 instance running on port 3306.
   - Confirmed automatic table creation (`tickets`) and data initialization via `DataInitializer`.

3. **End-to-End API Integration**:
   - Performed real HTTP API calls testing:
     - `POST /api/tickets` (Created `QD-1006`).
     - `PATCH /api/tickets/{id}/status` (Changed status to `IN_PROGRESS`).
     - `GET /api/tickets/dashboard/stats` (Confirmed live counter incrementation).
     - `DELETE /api/tickets/{id}` (Confirmed proper removal and metrics recount).

4. **Frontend Production Build**:
   - Executed `npm run build` in `frontend/`, verifying zero compilation or lint errors.
   - Verified HTTP 200 response on `http://localhost:5173`.
