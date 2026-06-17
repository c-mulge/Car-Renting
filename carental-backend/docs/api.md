# Carental API Documentation

## Base URL

```http
http://localhost:5000/api
```

---

# Authentication APIs

## Register User

```http
POST /auth/register-user
```

### Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

---

## Register Owner

```http
POST /auth/register-owner
```

### Body

```json
{
  "fullName": "Vehicle Owner",
  "email": "owner@example.com",
  "phone": "9876543211",
  "password": "password123"
}
```

---

## Login

```http
POST /auth/login
```

### Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

# Vehicle APIs

## Create Vehicle

```http
POST /vehicles
```

Role: OWNER

### Body

```json
{
  "name": "Swift Dzire",
  "brand": "Maruti Suzuki",
  "model": "Dzire",
  "year": 2024,
  "vehicleType": "SEDAN",
  "fuelType": "PETROL",
  "transmission": "MANUAL",
  "seatingCapacity": 5,
  "pricePerKm": 12,
  "securityDeposit": 5000,
  "pickupLocation": "Pune",
  "description": "Well maintained vehicle",
  "registrationNumber": "MH12AB1234"
}
```

---

## Get All Vehicles

```http
GET /vehicles
```

### Query Parameters

```http
?location=Pune
&vehicleType=SEDAN
&fuelType=PETROL
&minPrice=10
&maxPrice=20
```

---

## Get Vehicle Details

```http
GET /vehicles/:id
```

---

## Get My Vehicles

```http
GET /vehicles/my-vehicles
```

Role: OWNER

---

## Update Vehicle

```http
PUT /vehicles/:id
```

Role: OWNER

---

## Delete Vehicle

```http
DELETE /vehicles/:id
```

Role: OWNER

Soft Delete

---

## Upload Vehicle Image

```http
POST /vehicles/:id/images
```

Role: OWNER

Form Data:

```text
image → file
```

---

# Booking APIs

## Create Booking

```http
POST /bookings
```

Role: USER

### Body

```json
{
  "vehicleId": "vehicle-id",
  "pickupDate": "2026-07-20",
  "returnDate": "2026-07-25"
}
```

---

## My Bookings

```http
GET /bookings/my-bookings
```

Role: USER

---

## Approve Booking

```http
PATCH /bookings/:id/approve
```

Role: OWNER

---

## Reject Booking

```http
PATCH /bookings/:id/reject
```

Role: OWNER

---

## Cancel Booking

```http
PATCH /bookings/:id/cancel
```

Role: USER

---

# Document APIs

## Upload Documents

```http
POST /bookings/:id/upload-documents
```

Role: USER

Form Data

```text
aadharImage
drivingLicenseImage
```

---

## Verify Documents

```http
PATCH /bookings/:id/verify-documents
```

Role: OWNER

---

## Reject Documents

```http
PATCH /bookings/:id/reject-documents
```

Role: OWNER

---

# Payment APIs

## Create Razorpay Order

```http
POST /payments/create-order/:bookingId
```

Role: USER

---

## Mock Payment Success

```http
POST /payments/mock-success/:bookingId
```

Role: USER

---

# Rental APIs

## Start Rental

```http
PATCH /bookings/:id/start-rental
```

Role: OWNER

### Body

```json
{
  "pickupOdometer": 25000
}
```

---

## Complete Rental

```http
PATCH /bookings/:id/complete-rental
```

Role: OWNER

### Body

```json
{
  "returnOdometer": 25250
}
```

---

# Review APIs

## Create Review

```http
POST /reviews
```

Role: USER

### Body

```json
{
  "vehicleId": "vehicle-id",
  "rating": 5,
  "comment": "Excellent vehicle and service."
}
```

---

## Get Vehicle Reviews

```http
GET /reviews/vehicle/:vehicleId
```

---

## Rating Summary

```http
GET /reviews/vehicle/:vehicleId/summary
```

---

# Notification APIs

## Get My Notifications

```http
GET /notifications
```

---

## Mark Notification Read

```http
PATCH /notifications/:id/read
```

---

# Dashboard APIs

## User Dashboard

```http
GET /dashboard/user
```

Role: USER

---

## Owner Dashboard

```http
GET /dashboard/owner
```

Role: OWNER

---

# Admin APIs

## Dashboard Statistics

```http
GET /admin/dashboard
```

Role: ADMIN

---

## Get All Users

```http
GET /admin/users
```

Role: ADMIN

---

## Get All Vehicles

```http
GET /admin/vehicles
```

Role: ADMIN

---

## Get All Bookings

```http
GET /admin/bookings
```

Role: ADMIN

---

## Block User

```http
PATCH /admin/users/:id/block
```

Role: ADMIN

---

## Unblock User

```http
PATCH /admin/users/:id/unblock
```

Role: ADMIN

---

# Authentication Header

For protected APIs:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```
