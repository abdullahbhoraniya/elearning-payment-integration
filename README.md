# E-Learning Payment Integration

A modern full-stack e-learning platform with secure Razorpay payment integration built using React, Node.js, Express, and Tailwind CSS.

This project demonstrates a real-world payment workflow including order creation, Razorpay checkout integration, HMAC-based payment verification, and secure backend validation architecture.

---

# Features

* Modern responsive UI using Tailwind CSS
* Razorpay payment gateway integration
* Secure order creation from backend
* HMAC SHA256 payment verification
* Payment success workflow
* Confetti success animation
* Modular backend architecture
* Real-world payment processing flow
* REST API integration using Axios

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Canvas Confetti

## Backend

* Node.js
* Express.js
* Razorpay SDK
* Crypto (HMAC Verification)

---

# Project Architecture

```text
User
 ↓
React Frontend
 ↓
Node.js Backend API
 ↓
Razorpay Server
 ↓
Payment Checkout
 ↓
Payment Verification
 ↓
HMAC Signature Validation
 ↓
Frontend Success State
```

---

# Payment Workflow

## Step 1 — Create Order

Frontend sends request to backend:

```http
POST /api/v1/payments/create-payment
```

Backend creates Razorpay order securely.

---

## Step 2 — Open Razorpay Checkout

Frontend receives:

* orderId
* amount
* currency

Then opens Razorpay payment modal.

---

## Step 3 — Payment Success

Razorpay returns:

* razorpay_order_id
* razorpay_payment_id
* razorpay_signature

---

## Step 4 — Payment Verification

Frontend sends payment details to backend:

```http
POST /api/v1/payments/verify-payment
```

Backend generates HMAC SHA256 signature using:

```text
orderId | paymentId
```

and compares it with Razorpay signature.

---

# HMAC Verification Flow

```text
Backend Secret Key
        ↓
Generate HMAC Signature
        ↓
Compare With Razorpay Signature
        ↓
Verify Authentic Payment
```

---

# Folder Structure

```text
frontend/
│
├── src/
├── public/
├── .env
└── package.json


backend/
│
├── controllers/
├── services/
├── routes/
├── config/
├── app.js
├── server.js
└── .env
```

---

# Environment Variables

## Frontend

```env
VITE_RAZORPAY_KEY_ID=your_key_id
```

---

## Backend

```env
RAZORPAY_KEY_ID=your_key_id

RAZORPAY_KEY_SECRET=your_secret_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/abdullahbhoraniya/elearning-payment-integration.git
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

# Razorpay Test Card

```text
Card Number: 4111 1111 1111 1111

Expiry: Any future date

CVV: Any 3 digits

OTP: 1234
```

---

# Future Improvements

* JWT Authentication
* Purchased Courses Persistence
* User Dashboard
* Payment History
* Razorpay Webhooks
* Subscription Plans
* AI Course Recommendations

---

# Learning Outcomes

This project helped in understanding:

* Payment Gateway Architecture
* HMAC Signature Verification
* Backend Security Principles
* Frontend + Backend Communication
* Razorpay Integration Workflow
* API Layered Architecture
* Real-world Transaction Flow

---

# Author

Abdullah Bhoraniya

GitHub:
[abdullahbhoraniya](https://github.com/abdullahbhoraniya?utm_source=chatgpt.com)
