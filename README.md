# QuickDesk — Support Ticket Management System

**QuickDesk** is a full-stack customer support ticket management web application built with **React**, **Spring Boot 3**, and **MySQL 8**. It helps support teams replace messy spreadsheets with an intuitive, searchable, and responsive ticket tracking platform.

---

## 🚀 Key Features

### 1. Ticket Creation & Validation
- Capture Customer Name, Customer Email, Issue Title, Issue Description, Category, and Priority.
- **Categories**: `Technical`, `Billing`, `Account`, `Other`.
- **Priorities**: `Low`, `Medium`, `High`.
- **Input Validation**: Strict validation for required fields, character limits, and RFC-compliant email address checking both client-side and server-side (`jakarta.validation`).

### 2. View & Manage Tickets
- Displays unique human-readable Ticket IDs (e.g., `QD-1001`), customer contact details, issue titles, categories, priorities, statuses, and creation timestamps.
- **Status Lifecycle**: Transition tickets between `Open`, `In Progress`, and `Resolved`.
- **One-Click Updates**: Change status directly from the table or from the detailed ticket view modal.
- Includes automatic creation and last-updated timestamps.

### 3. Combined Search & Multi-Criteria Filtering
- **Live Search**: Query by issue title or customer name with debounced responsiveness.
- **Multi-Filter**: Filter tickets simultaneously by **Status**, **Priority**, and **Category**.
- Seamless combination of free-text search with dropdown filters.
- One-click filter reset to quickly return to the default view.

### 4. Interactive Dashboard Summary
- Displays real-time summary cards:
  - **Total Tickets**
  - **Open Tickets**
  - **In Progress Tickets**
  - **Resolved Tickets**
- Metrics automatically refresh whenever tickets are created, updated, or removed.
- Interactive cards allow clicking a summary card to immediately filter the ticket table to that status.

### 5. Support Agent & Admin Authentication
- **Secure Authentication**: BCrypt password hashing and session tokens.
- **Role Support**: `ADMIN` and `SUPPORT_AGENT` roles.
- **One-Click Demo Accounts**: Pre-configured in database for instant evaluation:
  - **Admin**: `admin@quickdesk.com` / `admin123`
  - **Support Agent**: `agent@quickdesk.com` / `agent123`
- **Protected Actions**: Modifying ticket statuses, deleting tickets, and creating tickets are guarded with interactive authentication prompt.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 19 + Vite | Fast, responsive Single Page Application (SPA) |
| **Icons & UI** | Lucide Icons + Modern CSS | Accessible color-coded badges, modals, and toast alerts |
| **Backend** | Spring Boot 3.2.5 (Java 17) | RESTful API architecture with Spring Data JPA |
| **Validation** | Jakarta Bean Validation | Robust `@Valid` request constraint enforcement |
| **Database** | MySQL 8.0 | Persistent relational storage (`quickdesk_db`) |
| **ORM / Migration**| Hibernate / JPA | Auto DDL management with seed data initialization |

---

## 📋 Prerequisites

Before running the application, make sure the following are installed on your machine:
- **Java Development Kit (JDK)**: 17 or higher (`java -version`)
- **Apache Maven**: 3.8+ (`mvn -v`)
- **Node.js & npm**: Node 18+ and npm 9+ (`node -v`, `npm -v`)
- **MySQL Server**: 8.0+ running on port 3306

---

## ⚙️ Quick Start Setup & Run

### Step 1: Database Setup
1. Ensure your MySQL service is running.
2. The backend will automatically create the database `quickdesk_db` if it does not already exist.
3. Configure your MySQL credentials in `backend/src/main/resources/application.properties` (or set environment variables `DB_USERNAME` and `DB_PASSWORD`):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/quickdesk_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

---

### Step 2: Run the Backend (Spring Boot)

#### Option A: Using Windows Batch Script (Fastest)
Double-click `run-backend.bat` in the root folder, or execute:
```cmd
run-backend.bat
```

#### Option B: Using Terminal
```bash
cd backend
mvn spring-boot:run
```

The Spring Boot backend will start on: **`http://localhost:8080`**  
*(On first run, sample support tickets are automatically seeded into MySQL).*

---

### Step 3: Run the Frontend (React + Vite)

#### Option A: Using Windows Batch Script (Fastest)
Double-click `run-frontend.bat` in the root folder, or execute:
```cmd
run-frontend.bat
```

#### Option B: Using Terminal
```bash
cd frontend
npm install
npm run dev
```

The React frontend will open at: **`http://localhost:5173`**

---

## 📡 REST API Documentation

Base URL: `http://localhost:8080/api/tickets`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate agent/admin with email and password |
| `POST` | `/api/auth/register` | Register a new support staff member |
| `GET` | `/api/auth/user/{id}` | Fetch agent/admin profile by user ID |
| `GET` | `/api/tickets` | Retrieve tickets. Supports query params: `search`, `status`, `priority`, `category` |
| `POST` | `/api/tickets` | Create a new ticket with validated payload |
| `GET` | `/api/tickets/{id}` | Retrieve single ticket details by ID |
| `PATCH` | `/api/tickets/{id}/status` | Update ticket status (`OPEN`, `IN_PROGRESS`, `RESOLVED`) |
| `PUT` | `/api/tickets/{id}` | Update ticket details |
| `DELETE`| `/api/tickets/{id}` | Delete ticket by ID |
| `GET` | `/api/tickets/dashboard/stats` | Retrieve aggregated dashboard counts |

### Sample Create Ticket Payload (`POST /api/tickets`):
```json
{
  "customerName": "Elena Rostova",
  "customerEmail": "elena.rostova@globaltech.com",
  "title": "Reset 2FA device for team admin account",
  "description": "Primary admin lost hardware authentication key during travel.",
  "category": "ACCOUNT",
  "priority": "MEDIUM"
}
```

### Sample Status Update Payload (`PATCH /api/tickets/{id}/status`):
```json
{
  "status": "RESOLVED"
}
```

### Sample Dashboard Stats Response (`GET /api/tickets/dashboard/stats`):
```json
{
  "totalTickets": 5,
  "openTickets": 2,
  "inProgressTickets": 2,
  "resolvedTickets": 1
}
```

---

## 🧪 Running Automated Tests

To run the backend unit and integration tests:
```bash
cd backend
mvn test
```

To run the frontend production build verification:
```bash
cd frontend
npm run build
```

---

## 💡 Assumptions & Known Limitations

1. **Authentication**: Per assignment specifications, authentication/authorization is omitted to prioritize ticket operations and responsive workflow.
2. **Database Engine**: Uses MySQL 8 InnoDB engine. Supports fallback to H2 in-memory profile if configured.
3. **Single Organization**: Tickets belong to a unified organization queue without multi-tenant partitioning.
4. **Attachments**: Tickets store rich text descriptions; binary attachments (images/PDFs) can be incorporated in future iterations using S3/cloud storage.
