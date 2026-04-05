# Sprint 3 Planning Meeting  
**Date:** March 24, 2026  
**Sprint Duration:** March 23, 2026 - April 6, 2026
**Project Name:** FreshRoute  
---

**Notes**
-A minimum of 30% of all commits were completed during Week 01 (March 23rd – March 30th), with the remaining commits completed in Week 02 (March 30 - April 6th), demonstrating consistent progress across the sprint timeline.
- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

**Summary of Active Branches**
- Place Order, Confirm Order, and Error Handling (PB-12, PB-13, PB-11, PB-20) - Abrar - features/order-confirmation
- Track Order Status and View Details (PB-14, PB-15, PB-16, PB-20) - Shoumik - features/order-details-tracker
- Image Integration and Backend Tracking (Subtasks #4, #5, #6) - Moneba/Ekam/Judy - `T61-features/recipes-tracking-backend` , `T62-features/organic-tracking-backend`, `T63-features/ethicallyraised-tracking-backend`

## Sprint Goals

The primary objectives of Sprint 3 are:

1. Implement full order placement functionality, including time slot selection and order creation. (Associated User Story: PB-12, PB-11)
2. Develop an order confirmation system that displays order details after checkout. (Associated User Story: PB-13)
3. Enable users to track their orders with real-time status updates. (Associated User Story: PB-15)
4. Allow users to view order details using a unique order ID. (Associated User Story: PB-14)
5. Implement order cancellation functionality based on order status. (Associated User Story: PB-16)
6. Improve user experience through clear and user-friendly error handling across the application. (Associated User Story: PB-20)
7. Complete backend image integration for all product categories to ensure consistent dynamic image loading. (Associated Subtasks: #4, #5, #6)


## Product Backlog

The [sprint0 Product Backlog](../sprint0/PB.md) file has more details about all of the Product Backlogs we have established.

---

## Participants

| Name                     | Role 1     | Role 2     | Role 3     | Role 4     |
|--------------------------|------------|------------|------------|------------|
| Shoumik Ahmed            | Fullstack Developer | QA Tester | Database Administrator | System Integration Engineer |
| Moneba Hanifi            | Backend Developer | Database Administrator | QA Tester | System Integration Engineer |
| Judy El Ghargomi         | Backend Developer | Database Administrator | QA Tester     | System Integration Engineer |
| Ekambir Momi             | Backend/DevOps Developer | UI/UX Designer | Data Model Designer | System Integration Engineer |
| Abrar Jawad Tarafder     | Fullstack Developer | UI/UX Designer | Sprint Coordinator | UI Refactoring Supervisor |

All team members were present and contributed to planning decisions.

---

## Team Capacity

**Total Hours Available: 100 hours**

- Abrar Jawad Tarafder: 20 hours  
- Shoumik Ahmed: 20 hours  
- Moneba Hanifi: 20 hours  
- Judy El Ghargomi: 20 hours  
- Ekambir Momi: 20 hours  

Capacity was calculated based on individual availability during the two-week sprint window.

---

# Sprint Scope

---

## Epic 7: Order Status, Delivery Handling and Image Integration

### User Stories

- **PB-11:** As a customer, I want to select a delivery time slot so that I can receive my order at a convenient time.
- **PB-12:** As a customer, I want to place an order so that my cart becomes a confirmed purchase.
- **PB-13:** As a customer, I want an order confirmation screen so that I know my order was successful.
- **PB-14:** As a customer, I want to view my order using an order ID so that I can review what I purchased.
- **PB-15:** As a customer, I want to track the status of my order so that I know when it will arrive.
- **PB-16:** As a customer, I want to cancel my order before it is delivered so that I can correct mistakes.
- **PB-20:** As a customer, I want clear error messages when something goes wrong so that I know what happened and what to do next.

### Tasks

**PB-11: Select Delivery Time Slot (2 points)**
- Create the UI for the persistent cart. (Shoumik)
- Provide backend support for order creation. (Ekam)

**PB-12: Place Order (5 points)**
- Build time slot selection UI below the delivery address. (Abrar)
- Provide backend support for order creation. (Ekam)
  
**PB-13: Order Confirmation (4 points)**
- Redirect user to confirmation screen after checkout. (Abrar)
- Provide backend support for order confirmation. (Ekam)
  
**PB-14: View Order Details by Order ID (4 points)** 
- Build order lookup page and details view. (Shoumik)
- Provide backend support for order retrieval. (Moneba)

**PB-15: Track Order Status (5 points)**
- Build order tracking UI with status display. (Shoumik)
- Provide backend support for status updates. (Judy)

**PB-16: Cancel Order (2 points)**
- Implement cancel order functionality in the frontend. (Shoumik)
- Provide backend support for status update. (Moneba)

**PB-20: User-Friendly Error Handling (2 points)**
- Implement error handling for failed API requests. (Abrar, Shoumik)
- Display meaningful error messages and empty states. (Abrar, Shoumik)

**Subtask #4: Recipes Product Image Integration.**
- Integrate all recipe product images in the backend. (Moneba)

**Subtask #5: Organic Product Image Integration.**
- Integrate all organic product images in the backend. (Ekam)

**Subtask #6: Ethically Raised Product Image Integration**
- Integrate all ethically raised product images in the backend. (Judy)

**Total: 24 Story Points**

This aligns with the team’s estimated sprint capacity.

The team committed to completing PB-11, PB-12, PB-13, PB-14, PB-15, PB-16, and PB-20 during Sprint 3.

**Other Tasks**
- Finalize product image coverage across all categories (Backend Team)
- Update frontend documentation (Abrar, Shoumik)
- Update backend documentation (Moneba, Judy, Ekam)
- Update System Design documentation (Abrar, Ekam)

---

## Spikes Identified

### Spike 1: Order Data Structure and Storage
Purpose:
Research and define how order data (items, totals, address, time slots, and status) should be structured and stored in MongoDB.

Supports User Stories:
PB-12 (Place Order)
PB-13 (Order Confirmation)
PB-14 (View Order Details by Order ID)
PB-15 (Track Order Status)

Owner: Ekam, Moneba, Judy

Expected Outcome:
- Order schema defined with all required fields
- Unique order ID generation strategy established
- Backend APIs support the full order lifecycle


### Spike 2: Order Status Tracking System
Purpose:
Determine the best approach to dynamically track and update order statuses.

Supports User Stories:
PB-15 (Track Order Status)
PB-16 (Cancel Order)

Owner: Ekam, Abrar

Expected Outcome:
- Status lifecycle defined (Placed → Preparing → Out for Delivery → Delivered)
- Backend supports status updates
- Frontend reflects real-time status changes


### Spike 3: Error Handling and Resilience
Purpose:
Research best practices for handling API failures and edge cases in a user-friendly way.

Supports User Stories:
PB-20

Owner: Abrar, Shoumik

Expected Outcome:
- Standard error handling pattern established
- UI gracefully handles failures and empty states
- Improved overall application stability

---

## Architecture Decisions

- MERN stack (MongoDB, Express, React, Node.js)
- MVC-style backend structure
- RESTful API endpoints
- React Router for client-side routing
- Modular component-based frontend
- Git feature branching workflow

---

## Acceptance Criteria

By the end of Sprint 3, users can perform all actions from Sprint 2 and:

- Users can place orders with a selected delivery time slot
- Orders are stored with all relevant details (items, totals, address, status)
- Users receive a confirmation screen after successful checkout
- Users can retrieve order details using a unique order ID
- Users can track order status accurately
- Users can cancel eligible orders
- All product images are fully integrated and dynamically displayed
- The system handles errors gracefully without crashing
- Frontend and backend remain fully integrated
- All completed stories meet the Definition of Done
- Documentation reflects Sprint 3 updates

---

## Definition of Done

A story is complete when:

- Code is implemented in a separate feature branch.
- Pull request is created and reviewed.
- Changes are merged into the main branch.
- Functionality works without major errors.
- Frontend and backend integration works correctly where applicable.
- Acceptance criteria are satisfied.
- The Trello board is updated accordingly.

---

## Decisions Made During Planning

- Priority is placed on completing the full order workflow from checkout to tracking
- Order tracking and cancellation are essential for user experience and system completeness
- Backend image integration will be finalized across all product categories
- Error handling will be standardized across the application
- A fully functional, demo-ready system with end-to-end ordering capability is required by the end of the sprint
