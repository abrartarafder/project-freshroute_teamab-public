# Product Backlog - FreshRoute (Sprint 0)

This document lists the initial Product Backlog for FreshRoute.  
Each item is written as a user story and includes criteria of satisfaction.

Note: Similar or closely related user stories are grouped under a single Trello card for organizational purposes. Trello is used for sprint planning and task tracking, and stories may be reprioritized or separated into individual cards as the project evolves.

---

## ~~PB-01 - Browse Products - Completed in Sprint1~~
**User story:** ~~As a customer, I want to browse a list of organic or ethically produced products so that I can decide what to buy. ~~
**Criteria of satisfaction:**
- ~~A product list page loads without errors.~~
- ~~Each product shows at least name + price.~~
- ~~If there are no products, the UI shows a clear “no products available” message.~~

## ~~PB-02 - Search Products - Completed in Sprint1~~
**User story:** ~~As a customer, I want to search for products by keyword so that I can find items quickly.~~
**Criteria of satisfaction:**
- ~~Typing a keyword filters the product list.~~
- ~~Clearing the keyword restores the full list.~~
- ~~Search is case-insensitive.~~

## PB-03 - Filter/Sort Products
**User story:** As a customer, I want to filter/sort products so that I can shop efficiently.  
**Criteria of satisfaction:**
- User can filter by category (at least 2 categories).
- User can sort by price (low→high, high→low).
- Filter/sort updates results correctly.

## ~~PB-04 - Product Details - Completed in Sprint1~~
**User story:** ~~As a customer, I want to view product details so that I can make a purchase decision.~~ 
**Criteria of satisfaction:**
- ~~Clicking a product opens a details view/page.~~
- ~~Details include name, price, and description (or placeholder).~~
- ~~A back navigation option exists.~~

## PB-05 - Add Item to Cart
**User story:** As a customer, I want to add items to a cart so that I can buy multiple products in one order.  
**Criteria of satisfaction:**
- “Add to Cart” adds the item.
- Cart shows item quantity.
- Adding the same item again increases quantity (not duplicate lines).

## PB-06 - View Cart
**User story:** As a customer, I want to view my cart so that I can review items before checkout.  
**Criteria of satisfaction:**
- Cart page shows all items, quantities, and subtotal.
- Cart shows total price.
- Empty cart shows a clear message.

## PB-07 - Update/Remove Cart Items
**User story:** As a customer, I want to update quantities or remove items so that I can fix my order.  
**Criteria of satisfaction:**
- User can increase/decrease quantity.
- User can remove an item entirely.
- Totals update immediately and correctly.

## PB-08 - Add Recipe Ingredients to Cart
**User story:** As a customer, I want to add a recipe to my cart so that all required ingredients are added automatically with the correct quantities.

**Criteria of satisfaction:**
- Selecting a recipe shows an ingredient list.
- User can choose a number of servings.
- Ingredient quantities scale based on servings.
- Clicking “Add to Cart” adds all ingredients in one action.
- If an ingredient already exists in the cart, its quantity is increased (not duplicated).


## PB-09 - Persistent Cart
**User story:** As a customer, I want my cart to persist during my session so that I do not lose items while browsing.

**Criteria of satisfaction:**
- Items remain in cart while navigating between pages.
- Cart does not reset on page refresh.


## PB-10 - Enter Delivery Address at Checkout
**User story:** As a customer, I want to enter my delivery address during checkout so that my order can be delivered correctly.

**Criteria of satisfaction:**
- Checkout form includes required address fields (e.g., street, city, postal code).
- Form validates required inputs.
- Address is attached to the order upon successful checkout.
- Address is not permanently stored after the session.


## PB-11 - Select Delivery Time Slot
**User story:** As a customer, I want to select a delivery time slot so that I can receive my order at a convenient time.  
**Criteria of satisfaction:**
- A list of time slots is displayed.
- User must select one slot before placing an order.
- Selected slot is saved to the order.

## PB-12 - Place Order (Checkout)
**User story:** As a customer, I want to place an order so that my cart becomes a confirmed purchase.  
**Criteria of satisfaction:**
- Clicking “Place Order” creates an order record.
- Order includes items, quantities, total, address, and time slot.
- Cart is cleared after successful order placement.

## PB-13 - Order Confirmation
**User story:** As a customer, I want an order confirmation screen so that I know my order was successful.  
**Criteria of satisfaction:**
- Confirmation shows order ID and summary.
- Confirmation is shown only after successful checkout.
- User can navigate to order history.

## PB-14 - View Order Details by Order ID
**User story:** As a customer, I want to view my order using an order ID so that I can review what I purchased.

**Criteria of satisfaction:**
- After checkout, the user receives a unique order ID.
- User can enter the order ID on an order lookup page.
- Order details (items, total, status) are displayed correctly.

## PB-15 - Track Order Status
**User story:** As a customer, I want to track the status of my order so that I know when it will arrive.

**Criteria of satisfaction:**
- Each order has a status (Placed, Preparing, Out for Delivery, Delivered).
- Status is stored in the backend.
- Order lookup displays the correct status.

## PB-16 - Cancel Order
**User story:** As a customer, I want to cancel my order before it is delivered so that I can correct mistakes.

**Criteria of satisfaction:**
- Cancel option is available only for eligible statuses (e.g., Placed).
- Cancelling updates status to “Cancelled”.
- Updated status is reflected in order lookup.


## ~~PB-17 - Product Badges (Organic / Ethical Labels)  - Completed in Sprint1~~
**User story:** ~~As a customer, I want to see clear organic and ethical badges on products so that I can make informed purchasing decisions.~~
**Criteria of satisfaction:**
- ~~Product cards display badges such as “Organic”, “Non-GMO”, and “Ethically Raised” when applicable.~~
- ~~Product detail view displays the same badges consistently.~~
- ~~Badges are visually distinct and easy to understand.~~

## ~~PB-18 - Display Product Availability  - Completed in Sprint1~~
**User story:** ~~As a customer, I want to see whether a product is in stock so that I do not attempt to purchase unavailable items.~~

**Criteria of satisfaction:**
- ~~Each product displays an “In Stock” or “Out of Stock” label.~~
- ~~Out-of-stock items cannot be added to the cart.~~
- ~~The UI clearly differentiates unavailable products.~~

## ~~PB-19 - Browse Recipes  - Completed in Sprint1~~
**User story:** ~~As a customer, I want to browse available recipes so that I can plan meals easily without searching for individual ingredients.~~

**Criteria of satisfaction:**
- ~~A dedicated Recipes page displays a list of available recipes.~~
- ~~Each recipe shows at least a name and short description.~~
- ~~Clicking a recipe opens a detailed view.~~
- ~~Recipe detail includes ingredient list and default serving size.~~
- ~~Recipes load without errors and display a clear message if none are~~


## PB-20 - User-Friendly Error Handling
**User story:** As a customer, I want clear error messages when something goes wrong so that I know what happened and what to do next.  
**Criteria of satisfaction:**
- Failed API requests show a readable error message.
- “No products found” and similar empty states are clearly displayed.
- The app does not crash on common failures (empty response, failed request).

---
