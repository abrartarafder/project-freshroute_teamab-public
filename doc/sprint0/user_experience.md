# User Experience - FreshRoute (Main Pages)

Figma: https://www.figma.com/design/5c4UQhkcLux5jiRIkAHxb5/EECS3311_FreshRoute?node-id=24-2&t=YJvZso7EpI8yFKRt-1
---

## Page 1: Home Page

<p align="center">
  <img src="/extra/figma/LandingPage.png"
       alt="FreshRoute Landing Page."
       width="1000" />
</p>

The Home Page serves as the primary entry point into FreshRoute. It establishes the brand identity, communicates the platform’s focus on fresh and organic food, and guides users toward the main shopping.

### Relation to Key Scenarios

**Weekly Organic Grocery Order**  
Navigation options such as **Organic** and **Ethically Raised** let users start structured browsing. The main call-to-action guides users into the product exploration flow.

**Quick Fresh Purchase**  
The prominent search bar enables users to quickly locate specific items. Clear top-level navigation reduces friction and supports efficient shopping.

**Pre-made Recipes**  
The **Recipes** navigation link lets users browse dishes rather than individual products, aligning with recipe-based shopping.

---

## Page 2: Organic Page

<p align="center">
  <img src="/extra/figma/Organic.png"
       alt="FreshRoute Organic Page."
       width="1000" />
</p>

The Organic Page presents fresh produce in a clean grid layout. Each product card includes:

- Product image  
- Name  
- Rating  
- Country of origin  
- Price per unit  
- “Add to Cart” button  

The consistent structure allows users to compare items quickly and add products efficiently.

### Relation to Key Scenarios

**Weekly Organic Grocery Order**  
Users can browse produce by category and add multiple ingredients to their cart for meal planning.

**Health-Conscious Shopper**  
Organic labeling and origin details reinforce transparency and support informed decision-making.

**Quick Purchase Flow**  
The grid layout allows fast scanning and one-click cart additions.

---

## Page 3: Ethically Raised Page

<p align="center">
  <img src="/extra/figma/EthicallyRaised.png"
       alt="FreshRoute Ethically Raised Page."
       width="1000" />
</p>

The Ethically Raised Page focuses on responsibly sourced proteins. The layout mirrors the Organic Page to maintain visual consistency and reduce cognitive load.

Each product card includes:

- Clear product image  
- Ethical sourcing indicators  
- Rating  
- Price per unit  
- “Add to Cart” button  

Consistency ensures users can switch categories without confusion.

### Relation to Key Scenarios

**Ethical Consumer Scenario**  
Users prioritizing humane and sustainable sourcing can easily identify relevant products.

**Weekly Planning Scenario**  
Users planning full meals can combine ethically raised proteins with organic produce seamlessly.

---

## Page 4: Recipes Page

<p align="center">
  <img src="/extra/figma/Recipes.png"
       alt="FreshRoute Recipes Page."
       width="1000" />
</p>

The Recipes Page allows users to browse complete meals rather than individual ingredients.

Each recipe card includes:

- Recipe image  
- Name  
- Short description  
- Serving size  
- Price per serving  
- “Add to Cart” button  

This supports structured meal planning and reduces decision fatigue.

### Relation to Key Scenarios

**Pre-made Recipes Scenario**  
Users can select a dish and automatically add all required ingredients to their cart.

**Family Meal Planning**  
Clear serving sizes and pricing per serving help users stay within budget while feeding multiple people.

---

## Page 5: Cart Page

<p align="center">
  <img src="/extra/figma/Cart.png"
       alt="FreshRoute Cart Page."
       width="1000" />
</p>

The Cart Page consolidates all selected products and recipes into a structured checkout interface. It is divided into two primary sections:

- **Left Side:** Cart items and quantity controls  
- **Right Side:** Payment details and order summary  

### Cart Structure

The cart clearly separates:

- **Regular Grocery Items**  
- **Recipe Selection (Full Dish)**  
- **Recipe Grocery (Auto-Generated Ingredients)**  

This distinction helps users understand which ingredients were manually selected and which were automatically added from a recipe.

Each cart item includes:

- Product image  
- Product name  
- Price per unit  
- Quantity selector (increment/decrement)  
- Line total  
- Remove (trash) icon  

Quantities update instantly and totals adjust dynamically to support budgeting and transparency.

### Payment & Summary Panel

The right-side checkout panel includes:

- Accepted payment methods (Visa, Mastercard, Apple Pay, etc.)  
- Card details form  
- Subtotal  
- Shipping cost  
- Total (tax included)  
- Prominent “Checkout” button  

The total price is clearly highlighted to reduce friction and improve trust.

### Relation to Key Scenarios

**Weekly Organic Grocery Order**  
Users can review all selected produce and proteins before confirming purchase. Instant total updates help maintain budget control.

**Quick Fresh Purchase**  
Minimal steps between cart review and checkout allow users to complete orders within minutes.

**Recipe-Based Meal Planning**  
Auto-generated ingredients from recipes are grouped logically, ensuring users understand exactly what was added and in what quantities.

---

## Flows 

## Flow 1: Weekly Organic Grocery Order

1. The user lands on the Home Page.
2. The user clicks on Organic in the navigation bar.
3. The user browses organic products using filters or sorting.
4. The user clicks Add to Cart on selected items.
5. The user navigates to the Cart Page using the cart icon.
6. The user reviews quantities and total price.
7. The user proceeds to checkout to complete the order.

## Flow 2: Quick Fresh Purchase

1. The user lands on the Home Page.
2. The user types a product name into the Search Bar.
3. The product list updates to show relevant results.
4. The user adds the item to the cart.
5. The user opens the Cart Page and completes checkout.

## Flow 3: Recipe-Based Meal Planning

1. The user selects Recipes from the navigation bar.
2. The user browses available meal options.
3. The user clicks on a recipe to view details and serving size.
4. The user selects the desired number of servings.
5. The user clicks Add to Cart to add all ingredients automatically.
6. The user navigates to the Cart Page to review total cost and proceed to checkout.