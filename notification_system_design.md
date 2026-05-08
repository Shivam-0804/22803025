# Notification System Design Document

## Project Overview

This project is a full-stack Notification Management System built for the Afford Medical Technologies evaluation assignment.

The system includes:

- reusable logging middleware
- backend notification API
- user authentication
- frontend notification dashboard
- priority inbox ranking
- scalable architecture redesign
- database optimization strategies

---

# Stage 1 — Logging Middleware Design

## Objective

Build a reusable logging package that standardizes application logs and forwards them to a centralized protected logging API.

## Logging Function

```javascript
Log(stack, level, packageName, message, token)
```

## Parameters

| Parameter | Description |
|---------|-------------|
| stack | frontend / backend |
| level | debug / info / warn / error / fatal |
| packageName | module identifier |
| message | log description |
| token | authorization token |

## Allowed Values

### Stack

```text
frontend
backend
```

### Log Levels

```text
debug
info
warn
error
fatal
```

### Packages

```text
cache
controller
cron_job
db
domain
handler
repository
route
service
auth
config
middleware
utils
```

## Logging Flow

```text
Frontend / Backend
        ↓
Reusable Log()
        ↓
Protected Logging API
        ↓
Centralized log storage
```

## Purpose

Benefits:

- consistent logging format
- centralized debugging
- production observability
- backend/frontend event tracing

---

# Stage 2 — Backend Architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

## Backend Architecture

```text
Client
  ↓
Express Server
  ↓
Auth Middleware
  ↓
Controllers
  ↓
Services / Business Logic
  ↓
MongoDB
```

---

## Modules

### Authentication

Responsibilities:

- register user
- login user
- generate JWT
- protect routes

---

### Notification Module

Responsibilities:

- create notifications
- fetch notifications
- mark read
- delete notifications
- filter notifications
- sort notifications

---

### Logging Module

Responsibilities:

- proxy frontend logs
- backend operational logging
- external protected API forwarding

---

# Stage 3 — API Design

## Authentication APIs

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Shivam",
  "email": "shivam@example.com",
  "password": "Password@123"
}
```

Response:

```json
{
  "_id": "abc123",
  "name": "Shivam",
  "email": "shivam@example.com",
  "token": "jwt_token"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "shivam@example.com",
  "password": "Password@123"
}
```

Response:

```json
{
  "_id": "abc123",
  "name": "Shivam",
  "email": "shivam@example.com",
  "token": "jwt_token"
}
```

---

## Notification APIs

### Create Notification

```http
POST /api/notifications
```

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Request:

```json
{
  "title": "Welcome",
  "message": "Account created successfully",
  "type": "updates"
}
```

---

### Get Notifications

```http
GET /api/notifications
```

---

### Mark Read

```http
PATCH /api/notifications/:id/read
```

---

### Delete Notification

```http
DELETE /api/notifications/:id
```

---

## Logging API

### Proxy Frontend Logs

```http
POST /api/log
```

Request:

```json
{
  "stack": "frontend",
  "level": "info",
  "packageName": "utils",
  "message": "Dashboard loaded"
}
```

---

# Stage 4 — Database Design

## User Schema

```javascript
{
  name: String,
  email: String,
  password: String
}
```

---

## Notification Schema

```javascript
{
  title: String,
  message: String,
  type: String,
  read: Boolean,
  priorityScore: Number,
  userId: ObjectId,
  createdAt: Date
}
```

---

## Relationships

```text
User
  └── has many Notifications
```

---

# Stage 5 — Database Optimization

## Indexing Strategy

Indexes improve read performance.

Recommended:

```javascript
userId
createdAt
type
read
```

Compound index:

```javascript
{ userId: 1, createdAt: -1 }
```

Benefits:

- faster notification retrieval
- optimized filtering
- efficient sorting

---

# Stage 6 — SQL Optimization Discussion

## Problem

Slow notification retrieval due to full table scans.

Example inefficient query:

```sql
SELECT * FROM notifications
WHERE user_id = ?
ORDER BY created_at DESC;
```

Issues:

- no index
- scans entire dataset

---

## Optimized Query

With index:

```sql
CREATE INDEX idx_notifications_user_created
ON notifications(user_id, created_at DESC);
```

Optimized execution:

```sql
SELECT * FROM notifications
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT 20;
```

Benefits:

- reduced IO
- lower latency
- scalable reads

---

# Stage 7 — Scalability Challenges

## Bottlenecks

### 1. Single Backend Server

Problem:

- overload under traffic spikes

Solution:

```text
Horizontal scaling + load balancer
```

---

### 2. Direct Notification Processing

Problem:

blocking request lifecycle

Solution:

queue-based async processing

---

### 3. Repeated DB Queries

Problem:

database bottleneck

Solution:

Redis caching

---

### 4. Logging Overhead

Problem:

high external logging latency

Solution:

buffered async logging queue

---

# Scalable Redesign

## Improved Architecture

```text
Frontend
   ↓
Load Balancer
   ↓
Multiple Backend Instances
   ↓
Message Queue
   ↓
Notification Workers
   ↓
Database
   ↓
Redis Cache
```

---

## Components

### Load Balancer

Responsibilities:

- distribute traffic
- failover handling

---

### Queue

Recommended:

- RabbitMQ
- Kafka
- BullMQ

Responsibilities:

- async notification delivery
- retry failed jobs

---

### Worker Nodes

Responsibilities:

- send notifications
- process retries
- background tasks

---

### Redis

Responsibilities:

- cache recent notifications
- reduce DB load

---

# Priority Inbox Design

## Goal

Rank important notifications first.

---

## Priority Rules

### Base Scores

| Type | Score |
|------|------|
| updates | 50 |
| social | 30 |
| promotion | 10 |

---

### Unread Boost

Unread notifications:

```text
+20
```

---

### Recency Boost

Less than 1 hour:

```text
+25
```

Less than 6 hours:

```text
+15
```

Less than 24 hours:

```text
+8
```

---

## Formula

```text
priority =
basePriority
+ unreadBoost
+ recencyBoost
```

---

## Example

Notification:

```text
Type: updates
Unread: yes
Age: 30 minutes
```

Score:

```text
50 + 20 + 25 = 95
```

---

# Priority Algorithm Complexity

Implementation:

```text
Sort-based:
O(n log n)
```

Optimized heap-based:

```text
O(n log k)
```

Where:

```text
k = top notifications requested
```

---

# Frontend Architecture

## Tech Stack

- React
- Material UI
- Axios
- React Router

---

## Structure

```text
App
 ├── Login
 ├── Dashboard
 ├── AllNotifications
 ├── PriorityInbox
```

---

## Components

### Navbar

Responsibilities:

- navigation
- logout

---

### NotificationCard

Responsibilities:

- render notification
- mark read
- delete

---

### FilterBar

Responsibilities:

- type filtering
- sorting

---

# Frontend Logging

## Events Logged

Tracked:

- button clicks
- page loads
- form submissions
- login/logout
- notification actions
- API calls

---

## Flow

```text
React frontend
   ↓
frontend logger utility
   ↓
backend proxy
   ↓
protected logging API
```

---

# Security

## Authentication

JWT-based route protection.

---

## Password Storage

bcrypt hashing.

---

## Secret Management

Stored in:

```text
.env
```

Includes:

- JWT_SECRET
- LOG_TOKEN
- DB connection URI

---

# Future Improvements

Potential enhancements:

- WebSockets for real-time notifications
- push notifications
- email notifications
- SMS alerts
- notification preferences
- bulk actions
- role-based access
- audit logs
- GraphQL API

---

# Conclusion

This system provides:

- scalable notification management
- centralized logging
- secure authentication
- optimized database access
- intelligent notification prioritization
- responsive frontend experience