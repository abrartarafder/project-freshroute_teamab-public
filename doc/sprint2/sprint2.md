Notes
- At least 30% of commits landed in Week 01 (March 10–16); the remaining commits were completed in Week 02 (March 17–23).
- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

Summary of Active Branches
- Cart and address updates (PB-05, PB-06, PB-09, PB-10) - Shoumik - `features/cart`
- Product filters (PB-03) - Abrar - `refactor/filter`
- Recipe ingredient scaling (PB-08) - Abrar - `features/recipes-add`
- Backend integrations (spans all stories) - Ekam/Judy/Moneba - `features/organic-integration-backend`, `features/recipes-integration-backend`

# Sprint 2 Planning Meeting  
**Date:** March 10, 2026  
**Sprint Duration:** March 10, 2026 - March 23, 2026
**Project Name:** FreshRoute  
**Sprint Goal:** 
---

## Sprint Goals

The primary objectives of Sprint 2 are:

1. Implement product filtering and sorting to improve product browsing and shopping efficiency. (Associated User Story: PB-03)
2. Develop a functional shopping cart system that allows users to add items, view their cart, update quantities, and remove products. (Associated User Stories: PB-05, PB-06, PB-07)
3. Enable recipe-based shopping by allowing users to add recipe ingredients to the cart with scalable quantities based on serving size. (Associated User Story: PB-08)
4. Implement persistent cart functionality so items remain during navigation and page refresh. (Associated User Story: PB-09)
5. Add a checkout step that allows users to enter a delivery address during the ordering process. (Associated User Story: PB-10)
6. Integrate the backend APIs with the frontend components to ensure product data, cart actions, and recipe information flow correctly between the system layers while maintaining a modular structure that supports efficient future updates and feature additions. (Associated User Stories: PB-03, PB-05, PB-06, PB-07, PB-08, PB-09)
7. Store and manage product images within the backend data structure so the frontend can dynamically load images, enabling easier updates and scalable management of product content in the system. (Associated User Stories: PB-03, PB-08)


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

## Epic 3: Cart Page + BackEnd/Frontend Integration

### User Stories

- **PB-03:** As a customer, I want to filter/sort products so that I can shop efficiently.
- **PB-05:** As a customer, I want to add items to a cart so that I can buy multiple products in one order.
- **PB-06:** As a customer, I want to view my cart so that I can review items before checkout.
- **PB-07:** As a customer, I want to update quantities or remove items so that I can fix my order.
- **PB-08:** As a customer, I want to add a recipe to my cart so that all required ingredients are added automatically with the correct quantities.
- **PB-09:** As a customer, I want my cart to persist during my session so that I do not lose items while browsing.
- **PB-10:** As a customer, I want to enter my delivery address during checkout so that my order can be delivered correctly.


### Tasks

**PB-03 - Filter/Sort Products + Backend Integration (3 points)**
- Build UI for users to filter. (Abrar)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)
- Subtask #3 is required for this ticket. (Moneba)
  
**PB-05 - Add Item to Cart + Backend Integration (5 points)**
- Create the UI for adding the Cart Items. (Shoumik)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)
- Subtask #3 is required for this ticket. (Moneba)
  
**PB-04: View product details (3 points)** 
- Implement Product Details page. (Abrar & Shoumik)
- Create an Organic products collection in MongoDB. (Ekam)
- Create an Ethically Raised products collection in MongoDB. (Judy)

**PB-17: Product Badges (1 point)**
- Build in frontend functionality on their respective pages to support the feature (Abrar, Shoumik)
- Implement product badge attributes according to the product structure in their respective backend DBs. (Ekam, Judy, Moneba)

**PB-18: Display Product Availability (2 points)**
- Build in frontend functionality on their respective pages to support the feature (Abrar, Shoumik)
- Implement product badge availability functionality according to the product structure in their respective backend DBs. (Ekam, Judy, Moneba)
  
**PB-19: Browse recipes (3 points)**
- Build Recipe page UI. (Abrar)
- Create a Recipe product collection in MongoDB. (Moneba)

**Total: 17 Story Points**

This aligns with the team’s estimated sprint capacity.

The team committed to completing PB-01, PB-02, PB-04, PB-17, PB-18, and PB-19 during Sprint 1.

**Other Tasks**
- Seed sample product data. (Backend Team)
- Create frontend documentation (Abrar, Shoumik)
- Create backend documentation (Moneba, Judy, Ekam)
- Prepare system design documentation and CRC cards. (Ekam)


---

## Spikes Identified

### Spike 1: Backend Route & Model Architecture Research

Purpose:
Research best practices for structuring Express routes and Mongoose models to ensure a scalable and modular backend architecture.

Supports User Stories:
PB-01 (Browse products)
PB-02 (Search products)
PB-04 (View product details)
PB-19 (Browse recipes)

Owner: Ekam

Expected Outcome:
- Defined folder structure for routes, controllers, and models
- Standardized Mongoose schema format for product and recipe collections
- Documented conventions for RESTful API endpoints



### Spike 2: Reusable Navbar & UI Component Design

Purpose:
Research and define best practices for building reusable React components, specifically a global Navbar with search functionality and routing support.

Supports User Stories:
PB-01 (Browse products)
PB-02 (Search products)

Owner: Abrar

Expected Outcome:
- Navbar component design finalized
- Search input integrated with routing logic
- Component is reusable across all pages
- Clear component hierarchy defined



### Spike 3: MERN Stack Integration & Frontend–Backend Connection

Purpose:
Research and define the correct method for connecting the React frontend to the Express/Node backend using the MERN stack. Ensure proper API communication, routing structure, and environment configuration for development.

Supports User Stories:
PB-01 (Browse products)
PB-02 (Search products)
PB-04 (View product details)
PB-19 (Browse recipes)

Owner: Shoumik

Expected Outcome:
- Confirm folder structure for separating frontend and backend
- Configure CORS correctly between frontend and backend
- Establish working Axios/fetch API calls from React to Express
- Verify MongoDB data retrieval through backend API endpoints
- Document environment variable setup (.env for DB URI, ports, etc.)
- Confirm local development setup (e.g., frontend on port 3000, backend on 5000)

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

By the end of Sprint 1:

- Users can navigate between Landing, Products, Recipes, and Cart pages.
- Products are displayed from MongoDB or seeded sample data.
- Product Details page dynamically displays name, price, and description.
- Recipes are retrieved and displayed from MongoDB.
- Cart page displays items with adjustable quantities.
- All completed stories meet the Definition of Done.
- Frontend and Backend Documentation Template is complete. 
- System Design Documentation is complete. 

---

## Definition of Done

A story is complete when:

- Code is implemented in a separate feature branch.
- Pull request is created and reviewed.
- Changes are merged into the main branch.
- Functionality works without major errors.
- Acceptance criteria are satisfied.
- The Trello board is updated accordingly.

---

## Decisions Made During Planning

- Checkout flow, order placement, and delivery tracking deferred to Sprint 2.
- Complete cart storage functionality deferred to a future sprint.
- Emphasis placed on clean architecture and stability over feature expansion.
- Demo-ready build required at sprint end.
- Appropriate backend structure and attributes to be displayed.
- Deferring product image storage in the backend to sprint 2.
