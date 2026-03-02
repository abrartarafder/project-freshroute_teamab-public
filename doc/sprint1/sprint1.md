# Sprint 1 Planning Meeting  
**Date:** February 22, 2026  
**Sprint Duration:** February 22, 2026 - March 06, 2026  
**Project Name:** FreshRoute  
**Sprint Goal:** Develop and implement the core storefront experience, including product browsing, product details, recipes, and a working cart interface with basic backend integration.

---

## Sprint Goals

The primary objectives of Sprint 1 are:

1. Establish a fully navigable frontend structure using React and React Router.
2. Have a complete backend database with organic, ethically raised, and recipe products.
3. Integrate MongoDB with Express APIs for products and recipes.
5. Define reusable components and a clean, modular architecture for future expansion.

---

## Participants

| Name                     | Role 1     | Role 2     | Role 3     |
|--------------------------|------------|------------|------------|
| Shoumik Ahmed            | Fullstack Developer | QA Tester | Database Administrator |
| Moneba Hanifi            | Backend Developer | Database Administrator | QA Tester |
| Judy El Ghargomi         | Backend Developer | Database Administrator | QA Tester     |
| Ekambir Momi             | Backend/DevOps Developer | UI/UX Designer | Data Model Designer |
| Abrar Jawad Tarafder     | Fullstack Developer | UI/UX Designer | Sprint Coordinator |

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

## Epic 1: Storefront & Product Browsing (Core StoreFront Experience)

### User Stories

- **PB-01:** As a customer, I want to browse organic or ethically raised products so that I can decide what to buy.
- **PB-02:** As a customer, I want to search for products by keyword so that I can find items quickly.  
- **PB-04:** As a customer, I want to view product details so that I can make an informed purchase decision.
- **PB-17:** As a customer, I want to see clear organic and ethical badges on products so that I can make informed purchasing decisions.
- **PB-18:** As a customer, I want to see whether a product is in stock so that I do not attempt to purchase unavailable items.
- **PB-19:** As a customer, I want to browse available recipes so that I can plan meals easily without searching for individual ingredients.

### Tasks

- Create an Organic products collection in MongoDB. (Ekam)
- Create an Ethically Raised products collection in MongoDB. (Judy)
- Create a Recipe product collection in MongoDB. (Moneba) 
- Seed sample product data. (Backend Team)
- Add the product structure to the backend accordingly (e.g., in JSON format that the database expects) (Ekam, Moneba, Judy).
- Build Organic page UI. (Shoumik)
- Build an Ethically Raised page UI. (Shoumik)
- Build Landing page UI. (Abrar)
- Build Recipe page UI. (Abrar)
- Create a reusable Navbar component with search functionality on all UI pages. (Abrar)
- Implement Product Details page. (Abrar & Shoumik)
- Display product name, price, and description dynamically. (Judy)
- Prepare system design documentation and CRC cards. (Ekam)

### Spikes Identified

- Research best practices for Express route structure and Mongoose models.
- Define reusable UI components (Navbar).

**Spike 1 – Backend Route & Model Architecture Research**

Purpose:
Research best practices for structuring Express routes and Mongoose models to ensure scalable and modular backend architecture.

Supports User Stories:
PB-01 (Browse products)
PB-02 (Search products)
PB-04 (View product details)
PB-19 (Browse recipes)

Owner: Ekam

Estimated Effort: 3 hours

Expected Outcome:

Defined folder structure for routes, controllers, and models

Standardized Mongoose schema format for product and recipe collections

Documented conventions for RESTful API endpoints

---

## Total Story Points Planned

- PB-01 (5 points)
- PB-02 (3 points)  
- PB-04 (3 points)  
- PB-17 (1 point)
- PB-18 (2 points)  
- PB-19 (3 points)  

**Total: 17 Story Points**

This aligns with the team’s estimated sprint capacity.

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
