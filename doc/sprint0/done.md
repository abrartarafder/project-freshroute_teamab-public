The definition of done as agreed upon by all team members. 

## 1. Functional Completion

- All **Criteria of Satisfaction** listed in the Product Backlog item are fully implemented.
- The feature works end-to-end (frontend + backend where applicable).
- Core user flow works correctly (e.g., browse → add to cart → checkout → confirmation).
- Edge cases are handled (empty states, invalid input, duplicate items, refresh behavior).
- Feature is manually verified by at least one teammate other than the implementer.

---

## 2. User Interface & Experience

- UI renders without layout-breaking issues.
- Navigation works correctly (no broken routes).
- Buttons, filters, sorting, and forms behave as expected.
- Clear empty states are shown (e.g., “No products available”, empty cart).
- Error messages are readable and non-technical.
- Product badges (Organic, Ethical, etc.) and availability labels display consistently.

---

## 3. Data Integrity & State Management

- Cart quantities and totals calculate correctly.
- Adding the same item increases quantity (no duplicate lines).
- Cart persists during the session (as required).
- Out-of-stock items cannot be added to the cart.
- Orders correctly store:
  - Items
  - Quantities
  - Total price
  - Delivery address
  - Selected time slot
  - Order status
- Order status updates (Placed, Preparing, Out for Delivery, Delivered, Cancelled) reflect correctly in backend and UI.

---

## 4. Validation & Error Handling

- Required checkout fields are validated.
- Invalid inputs show clear validation messages.
- Application does not crash on:
  - Failed API calls
  - Empty responses
  - Invalid order ID lookups
- Proper fallback UI is shown when data cannot load.

---

## 5. Code Quality

- Code compiles and runs without errors.
- No unused variables or debug logs remain.
- Code follows agreed naming conventions and structure.
- Meaningful commit messages are used.
- Code is pushed to the shared GitHub repository.
- Pull request is reviewed before merging into main.

---

## 6. Testing & Verification

- Feature is manually tested.
- Core flow is verified end-to-end.
- Regression testing ensures existing functionality is not broken.
- Edge cases are checked.

---

## 7. Documentation & Sprint Tracking

- Trello card is updated and linked to relevant commits/PR.
- Acceptance criteria are checked before marking complete.
- Story is marked Done only after team review and agreement.

---

# Summary

A story is **Done** only when:

- All acceptance criteria are met  
- Feature works correctly  
- Errors and edge cases are handled  
- Code is reviewed and merged  
- Team agrees it meets expected quality  
