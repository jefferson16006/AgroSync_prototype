# AgroSync Backend

AgroSync is a digital marketplace designed to connect farmers directly with buyers, eliminating middlemen and improving transparency, pricing, and trust in agricultural trade. This backend powers authentication, listings, crop verification via AI, and transaction flows.

---

## Overview

AgroSync enables:

* Farmers to list crops and livestock for sale
* Buyers to browse and connect directly with farmers
* AI-assisted crop verification to improve trust
* A structured backend API for seamless frontend integration

This backend is built for scalability, modularity, and rapid iteration, making it suitable for both hackathon environments and real-world extension.

---

## Core Features

### 1. Authentication & Authorization

* User registration and login (JWT-based authentication)
* Role-based access control (Farmer / Buyer)
* Protected routes using guards

---

### 2. Marketplace Listings

Farmers can:

* Create listings for crops or livestock
* Update or delete their listings

Buyers and users can:

* View all listings
* View individual listings

Each listing contains:

* Title
* Description
* Price
* Quantity
* Location
* Category

---

### 3. AI Crop Verification

Farmers can upload images of crops for analysis.

The system is designed to:

* Accept image uploads
* Send images to an AI model
* Receive structured analysis
* Store results in the database

Each crop scan contains:

* Health status (GOOD / DISEASED / BAD)
* Spoilage risk (LOW / MEDIUM / HIGH)
* Confidence score (How sure the model is about its own answer)
* Recommendation

---

### 4. Verified Listings

Listings can optionally be linked to a crop scan.

* Listings with a scan are marked as **verified**
* Buyers can see crop health insights before purchasing

This improves trust and transparency in the marketplace.

---

### 5. Payment Flow (Minimal Integration)

The backend includes a lightweight payment structure:

* Initialize payment
* Redirect user to payment provider

This is designed for demonstration and can be extended into a full payment system.

---

## System Architecture

The system follows a modular structure:

* **Auth Module** → Handles authentication and JWT
* **Users Module** → Manages user data
* **Listings Module** → Core marketplace logic
* **AI Module** → Crop scan and analysis pipeline
* **Payments Module** → Transaction handling (Interswitch)

Data relationships:

* A **User** can be a Farmer or Buyer
* A **Farmer** owns many Listings
* A **CropScan** belongs to a Farmer
* A **Listing** can optionally reference a CropScan

---

## API Design

All endpoints follow REST principles.

### Authentication

```
POST /auth/signup
POST /auth/login
```

---

### Listings

```
POST   /listings
GET    /listings
GET    /listings/:id
PATCH  /listings/:id
DELETE /listings/:id
```

#### Create Listing Example

```
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Fresh Tomatoes",
  "description": "Organic farm produce",
  "price": "5000",
  "quantity": 10,
  "location": "Ibadan",
  "category": "Crops",
  "scanId": "optional-scan-id"
}
```

---

### AI Crop Scan

```
POST /ai/scan
GET  /ai/scans
```

#### Upload Example

```
POST /ai/scan
Authorization: Bearer <token>

file: <image>
```

---

### Payments

```
POST /payments/initialize
```

---

## Development Setup

### Install Dependencies

```
pnpm install
```

### Setup Environment Variables

Create a `.env` file:

```
DATABASE_URL=your_db_url
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
INTERSWITCH_MERCHANT_CODE=merchant_code
INTERSWITCH_PAY_ITEM_ID=your_interswitch_pay_item
INTERSWITCH_REDIRECT_URL=your_interswitch_redirect_url
INTERSWITCH_BASE_URL=your_interswitch_base_url
INTERSWITCH_QUERY_URL=your_interswitch_query_url
```

### Run Database

```
npx(or pnpm) prisma migrate dev
npx(or pnpm) prisma generate
```

### Start Server

```
pnpm start:dev
```

---

## File Uploads

* Images are stored locally in `/uploads`
* File paths are saved in the database
* Used for AI processing and future retrieval

---

## Current Limitations

* Payment flow is minimal (demo-level)
* No real-time chat implemented

---

## Project Goal

AgroSync aims to:

* Empower farmers with direct market access
* Improve buyer confidence using AI verification
* Reduce inefficiencies in agricultural trade

---

## Deployment (Render)

* Connect GitHub repository
* Set environment variables
* Use:

  * Build: `pnpm install && pnpm prisma generate`
  * Start: `pnpm start:prod`

---

## Final Note

This project is built with a focus on clean architecture, extensibility, and real-world applicability. While some features are still in progress, the core system demonstrates a complete and scalable backend for an agricultural marketplace.
