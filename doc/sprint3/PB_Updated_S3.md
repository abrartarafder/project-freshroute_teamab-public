# Product Backlog - FreshRoute (Sprint 3)

This document lists the initial Product Backlog for FreshRoute.  
Each item is written as a user story and includes criteria of satisfaction.

Note: Similar or closely related user stories could potentially be grouped under a single Trello card for organizational purposes. Trello is used for sprint planning and task tracking, and stories may be reprioritized or separated into individual cards as the project evolves.

---

## ~~PB-01 - Browse Products - Completed in Sprint1~~

## ~~PB-02 - Search Products - Completed in Sprint1~~

## ~~PB-03 - Filter/Sort Products~~

## ~~PB-04 - Product Details - Completed in Sprint1~~

## ~~PB-05 - Add Item to Cart~~

## ~~PB-06 - View Cart~~

## ~~PB-07 - Update/Remove Cart Items~~

## ~~PB-08 - Add Recipe Ingredients to Cart~~

## ~~PB-09 - Persistent Cart~~

## ~~PB-10 - Enter Delivery Address at Checkout~~

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

## ~~PB-18 - Display Product Availability  - Completed in Sprint1~~

## ~~PB-19 - Browse Recipes  - Completed in Sprint1~~



## PB-20 - User-Friendly Error Handling
**User story:** As a customer, I want clear error messages when something goes wrong so that I know what happened and what to do next.  
**Criteria of satisfaction:**
- Failed API requests show a readable error message.
- “No products found” and similar empty states are clearly displayed.
- The app does not crash on common failures (empty response, failed request).

---
