# Sprint 2 - Trello Backlog  
Project: FreshRoute  
Sprint: 02

----

## All Sprint 01 Trello Backlog User Stories has been completed, these are the stories for sprint 02. 

Notes
- At least 30% of commits landed in Week 01 (March 10–16); the remaining commits were completed in Week 02 (March 17–23).
- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

Summary of Active Branches
- Cart and address updates (PB-05, PB-06, PB-09, PB-10) - Shoumik - `features/cart`
- Product filters (PB-03) - Abrar - `refactor/filter`
- Recipe ingredient scaling (PB-08) - Abrar - `features/recipes-add`
- Backend integrations (span multiple stories) - Ekam/Judy/Moneba - `features/organic-integration-backend`, `features/recipes-integration-backend`

## PB-05 - Add Item to Cart

![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 17  
**Story Points:** 5

**Assignees:** Shoumik, Ekam, Judy  

### User Story  
As a customer, I want to add items to a cart so that I can buy multiple products in one order.  

### Acceptance Criteria  
- “Add to Cart” adds the item.
- Cart shows item quantity.
- Adding the same item again increases quantity (not duplicate lines).

### Tasks  

**Frontend**
- Shoumik to create the UI for adding the Cart Items  
  - Branch: `features/cart`

**Backend Review**
- Ekam and Judy continue to create the items for the backend in their respective branches (Subtasks 1 and 2). 

---

## PB-06 - View Cart

![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 37
**Story Points:** 4 

**Assignees:** Shoumik, Judy  

### User Story  
As a customer, I want to view my cart so that I can review items before checkout.  

### Acceptance Criteria  
- Cart page shows all items, quantities, and subtotal.
- Cart shows total price.
- Empty cart shows a clear message.

### Tasks  

**Frontend**
- Shoumik to create the UI for adding the Cart Items  
  - Branch: `features/cart`

**Backend**
- Judy to assist with the backend as needed 
  - Branch: `features/ethicallyraised-integration-backend`
---
## Subtask #1 - Integrating the backend for the Organic Products
![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 55
**Story Points:** N/A (Spans multiple stories) 

**Assignees:** Shoumik, Abrar, Ekam 

### Tasks  
- Ekam to integrate all data in the organic page backend
  - Branch: `features/organic-integration-backend`
- Shoumik and Abrar to help as needed 

---
## Subtask #2 - Integrating the backend for the Ethically Raised Products
![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 56
**Story Points:** N/A (Spans multiple stories)

**Assignees:** Shoumik, Abrar, Judy

### Tasks  
- Judy to integrate all data in the ethically raised page backend
  - Branch: `features/ethicallyraised-integration-backend`
- Shoumik and Abrar to help as needed 

---
## Subtask #3 - Integrating the backend for the Recipes Products
![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 57
**Story Points:** N/A (Spans multiple stories)

**Assignees:** Ekam, Abrar, Moneba

### Tasks  
- Moneba to integrate all data in the recipes backend
  - Branch: `features/recipes-integration-backend`
- Ekam and Abrar to help as needed
  - Abrar to help with the integrating into which elements
  - Ekam to help with mapping out the json and the backend coding

---
## PB-07 - Update/Remove Cart Items

![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 46  
**Story Points:** 5

**Assignees:** Abrar, Shoumik, Moneba  

### User Story  
As a customer, I want to update quantities or remove items so that I can fix my order.  

### Acceptance Criteria  
- User can increase/decrease quantity.
- User can remove an item entirely.
- Totals update immediately and correctly.


### Tasks  

**Frontend**
- Abrar to create the UI for adding Items to cart for recipes
  - Branch: `features/recipes-add`
- Shoumik to create the UI for adding Items to cart for Organic and Ethically Raised pages
  - Branch: `features/cart`
  
**Backend**
- Moneba to integrate the recipes in backend which should pull the ingredients 
  - Branch: `features/recipes-integration-backend`

---

## PB-08 - Add Recipe Ingredients to Cart

![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 18 
**Story Points:** 4

**Assignees:** Abrar, Moneba  

### User Story  
As a customer, I want to add a recipe to my cart so that all required ingredients are added automatically with the correct quantities.


### Acceptance Criteria  
- Selecting a recipe shows an ingredient list.
- User can choose a number of servings.
- Ingredient quantities scale based on servings.
- Clicking “Add to Cart” adds all ingredients in one action.
- If an ingredient already exists in the cart, its quantity is increased (not duplicated).


### Tasks  

**Frontend**
- Abrar to build the recipes and add to cart action 
  - Branch: `features/recipes-add`

**Backend**
-  Moneba to implement backend support  

---

## PB-09 - Persistent Cart

![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 45  
**Story Points:** 3

**Assignees:** Shoumik, Judy, Ekam  

### User Story  
As a customer, I want my cart to persist during my session so that I do not lose items while browsing.


### Acceptance Criteria  
- Items remain in cart while navigating between pages.
- Cart does not reset on page refresh.

### Tasks  

**Frontend**
- Shoumik to implement frontend  
  - `features/cart`  

**Backend**
- Ekam → `features/organic-integration-backend`  
- Judy → `features/ethicallyraised-integration-backend`

---
## PB-03 - Filter / Sort Products

![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 15  
**Story Points:** 3  

**Assignees:** Judy, Moneba, Abrar, Ekam 

### User Story  
As a customer, I want to filter/sort products so that I can shop efficiently.  

### Acceptance Criteria  
- User can filter by category (at least 2 categories).
- User can sort by price (low→high, high→low).
- Filter/sort updates results correctly.

### Tasks  

**Frontend**
- Abrar to build the UI for the users to be able to filter 
  - Branch: `refactor/filter`

**Backend**
- Ekam to create the backend for integrating the Organic item data filter (Subtask 1) 
  - Branch: `features/organic-integration-backend`
- Judy to create the backend for integrating the Ethically Raised item data filter (Subtask 2) 
  - Branch: `features/ethicallyraised-integration-backend`
- Moneba to create the backend for integrating the Recipe item data filter (Subtask 3) 
  - Branch: `features/recipes-integration-backend`

---

## PB-10 - Enter Delivery Address at Checkout


![Status](https://img.shields.io/badge/Status-Completed%20-green)
![Priority](https://img.shields.io/badge/Priority-Low-yellow)

**Ticket #:** 47
**Story Points:** 2

**Assignees:** Shoumik, Judy, Moneba 
### User Story  
As a customer, I want to enter my delivery address during checkout so that my order can be delivered correctly.

### Acceptance Criteria  
- Checkout form includes required address fields (e.g., street, city, postal code).
- Form validates required inputs.
- Address is attached to the order upon successful checkout.
- Address is not permanently stored after the session.

**Frontend**
- Shoumik to implement frontend  
  - `features/cart`

**To-do**
- Judy and Moneba to verify and perform testing – will carry over to Sprint 3 as well
  - In respective branches
