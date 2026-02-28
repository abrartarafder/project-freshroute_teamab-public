# Sprint 1 - Trello Backlog  
Project: FreshRoute  
Sprint: 01  

---

## PB-01 - Browse Products  

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 13  
**Story Points:** 5  
**Assignees:** Shoumik, Ekam, Judy  

### Acceptance Criteria  
- A product list page loads without errors.  
- Each product shows at least name + price.  
- If there are no products, the UI shows a clear “no products available” message.  

### Tasks  

**Frontend**
- Shoumik to build the organic + ethically raised page  
  - Branch: `features/organic-ethical`

**Backend**
- Ekam to review the organic page and add the product structure to the backend  
  - Branch: `features/organic-backend`
- Judy to review the organic page and add the product structure to the backend  
  - Branch: `features/ethically-backend`

---

## PB-02 - Search Products  

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 14  
**Story Points:** 5  
**Assignees:** Abrar, Moneba, Judy  

### Acceptance Criteria  
- Typing a keyword filters the product list.  
- Clearing the keyword restores the full list.  
- Search is case-insensitive.  

### Tasks  

**Frontend**
- Abrar to build  
  - Branch: `features/recipes`

**Backend Review**
- Moneba and Judy to check if backend support is needed  

---

## PB-04 - Product Details  

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 16  
**Story Points:** 5  
**Assignees:** Shoumik, Ekam, Judy  

### Acceptance Criteria  
- Clicking a product opens a details view/page.  
- Details include name, price, and description (or placeholder).  
- A back navigation option exists.  

### Tasks  

**Frontend**
- Shoumik to build the organic + ethically raised page  
  - Branch: `features/organic-ethical`

**Backend**
- Ekam to add the list of organic products to backend database  
  - Branch: `features/organic-backend`
- Judy to add the list of ethically raised products to backend database  
  - Branch: `features/ethically-backend`

---

## PB-19 - Browse Recipes  

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 38  
**Story Points:** 5  
**Assignees:** Abrar, Moneba  

### Acceptance Criteria  
- A dedicated Recipes page displays a list of available recipes.  
- Each recipe shows at least a name and short description.  
- Clicking a recipe opens a detailed view.  
- Recipe detail includes ingredient list and default serving size.  
- Recipes load without errors and display a clear message if none are available.  

### Tasks  

**Frontend**
- Abrar to build the landing + recipes page  
  - Branch: `features/recipes` (merged and deleted)

**Backend**
- Moneba to implement backend for recipes page (structure, JSON, images)  
  - Branch: `features/recipes-backend`

---

## PB-18 - Display Product Availability  

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-High-red)

**Ticket #:** 39  
**Story Points:** 4  
**Assignees:** Abrar, Shoumik, Ekam, Judy, Moneba  

### Acceptance Criteria  
- Each product displays an “In Stock” or “Out of Stock” label.  
- Out-of-stock items cannot be added to the cart.  
- The UI clearly differentiates unavailable products.  

### Tasks  

**Frontend**
- Abrar and Shoumik to implement frontend availability labels  

**Backend**
- Ekam, Judy, Moneba to implement backend support  

Branches:
- `features/recipes-backend`  
- `features/organic-backend`  
- `features/ethically-backend`

---

## PB-17 - Product Badges (Organic / Ethical Labels)  

![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Priority](https://img.shields.io/badge/Priority-Medium-orange)

**Ticket #:** 22  
**Story Points:** 3  
**Assignees:** Abrar, Shoumik, Moneba, Judy, Ekam  

### Acceptance Criteria  
- Product cards display badges such as “Organic”, “Non-GMO”, and “Ethically Raised” when applicable.  
- Product detail view displays the same badges consistently.  
- Badges are visually distinct and easy to understand.  

### Tasks  

**Frontend**
- Abrar and Shoumik to implement frontend  
  - `features/organic-ethical`  
  - `features/recipes`

**Backend**
- Moneba → `features/recipes-backend`  
- Judy → `features/ethically-backend`  
- Ekam → `features/organic-backend`