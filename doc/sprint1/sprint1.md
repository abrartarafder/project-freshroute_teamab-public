# Sprint 1 Planning Meeting  
**Date:** February 22, 2026  
**Sprint Duration:** February 22, 2026 - March 06, 2026  
**Project Name:** FreshRoute  
**Sprint Goal:** Develop and implement the core storefront experience, including product browsing, product details, recipes, and a working cart interface with basic backend integration.

---

## Sprint Goals

The primary objectives of Sprint 1 are:

1. Establish a fully navigable frontend structure using React and React Router.
2. Integrate MongoDB with Express APIs for products and recipes.
3. Implement a functional cart interface.
4. Define reusable components and a clean modular architecture for future expansion.

---

## Participants

| Role       | Name |
|------------|------|
| Fullstack  | Shoumik Ahmed |
| Backend    | Moneba Hanifi |
| Backend    | Judy El Ghargomi |
| Backend    | Ekambir Momi |
| Fullstack  | Abrar Jawad Tarafder |

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

## Epic 1: Storefront & Product Browsing

### User Stories

- **PB-01:** As a customer, I want to browse organic or ethically raised products so that I can decide what to buy.  
- **PB-04:** As a customer, I want to view product details so that I can make an informed purchase decision.

### Tasks

- Create Organic products collection in MongoDB. (Judy)
- Create Ethically Raised products collection in MongoDB. (Moneba)
- Seed sample product data. (Backend Team)
- Build Organic page UI. (Shoumik)
- Build Ethically Raised page UI. (Abrar & Shoumik)
- Build Landing page UI. (Abrar)
- Create reusable Navbar component. (Abrar)
- Implement Product Details page. (Abrar & Shoumik)
- Display product name, price, and description dynamically. (Judy)
- Prepare system design documentation and CRC cards. (Moneba, Judy, Ekambir)

### Spikes Identified

- Research best practices for Express route structure and Mongoose models.
- Define reusable UI components (Navbar).

---

## Epic 2: Cart & Recipes

### User Stories

- **PB-06:** As a customer, I want to view my cart so that I can review items before checkout.  
- **PB-19:** As a customer, I want to browse available recipes so that I can plan meals easily.

### Tasks

- Create Cart page UI. (Ekambir)
- Implement frontend cart state (React Context or local state). (Shoumik)
- Display cart items and quantities. (Moneba)
- Create Recipes collection in MongoDB. (Ekambir)
- Seed sample recipes. (Moneba)
- Build Recipes page UI. (Abrar & Shoumik)
- Implement basic recipe details view. (Judy)

### Spikes Identified

- Evaluate React Context vs local state for cart management.
- Standardize frontend API data fetching approach.

---

## Total Story Points Planned

- PB-01 (5 points)  
- PB-04 (3 points)  
- PB-06 (5 points)  
- PB-19 (3 points)  

**Total: 16 Story Points**

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
- All completed stories meet Definition of Done.

---

## Definition of Done

A story is complete when:

- Code is implemented in a separate feature branch.
- Pull request is created and reviewed.
- Changes are merged into the main branch.
- Functionality works without major errors.
- Acceptance criteria are satisfied.
- Trello board is updated accordingly.

---

## Decisions Made During Planning

- Only four core user stories selected to ensure realistic scope.
- Checkout flow, order placement, and delivery tracking deferred to Sprint 2.
- Persistent cart storage deferred to a future sprint.
- Emphasis placed on clean architecture and stability over feature expansion.
- Demo-ready build required at sprint end.