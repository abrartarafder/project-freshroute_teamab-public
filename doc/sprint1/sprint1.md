# Sprint 1 Planning Meeting — FreshRoute

**Date:** February 22, 2026  
**Sprint Duration:** February 22, 2026 - March 06, 2026 
**Project Name:** FreshRoute  
**Sprint Goal:** Implement the core storefront experience with working frontend pages and basic backend integration using MongoDB.

---

## Sprint Goal

The goal of Sprint 1 is to establish the foundational structure of FreshRoute by implementing the main shopping interface and connecting it to a functional backend API.

By the end of Sprint 1, users should be able to:

- View products either retrieved from MongoDB or Sample Text for now
- View product details
- Browse recipes
- View a working cart page with subtotal calculations

This sprint focuses on frontend structure, API integration, and core UI components.

---

## Participants

| Role        | Name |
|-------------|------|
| FullStack   | [Shoumik Ahmed] |
| Backend     | [Moneba Hanifi] |
| Backend     | [Judy El Ghargomi] |
| Backend     | [Ekambir Momi] |
| Fullstack   | [Abrar Jawad Tarafder] |


All team members were present and participated in planning decisions.

---

## Team Capacity

**Total Sprint Capacity: 80 hours (2 weeks)**

- Abrar Jawad Tarafder: 20 hours  
- Shoumik Ahmed: 20 hours  
- Moneba Hanifi: 20 hours  
- Judy El Ghargomi: 20 hours  
- Ekambir Momi: 20 hours  

Capacity was calculated based on availability during the two-week sprint period.

---

# Sprint Scope

## Selected User Stories for Sprint 1

The following stories were selected from PB.md based on priority and feasibility within the sprint duration.

---

## PB-01 — Browse Products (5 points)

**User Story:**  
As a customer, I want to browse a list of organic or ethically produced products so that I can decide what to buy.

### Tasks
- Create Product model (Backend)
- Seed sample products in MongoDB
- Build Organic page UI
- Build Ethically Raised page UI
- Create `ProductCard` component UI

---

## PB-04 — Product Details (3 points)

**User Story:**  
As a customer, I want to view product details so that I can make a purchase decision.

### Tasks

- Create Product Details page
- Configure dynamic routing (React Router)
- Display name, price, and description
- Add navigation back to product listing

---

## PB-06 — View Cart (5 points)

**User Story:**  
As a customer, I want to view my cart so that I can review items before checkout.

### Tasks
- Create Cart page UI
- Implement frontend cart state (React state/context)
- Display items and quantities
- Allow quantity updates

---

## PB-19 — Browse Recipes (3 points)

**User Story:**  
As a customer, I want to browse available recipes so that I can plan meals easily without searching for individual ingredients.

### Tasks
- Create Recipe model (Backend)
- Seed sample recipes
- Build Recipes page UI
- Create reusable `RecipeCard` component
- Fetch recipes from backend
- Implement basic recipe details view

---

## Total Story Points Planned

- PB-01 (5)
- PB-04 (3)
- PB-06 (5)
- PB-19 (3)

**Total: 16 Story Points**

This aligns with the team’s two-week sprint capacity.

---

## Spikes Identified

1. **API Integration Research**  
   Investigate best practices for structuring Express routes and Mongoose models.

2. **State Management Approach**  
   Evaluate whether to use React Context or local state for managing cart state in Sprint 1.

3. **Component Architecture Planning**  
   Define reusable components (Navbar) to maintain clean structure.

4. **Planning the tasks amongst team-members**  
   Identifying which task is best suited for which individual and planning best workload practices. 

---

## Architecture Decisions

- MERN stack (MongoDB, Express, React, Node)
- MVC-style backend architecture
- RESTful API endpoints
- React Router for navigation
- Modular component-based frontend design

---

## Definition of Done for Sprint 1

A story is considered complete when:

- Code is pushed to a separate branch
- Pull request is created
- Code is reviewed and merged
- Functionality works without major errors
- Acceptance criteria are satisfied
- Story is updated on Trello

---

## Sprint 1 Deliverables

By the end of Sprint 1:

- Fully navigable frontend structure
- Products either retrieved dynamically from MongoDB or the sample product shown
- Recipes retrieved dynamically from MongoDB or the sample product shwown 
- Cart page UI with quantities that can be updated
- Clean UI layout
- Proper Git branch discipline
- Trello board fully tracked
- CRC cards and architecture diagram prepared
- Demo-ready working application

---

## Decisions Made During Planning

- Only four core stories selected to maintain realistic sprint scope.
- Checkout, proper routing, order placement, and delivery logic deferred to Sprint 2.
- Persistent cart functionality deferred to a future sprint.
- Focus on stability and clean architecture over feature quantity.