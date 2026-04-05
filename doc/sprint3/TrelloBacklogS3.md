# Sprint 3 - Trello Backlog  
Project: FreshRoute  
Sprint: 03

----

## All Sprint 02 Trello Backlog User Stories have been completed, these are the stories for Sprint 03. 

Notes
- A minimum of 30% of all commits are to be completed during Week 01 (March 23rd – March 30th), with the remaining commits completed in Week 02 (March 30 - April 6th), demonstrating consistent progress across the sprint timeline.

- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

Summary of Active Branches
- Place Order, Confirm Order, and Error Messages (PB-12, PB-13, PB-11, PB-20) - Abrar - `features/order-confirmation`
- Track Order Status and View Details (PB-14, PB-15, PB-20) - Shoumik -  `features/order-details-tracker`
- Image Integration/backend Tracking (PB-15, 13, 20, 11, 16) - Moneba/Ekam/Judy - `T61-features/recipes-tracking-backend`, `T62-features/organic-tracking-backend`, `T63-features/ethicallyraised-tracking-backend`


## PB-12 - Place Order (Checkout)

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 48  
**Story Points:** 5

**Assignees:** Abrar, Ekam  

### User Story  
As a customer, I want to place an order so that my cart becomes a confirmed purchase.

### Acceptance Criteria  
- Clicking “Place Order” creates an order record.
- Order includes items, quantities, total, address, and time slot.
- Cart is cleared after successful order placement.

### Tasks  

**Frontend**
- Abrar to build the time slot right below the delivery address.  
  - Branch: `features/order-confirmation`
    
**Backend**
- Ekam to provide any backend support as needed.
  - Branch: `T62-features/organic-tracking-backend`
---

## PB-15 - Track Order Status

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 50
**Story Points:** 5 

**Assignees:** Shoumik, Judy  

### User Story  
As a customer, I want to track the status of my order so that I know when it will arrive.

### Acceptance Criteria  
- Each order has a status (Placed, Preparing, Out for Delivery, Delivered).
- Status is stored in the backend.
- Order lookup displays the correct status.

### Tasks  

**Frontend**
- Shoumik to build the order details page new screen that tracks order.  
  - Branch:  `features/order-details-tracker`

**Backend**
- Judy to assist with the backend as needed 
  - Branch: `T63-features/ethicallyraised-tracking-backend`
---
## PB-13 - Order Confirmation 

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 49  
**Story Points:** 4

**Assignees:** Abrar, Ekam  

### User Story  
As a customer, I want an order confirmation screen so that I know my order was successful.

### Acceptance Criteria  
- Confirmation shows order ID and summary.
- Confirmation is shown only after successful checkout.
- User can navigate to order history.

### Tasks  

**Frontend**
- Abrar to redirect after order to a confirmation screen .  
  - Branch: `features/order-confirmation`
    
**Backend**
- Ekam to assist with any backend as needed.
  - Branch: `T62-features/organic-tracking-backend`
---
## Subtask #4 - Integrating the backend for the Recipes Product Images
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 61
**Story Points:** N/A (Spans multiple stories) 

**Assignees:** Moneba

### Tasks  
- Moneba to integrate all images in the Recipes Products backend
  - Branch: `T61-features/recipes-tracking-backend`


---
## Subtask #5 - Integrating the backend for the Organic Product Images 
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 62
**Story Points:** N/A (Spans multiple stories)

**Assignees:** Ekam 

### Tasks  
- Ekam to integrate all images in the Organic Products backend.
  - Branch: `T62-features/organic-tracking-backend`

---
## Subtask #6 -  Integrating the backend for the Ethically Raised Product Images 
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 63
**Story Points:** N/A (Spans multiple stories)

**Assignees:** Judy

### Tasks  
- Judy to integrate all images in the Ethically Raised Products backend.
  - Branch: `T63-features/ethicallyraised-tracking-backend`

---
## PB-14 - View Order Details by Order ID

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 20  
**Story Points:** 4

**Assignees:** Shoumik, Moneba  

### User Story  
As a customer, I want to view my order using an order ID so that I can review what I purchased.

### Acceptance Criteria  
- After checkout, the user receives a unique order ID.
- The user can enter the order ID on an order lookup page.
- Order details (items, total, status) are displayed correctly.
- The address is attached to the order upon successful checkout.
- The address is not permanently stored after the session, only in the order page.

### Tasks  

**Frontend**
- Shoumik to build the order details page new screen add. 
  - Branch: `features/order-details-tracker`
  
**Backend**
- Moneba to assist with any backend as needed
  - Branch: `T61-features/recipes-tracking-backend`

---

## PB-11 - Select Delivery Time Slot 

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 19
**Story Points:** 2

**Assignees:** Abrar, Judy  

### User Story  
As a customer, I want to select a delivery time slot so that I can receive my order at a convenient time.

### Acceptance Criteria  
- A list of time slots is displayed.
- The user must select one slot before placing an order.
- The selected slot is saved to the order.


### Tasks  

**Frontend**
- Abrar to build the time slot right below the delivery address. 
  - Branch: `features/order-confirmation`

**Backend**
-  Judy to assist with any backend as needed. 
    - Branch: `T63-features/ethicallyraised-tracking-backend` 

---

## PB-16 - Cancel Order

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 51  
**Story Points:** 2

**Assignees:** Shoumik, Moneba  

### User Story  
As a customer, I want to cancel my order before it is delivered so that I can correct mistakes.


### Acceptance Criteria  
- Cancel option is available only for eligible statuses (e.g., Placed).
- Cancelling updates status to “Cancelled”.
- Updated status is reflected in order lookup.

### Tasks  

**Frontend**
- Shoumik to implement frontend
    - Branch:  `features/order-details-tracker`

**Backend**
- Moneba to assist with any backend support
    - Branch: `T61-features/recipes-tracking-backend`

---
## PB-20 - User-Friendly Error Handling

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-Low-yellow)

**Ticket #:** 21 
**Story Points:** 2  

**Assignees:** Abrar, Shoumik

### User Story  
As a customer, I want clear error messages when something goes wrong so that I know what happened and what to do next. 

### Acceptance Criteria  
- Failed API requests show a readable error message.
- “No products found” and similar empty states are clearly displayed.
- The app does not crash on common failures (empty response, failed request).

### Tasks  

**Backend**
- Abrar and Shoumik to implement
  - Branch: Respective Branches

---
