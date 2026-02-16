# Product Backlog — FreshRoute (Sprint 0)

This document lists the initial Product Backlog for FreshRoute.  
Each item is written as a user story and includes criteria of satisfaction.

---

## PB-01 — Browse Products
**User story:** As a customer, I want to browse a list of products so that I can decide what to buy.  
**Criteria of satisfaction:**
- A product list page loads without errors.
- Each product shows at least name + price.
- If there are no products, the UI shows a clear “no products available” message.

## PB-02 — Search Products
**User story:** As a customer, I want to search for products by keyword so that I can find items quickly.  
**Criteria of satisfaction:**
- Typing a keyword filters the product list.
- Clearing the keyword restores the full list.
- Search is case-insensitive.

## PB-03 — Filter/Sort Products
**User story:** As a customer, I want to filter/sort products so that I can shop efficiently.  
**Criteria of satisfaction:**
- User can filter by category (at least 2 categories).
- User can sort by price (low→high, high→low).
- Filter/sort updates results correctly.

## PB-04 — Product Details
**User story:** As a customer, I want to view product details so that I can make a purchase decision.  
**Criteria of satisfaction:**
- Clicking a product opens a details view/page.
- Details include name, price, and description (or placeholder).
- A back navigation option exists.

## PB-05 — Add Item to Cart
**User story:** As a customer, I want to add items to a cart so that I can buy multiple products in one order.  
**Criteria of satisfaction:**
- “Add to Cart” adds the item.
- Cart shows item quantity.
- Adding the same item again increases quantity (not duplicate lines).

## PB-06 — View Cart
**User story:** As a customer, I want to view my cart so that I can review items before checkout.  
**Criteria of satisfaction:**
- Cart page shows all items, quantities, and subtotal.
- Cart shows total price.
- Empty cart shows a clear message.

## PB-07 — Update/Remove Cart Items
**User story:** As a customer, I want to update quantities or remove items so that I can fix my order.  
**Criteria of satisfaction:**
- User can increase/decrease quantity.
- User can remove an item entirely.
- Totals update immediately and correctly.

## PB-08 — Create Account (Signup)
**User story:** As a new user, I want to create an account so that I can place orders and save my info.  
**Criteria of satisfaction:**
- Signup requires minimum fields (name, email, password).
- Invalid input shows helpful errors.
- On success, a user record is created.

## PB-09 — Login / Logout
**User story:** As a returning user, I want to log in/out so that I can access my account securely.  
**Criteria of satisfaction:**
- Login succeeds with valid credentials.
- Login fails with invalid credentials and shows an error.
- Logout returns the app to a logged-out state.

## PB-10 — Save Delivery Address
**User story:** As a customer, I want to save my delivery address so that checkout is faster next time.  
**Criteria of satisfaction:**
- User can add/edit an address.
- Address persists after refresh (stored in backend/DB).
- Checkout can auto-fill saved address.

## PB-11 — Select Delivery Time Slot
**User story:** As a customer, I want to select a delivery time slot so that I can receive my order at a convenient time.  
**Criteria of satisfaction:**
- A list of time slots is displayed.
- User must select one slot before placing an order.
- Selected slot is saved to the order.

## PB-12 — Place Order (Checkout)
**User story:** As a customer, I want to place an order so that my cart becomes a confirmed purchase.  
**Criteria of satisfaction:**
- Clicking “Place Order” creates an order record.
- Order includes items, quantities, total, address, and time slot.
- Cart is cleared after successful order placement.

## PB-13 — Order Confirmation
**User story:** As a customer, I want an order confirmation screen so that I know my order was successful.  
**Criteria of satisfaction:**
- Confirmation shows order ID and summary.
- Confirmation is shown only after successful checkout.
- User can navigate to order history.

## PB-14 — View Order History
**User story:** As a customer, I want to see my past orders so that I can track what I bought.  
**Criteria of satisfaction:**
- Only logged-in users can view order history.
- Orders show date, total, and status.
- Clicking an order shows order details.

## PB-15 — Track Order Status
**User story:** As a customer, I want to track the status of my order so that I know when it will arrive.  
**Criteria of satisfaction:**
- Each order shows a status (Placed, Preparing, Out for delivery, Delivered).
- Status is stored and retrieved from backend.
- Status appears consistently in confirmation + history.

## PB-16 — Cancel Order (Before Delivery)
**User story:** As a customer, I want to cancel an order before delivery so that I can fix mistakes.  
**Criteria of satisfaction:**
- Cancel is only available for eligible statuses.
- Cancelling updates status to “Cancelled”.
- Order history shows cancelled orders correctly.

## PB-17 — Admin: Add Product
**User story:** As an admin, I want to add products so that the store catalogue stays updated.  
**Criteria of satisfaction:**
- Admin can create product with name, price, and category.
- Invalid product data is rejected (e.g., missing name, negative price).
- New product appears in product list.

## PB-18 — Admin: Edit/Delete Product
**User story:** As an admin, I want to edit or delete products so that catalogue data stays accurate.  
**Criteria of satisfaction:**
- Admin can update product fields.
- Admin can delete a product.
- Changes reflect in UI after refresh.

## PB-19 — Inventory / Out-of-Stock
**User story:** As a customer, I want to see if something is in stock so that I don’t order unavailable items.  
**Criteria of satisfaction:**
- Products have an in-stock flag or quantity.
- Out-of-stock items cannot be added to cart.
- UI clearly indicates “Out of stock”.

## PB-20 — Basic Loading + Error Handling
**User story:** As a user, I want clear loading and error states so that the app feels reliable.  
**Criteria of satisfaction:**
- Pages show loading while fetching.
- API errors show a readable message.
- App doesn’t crash on common failures (empty response, failed request).

---