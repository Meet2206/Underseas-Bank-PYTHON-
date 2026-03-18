# 🏦 Underseas Bank — Full Stack Digital Banking System

<p align="center">
Modern Banking Platform built with FastAPI + React
</p>

<p align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Inter&size=22&duration=3000&color=3B82F6&center=true&vCenter=true&width=750&lines=Full+Stack+Digital+Banking+System;FastAPI+Backend+Architecture;React+Fintech+Dashboard;Loans+%2B+FD+%2B+Credit+Card+Modules;Financial+Analytics+Engine">

</p>

<p align="center">

<img src="https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge&logo=fastapi">
<img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react">
<img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql">
<img src="https://img.shields.io/badge/Redis-Caching-red?style=for-the-badge&logo=redis">
<img src="https://img.shields.io/badge/Celery-Async%20Tasks-green?style=for-the-badge">
<img src="https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker">

</p>

# 📌 Overview

**Underseas Bank** is a **full-stack digital banking simulation platform** designed to demonstrate real-world fintech backend architecture and modern dashboard UI.

The system allows users to:

• Register and authenticate securely
• Manage multiple bank accounts
• Perform deposits, withdrawals, and transfers
• Track transaction history like a passbook
• Apply for loans and calculate EMI
• Create fixed deposits
• Use simulated credit cards
• Analyze spending through financial analytics

The project demonstrates **backend engineering, database design, API architecture, and frontend dashboard development**.

# ✨ Core Features

## 🔐 Authentication

• Secure user registration
• Login using **phone number + MPIN**
• JWT-based authentication
• Protected API endpoints
• Account locking after multiple failed login attempts

## 👤 User Management

• Create new users
• Authenticate using MPIN
• Secure MPIN hashing
• Middleware-based authentication system

## 🏦 Account Management

• Create bank accounts
• Unique account number generation
• Multiple accounts per user
• Real-time balance tracking

## 💸 Transactions

Users can perform:

• Deposit money
• Withdraw money
• Transfer money between accounts

Each operation generates a **transaction record** including:

• sender account
• receiver account
• amount
• timestamp

Transaction history works like a **bank passbook**.

## 🏦 Loan System

Users can apply for loans with automatic **EMI calculation**.

Loan module includes:

• loan amount
• interest rate
• tenure
• EMI calculation
• remaining balance tracking

## 📈 Fixed Deposit System

Investment simulation including:

• deposit amount
• interest rate
• tenure period
• maturity value calculation

## 💳 Credit Card System

Credit card module includes:

• card number generation
• credit limit tracking
• used credit monitoring
• remaining credit calculation

## 📊 Financial Analytics

Dashboard analytics include:

• expense breakdown charts
• financial health indicators
• spending analytics
• AI-generated financial tips

# 🧠 System Architecture

```
                React Frontend
                      │
                      │ REST API
                      ▼
                FastAPI Backend
                      │
                Service Layer
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    PostgreSQL       Redis        Celery
     Database        Cache     Background Jobs
        │
        ▼
   Banking Data Models
```

# 🗄 Database Architecture

```
+------------------+
|      USERS       |
+------------------+
| id (PK)          |
| name             |
| email            |
| phone_number     |
| mpin_hash        |
| failed_attempts  |
| is_locked        |
| created_at       |
+------------------+
        │
        │
        ▼
+------------------+
|     ACCOUNTS     |
+------------------+
| id (PK)          |
| account_number   |
| account_type     |
| balance          |
| user_id (FK)     |
+------------------+
        │
        │
        ▼
+----------------------+
|    TRANSACTIONS      |
+----------------------+
| id (PK)              |
| from_account_id      |
| to_account_id        |
| amount               |
| transaction_type     |
| created_at           |
+----------------------+
```

# 🔄 Transaction Flow

```
User initiates transfer
        │
        ▼
React Dashboard
        │
        ▼
POST /transactions/transfer
        │
        ▼
FastAPI Router
        │
        ▼
JWT Authentication Middleware
        │
        ▼
Transaction Service
        │
        ├── Validate accounts
        ├── Check balance
        └── Update balances
        │
        ▼
Create Transaction Record
        │
        ▼
Save to PostgreSQL
        │
        ▼
Response returned to frontend
```

# 🛠 Technology Stack

## Backend

• Python
• FastAPI
• PostgreSQL
• SQLAlchemy ORM
• Pydantic Validation
• JWT Authentication

Infrastructure:

• Redis
• Celery
• Docker
• Nginx

## Frontend

• React
• Vite
• Recharts (analytics charts)
• Modern dashboard UI

# 📂 Project Structure

```
Underseas-Bank
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── schemas
│   │   ├── routes
│   │   ├── services
│   │   ├── middleware
│   │   ├── utils
│   │   └── analytics
│   │
│   ├── tasks
│   ├── docker
│   └── nginx
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── services
    │   ├── layout
    │   └── charts
```

# 🔗 API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Accounts

```
POST /accounts/create
GET  /accounts
```

## Transactions

```
POST /transactions/deposit
POST /transactions/withdraw
POST /transactions/transfer
GET  /transactions/history/{account_id}
```

## Loans

```
POST /loans/apply
GET  /loans
```

## Fixed Deposits

```
POST /fd/create
GET  /fd
```
## Credit Cards

```
POST /credit-card/apply
GET  /credit-card
```

## Analytics

```
GET /analytics
```

# 💰 EMI Calculation Formula

Loan EMI is calculated using:

```
EMI = P × r × (1+r)^n / ((1+r)^n − 1)
```

Where:

```
P = loan amount
r = monthly interest rate
n = tenure in months
```


# 🚀 Running the Project

## Clone Repository

```
git clone https://github.com/Meet2206/Underseas-Bank-PYTHON-.git
cd Underseas-Bank-PYTHON-
```

# Backend Setup

Create virtual environment

```
python -m venv venv
```

Activate environment

Mac / Linux

```
source venv/bin/activate
```

Windows

```
venv\Scripts\activate
```

Install dependencies

```
pip install -r requirements.txt
```

Run backend server

```
uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

API Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to frontend directory

```
cd frontend
```

Install dependencies

```
npm install
```

Run frontend

```
npm run dev
```

Frontend runs at

```
http://localhost:5173
```
# 🔒 Security Features

• JWT authentication
• hashed MPIN storage
• login attempt limits
• account locking mechanism
• input validation using Pydantic

# 📈 Future Improvements

Potential enhancements:

• real-time transaction updates using WebSockets
• fraud detection system
• mobile banking UI
• multi-factor authentication
• payment gateway integration

# 👨‍💻 Author

Meet Limbachiya
B.Tech CSE — Artificial Intelligence & Data Science

# ⭐ Support

If you found this project helpful, please consider giving the repository a **star ⭐ on GitHub**.
