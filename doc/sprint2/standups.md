 - Team updates are done during the standup meetings and noted by Abrar at the end of each sprint within FreshRoute's #standup channel. Every single person is responsible for speaking about their own updates that are high quality and detailed updates. 

## [2026-03-13] - Sprint #2 Standup #1

**1. What did you work on since the last standup?**

- Abrar: We finished up all of the tasks for Sprint 1 and submitted the Sprint 1 deliverables. For Sprint 2, I finished setting things up and worked on the Trello Backlog and Product Backlog. 

- Shoumik: We finished up all of the tasks for Sprint 1 and submitted the Sprint 1 deliverables. For Sprint 2, I started working on the UI for the cart page. 

- Ekam: We finished up all of the tasks for Sprint 1 and submitted the Sprint 1 deliverables. For Sprint 2, I started working on researching integration methods for the backend to the frontend for the Organic page. I will work on the documentation as needed as well. 

- Moneba: We finished up all of the tasks for Sprint 1 and submitted the Sprint 1 deliverables. For Sprint 2, I started working on researching integration methods for the backend to the frontend for the Recipes page.

- Judy: We finished up all of the tasks for Sprint 1 and submitted the Sprint 1 deliverables. For Sprint 2, I started working on researching integration methods for the backend to the frontend for the Ethically Raised page. 

**2. What do you commit to next?**

- Abrar: For Sprint 2, I will continue working on integrating the Recipe quantity and assist Shoumik with the cart UI as needed. Documentation will be completed on a rolling basis amongst team members. 

- Shoumik: For Sprint 2, I will continue working on integrating the Cart page with the address form and payment form. Documentation will be completed on a rolling basis amongst team members. 

- Ekam: For Sprint 2, I will continue working on researching integration methods for the backend to the frontend for the Organic page. I will work on the documentation as needed as well. Documentation will be completed on a rolling basis amongst team members. 

- Moneba: For Sprint 2, I will continue working on researching integration methods for the backend to the frontend for the Recipes page. I will also work on checking the Product Backlog that was pushed by Abrar. Documentation will be completed on a rolling basis amongst team members. 

- Judy: For Sprint 2, I will continue working on researching integration methods for the backend to the frontend for the Ethically Raised page. I will also work on checking the Trello Backlog that was pushed by Abrar. Documentation will be completed on a rolling basis amongst team members. 

**3. When do you think you'll be done?**

- Abrar: I think that I will be done by the beginning of Sprint 2 Standup #3. 

- Shoumik: I think that I will be done by the beginning of Sprint 2 Standup #3. 

- Ekam: I think that I will be done by the beginning of Sprint 2 Standup #3.

- Moneba: I think that I will be done by the beginning of Sprint 2 Standup #3.

- Judy: I think that I will be done by the beginning of Sprint 2 Standup #3.

**4. Do you have any blockers?**

- Abrar: No blockers as of yet. 

- Shoumik: No blockers as of yet, but I'm keeping an eye on the Cart UI edge cases (promo codes, empty carts) in case they expose layout bugs once backend data flows through. 

- Ekam: No blockers as of yet. The only mild watch item is confirming how our API layer will pass image URLs so I can size the Organic cards correctly without rework. 

- Moneba: No blockers as of yet, though I'm tracking how nested recipe collections will be modeled so I don't paint us into a schema corner. 

- Judy: No blockers as of yet. I'm just monitoring whether the Ethically Raised filters will require additional backend fields beyond what's already in Trello. 

## [2026-03-15] - Sprint #2 Standup #2

**1. What did you work on since the last standup?**

- Abrar: I finished up integrating the Recipe quantity and assisted Shoumik with the cart UI as needed. I also cleaned the Trello Board based on the Sprint 1 feedback to ensure everything is consistent. Documentation is completed on a rolling basis amongst team members.   

- Shoumik: I finished up integrating the Cart page with the address form and payment form and then I pushed my code to Main and let Abrar make all the pages look consistent and implement his recipe quantity functionality. Documentation is completed on a rolling basis amongst team members. 

- Ekam: I researched integration methods for the backend to the frontend for the Organic page and the collection linking for recipes as well as how MongoDB might store images. I also am working on the documentation for this sprint. Documentation is completed on a rolling basis amongst team members. 

- Moneba: I researched integration methods for the backend to the frontend for the Organic page. I completed checking the Product Backlog that was pushed by Abrar. Documentation is completed on a rolling basis amongst team members. 

- Judy: I researched integration methods for the backend to the frontend for the Ethically Raised page. I completed checking the Trello Backlog that was pushed by Abrar. Documentation is completed on a rolling basis amongst team members. 

**2. What do you commit to next?**

- Abrar: I will assist the backend team with integrating the backend product items into the frontend and help with any styling and format issues as needed. 

- Shoumik: I will assist the backend team with integrating the backend product items into the frontend and help with any connection issues as needed. 

- Ekam: This is where my main part of the Sprint begins and I will work on integrating the Organic items that I have put into the database and integrate them so that they show up and update in real time in the frontend. 

- Moneba: This is where my main part of the Sprint begins and I will work on integrating the Recipes items that I have put into the database and integrate them so that they show up and update in real time in the frontend. This might be a bit challenging since recipes might have collections within collections. 

- Judy: This is where my main part of the Sprint begins and I will work on integrating the Ethically Raised items that I have put into the database and integrate them so that they show up and update in real time in the frontend. 

**3. When do you think you'll be done?**

- Abrar: I think that I will be done by the beginning of Sprint 2 Standup #4. 

- Shoumik: I think that I will be done by the beginning of Sprint 2 Standup #4. 

- Ekam: I think that I will be done by the beginning of Sprint 2 Standup #4.

- Moneba: I think that I will be done by the beginning of Sprint 2 Standup #4.

- Judy: I think that I will be done by the beginning of Sprint 2 Standup #4.

**4. Do you have any blockers?**

- Abrar: As of right now, I do not have any blockers. 

- Shoumik: A potential blocker that I will discuss with the backend team will be how to actually figure out the itegration of the backend items from the database so it shows up on the frontend, especially wiring the cart totals to update live as quantities change. 

- Ekam: A potential blocker that I will discuss with the backend team will be how to implement the images in the backend and have them be reflected in the frontend, since we need a consistent CDN path or they may fail to render on the Organic page. 

- Moneba: As of right now, I do not have any blockers, but I am watching for possible mismatches between the recipe ingredient structure and how the UI loops through nested data. 

- Judy: As of right now, I do not have any blockers. The only caveat is confirming that the Ethically Raised filters match the exact field names in the database so the queries don't break. 

## [2026-03-17] - Sprint #2 Standup #3

**1. What did you work on since the last standup?**

- Abrar: I have started to work on assisting the backend team with integrating the backend product items into the frontend and help with any styling and format issues as needed. Documentation is completed on a rolling basis amongst team members.   

- Shoumik: I have started to work on assisting the backend team with integrating the backend product items into the frontend and help with any connection issues as needed and have looked into issues we might have potentially for integration. Documentation is completed on a rolling basis amongst team members.   

- Ekam: The main part of my Sprint has began and I have been working on integrating the Organic items that I have put into the database and integrate them so that they show up and update in real time in the frontend. Documentation is completed on a rolling basis amongst team members.   

- Moneba: The main part of my Sprint has began and I have been working on integrating the Recipes items that I have put into the database and integrate them so that they show up and update in real time in the frontend. This is still seeming to be a bit challenging since recipes might have collections within collections. Documentation is completed on a rolling basis amongst team members.   

- Judy: The main part of my Sprint has began and I have been working on integrating the Ethically Raised items that I have put into the database and integrate them so that they show up and update in real time in the frontend. Documentation is completed on a rolling basis amongst team members.   

**2. What do you commit to next?**

- Abrar: I aim to complete assisting the backend team with integrating the backend product items into the frontend and help with any styling and format issues as needed. 

- Shoumik: I aim to complete assisting the backend team with integrating the backend product items into the frontend and help with any connection issues as needed and have looked into issues we might have potentially for integration. 

- Ekam: I aim to complete integrating the Organic items that I have put into the database and integrate them so that they show up and update in real time in the frontend. 

- Moneba: I aim to complete integrating the Recipes items that I have put into the database and integrate them so that they show up and update in real time in the frontend. This is still seeming to be a bit challenging since recipes might have collections within collections. 

- Judy: I am to complete integrating the Ethically Raised items that I have put into the database and integrate them so that they show up and update in real time in the frontend. 

**3. When do you think you'll be done?**

- Abrar: There is a bigger gap between today's standup and our next standup so I think that my part should definitely be done by the beginning of Sprint 2 Standup #4. 

- Shoumik: There is a bigger gap between today's standup and our next standup so I think that my part should definitely be done by the beginning of Sprint 2 Standup #4. 

- Ekam: The actual figuring out integration between the Backend and Frontend for the Organic page should easily be completely before the start of Sprint 2 Standup #4. The only potential thing that may take longer is fetching that data. 

- Moneba: The actual figuring out integration between the Backend and Frontend for the Recipes page should easily be completely before the start of Sprint 2 Standup #4. The only potential thing that may take longer is fetching that data. 

- Judy: The actual figuring out integration between the Backend and Frontend for the Ethically Raised page should easily be completely before the start of Sprint 2 Standup #4. The only potential thing that may take longer is fetching that data. 

**4. Do you have any blockers?**

- Abrar: As of right now, I do not have any blockers. 

- Shoumik: A potential blocker that I will discuss with the backend team will be how to actually figure out the itegration of the backend items from the database so it shows up on the frontend, including ensuring cart totals react to backend price changes without a full page refresh. 

- Ekam: A potential blocker that I will discuss with the backend team will be how to implement the images in the backend and have them be reflected in the frontend, particularly choosing between base64 blobs and hosted URLs so render speed stays acceptable. 

- Moneba: As of right now, I do not have any blockers, but I'm keeping an eye on how we paginate or load recipe collections so the page doesn't stall when the dataset grows. 

- Judy: As of right now, I do not have any blockers, aside from validating that the Ethically Raised filters won't need extra enums in the schema that could slow down the current integration. 

## [2026-03-21] - Sprint #2 Standup #4

**1. What did you work on since the last standup?**

- Abrar: 
- Shoumik:
- Ekam: 
- Moneba: 
- Judy: 

**2. What do you commit to next?**

- Abrar: 
- Shoumik:
- Ekam: 
- Moneba: 
- Judy: 

**3. When do you think you'll be done?**

- Abrar: 
- Shoumik:
- Ekam: 
- Moneba: 
- Judy: 

**4. Do you have any blockers?**

- Abrar: 
- Shoumik:
- Ekam: 
- Moneba: 
- Judy: 
