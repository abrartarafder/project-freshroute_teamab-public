# Sprint 2 Planning Meeting  
**Date:** March 10, 2026  
**Sprint Duration:** March 10, 2026 - March 23, 2026
**Project Name:** FreshRoute  
---

**Notes**
- At least 30% of commits landed in Week 01 (March 10–16); the remaining commits were completed in Week 02 (March 17–23).
- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

**Summary of Active Branches**
- Cart and address updates (PB-05, PB-06, PB-09, PB-10) - Shoumik - `features/cart`
- Product filters (PB-03) - Abrar - `refactor/filter`
- Recipe ingredient scaling (PB-08) - Abrar - `features/recipes-add`
- Backend integrations (spans all stories) - Ekam/Judy/Moneba - `features/organic-integration-backend`, `features/recipes-integration-backend`

## Sprint Goals

The primary objectives of Sprint 2 are:

1. Implement product filtering and sorting to improve product browsing and shopping efficiency. (Associated User Story: PB-03)
2. Develop a functional shopping cart system that allows users to add items, view their cart, update quantities, and remove products. (Associated User Stories: PB-05, PB-06, PB-07)
3. Enable recipe-based shopping by allowing users to add recipe ingredients to the cart with scalable quantities based on serving size. (Associated User Story: PB-08)
4. Implement persistent cart functionality so items remain during navigation and page refresh. (Associated User Story: PB-09)
5. Add a checkout step that allows users to enter a delivery address during the ordering process. (Associated User Story: PB-10)
6. Integrate the backend APIs with the frontend components to ensure product data, cart actions, and recipe information flow correctly between the system layers while maintaining a modular structure that supports efficient future updates and feature additions. (Associated User Stories: PB-03, PB-05, PB-06, PB-07, PB-08, PB-09)
7. Store and manage product images within the backend data structure so the frontend can dynamically load images, enabling easier updates and scalable management of product content in the system. Product images will likely be integrated progressively and refined throughout Sprints 2 and 3. (Associated User Stories span multiple stories: Subtask #1, Subtask #2, Subtask #3)



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

**PB-03: Filter/Sort Products + Backend Integration (3 points)**
- Build UI for users to filter. (Abrar)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)
- Subtask #3 is required for this ticket. (Moneba)
  
**PB-05: Add Item to Cart + Backend Integration (5 points)**
- Create the UI for adding the Cart Items. (Shoumik)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)
- Subtask #3 is required for this ticket. (Moneba)
  
**PB-06: View Cart (4 points)** 
- Build the cart pages. (Shoumik)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)
- Subtask #3 is required for this ticket. (Moneba)

**PB-07: Update/Remove Cart Items (5 points)**
- Implement quantity adjustment controls (Shoumik)
- Implement remove item functionality (Shoumik)
- Ensure recipe items can be modified/removed (Abrar)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)
- Subtask #3 is required for this ticket. (Moneba)

**PB-08: Add Recipe Ingredients to Cart (4 points)**
- Build the recipes page and ingredient scaling integration(Abrar)
- Assist with any backend as needed (Moneba)
  
**PB-09: Persistent Cart (3 points)**
- Create the UI for the persistent cart (Shoumik)
- Subtask #1 is required for this ticket. (Ekam)
- Subtask #2 is required for this ticket. (Judy)

**PB-10: Enter Delivery Address at Checkout (2 points)**
- Build UI for delivery page (Shoumik)

**Subtask #1: Integrating the backend for the Organic Products.**
- Integrate all data in the organic page backend and connect to the frontend (Ekam).
- Add image data in the backend, including as many images as possible and working toward retrieving them. This may also be     developed further during Sprint 3. (Ekam) 
- Help structure JSON files as needed. (Ekam)
- Help with integration. (Shoumik)

**Subtask #2: Integrating the backend for the Ethically Raised Products.**
- Integrate all data in the Ethically Raised backend and connect to the frontend (Judy).
- Add image data in the backend, including as many images as possible and working toward retrieving them. This may also be     developed further during Sprint 3.  (Judy)
- Help structure JSON files as needed. (Ekam)
- Help with integration. (Shoumik)

**Subtask #3: Integrating the backend for the Recipes Product.**
- Integrate all data in the recipes backend and connect to the frontend (Moneba).
- Add image data in the backend, including as many images as possible and working toward retrieving them. This may also be     developed further during Sprint 3.(Moneba)
- Help structure JSON files as needed. (Ekam)
- Help with integration. (Shoumik)

**Total: 26 Story Points**

This aligns with the team’s estimated sprint capacity.

The team committed to completing PB-03, PB-05, PB-06, PB-07, PB-08, PB-09, and PB-10 during Sprint 2.

**Other Tasks**
- Seed sample product data. (Backend Team)
- Create frontend documentation (Abrar, Shoumik)
- Create backend documentation (Moneba, Judy, Ekam)
- Update System Design documentation. (Abrar, Ekam)

---

## Spikes Identified

### Spike 1: Backend–Frontend API Integration Strategy
Purpose:
Research and determine the best way to integrate the Express backend APIs with the React frontend so that product data can dynamically populate the UI.

Supports User Stories:
PB-03 (Filter / Sort Products)
PB-05 (Add Item to Cart)
PB-06 (View Cart)
PB-07 (Update/Remove Cart Items)

Owner: Ekam, Shoumik, Abrar

Expected Outcome:
- A clear API request structure is defined between the frontend and the backend.
- React components successfully fetch product data from the backend.
- Standardized integration pattern for Organic, Ethically Raised, and Recipe products.
- Documentation outlining the integration approach for future features.


### Spike 2: MongoDB Image Storage and Retrieval
Purpose:
Research how to store and retrieve product images in MongoDB so they can be dynamically displayed on the frontend.

Supports User Stories:
PB-03 (Filter / Sort Products)
PB-08 (Add Recipe Ingredients to Cart)

Owner: Ekam, Moneba, Judy

Expected Outcome:
- Best method identified for storing image references in MongoDB.
- Backend API returns image URLs along with product data.
- Frontend successfully loads images dynamically from backend responses.
- Image storage approach supports easy updates and future product additions.


### Spike 3: Recipe Data Structure and Ingredient Scaling
Purpose:
Research and define the optimal MongoDB schema for storing recipes, ingredients, and serving quantities so ingredient scaling can be implemented efficiently.

Supports User Stories:
PB-08 (Add Recipe Ingredients to Cart)

Owner: Ekam, Moneba, Judy

Expected Outcome:
- Recipe schema defined with ingredient lists and quantities.
- Serving-based ingredient scaling logic documented.
- Backend structure supports nested ingredient collections.
- Data structure allows ingredients to be easily added to the cart.

### Spike 4: Persistent Cart State Management
Purpose:
Research the best approach for maintaining cart data across page navigation and refresh events in the React application.

Supports User Stories:
PB-09 (Persistent Cart)
PB-05 (Add Item to Cart)
PB-06 (View Cart)

Owner: Shoumik

Expected Outcome:
- Cart state persistence method selected (e.g., local storage or session storage).
- Cart data remains consistent across page navigation and refreshes.
- Frontend cart state properly synchronizes with backend data.
- Clear documentation on how cart persistence works in the system.


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

By the end of Sprint 2:

- Users can filter and sort products by category and price.
- Users can add items to the cart from product listings and recipes.
- Users can view, update, and remove items in the cart, with totals updating correctly.
- Recipe ingredients can be added to the cart with quantities scaled by servings.
- The cart persists during page navigation and refresh.
- Users can enter a delivery address during checkout, attached to the order for the session.
- Frontend dynamically fetches product, recipe, and cart data from the backend, including images.
- All completed stories meet the Definition of Done.
- Documentation is updated to reflect Sprint 2 changes, including integration, cart persistence, and recipe structure.

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

- Priority is placed on implementing the cart system and product filtering to support the core shopping workflow.
- Backend–frontend integration will be implemented for Organic, Ethically Raised, and Recipe products.
- Recipe ingredient scaling and recipe-to-cart functionality will be implemented this sprint.
- Product image storage and retrieval will be implemented in the backend and displayed dynamically in the frontend.
- Checkout functionality will be limited to entering a delivery address, while full order processing will be deferred to a future sprint.
- A demo-ready build with working cart functionality and product integration will be required at the end of the sprint.

