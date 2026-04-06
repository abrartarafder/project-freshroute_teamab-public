Notes
- A minimum of 30% of all commits were completed during Week 01 (March 23rd – March 30th), with the remaining commits completed in Week 02 (March 30 - April 6th), demonstrating consistent progress across the sprint timeline.

- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

Summary of Active Branches
- Place Order, Confirm Order, and Error Handling (PB-12, PB-13, PB-11, PB-20) - Abrar - features/order-confirmation
- Track Order Status and View Details (PB-14, PB-15, PB-16, PB-20) - Shoumik - features/order-details-tracker
- Image Integration and Backend Tracking (Subtasks #4, #5, #6) - Moneba/Ekam/Judy - `T61-features/recipes-tracking-backend` , `T62-features/organic-tracking-backend`, `T63-features/ethicallyraised-tracking-backend`



# Sprint 3 Retrospective (SR3)

## Participants (Everyone was present in all meetings!)

| Name                     | Role 1     | Role 2     | Role 3     | Role 4     |
|--------------------------|------------|------------|------------|------------|
| Shoumik Ahmed            | Fullstack Developer | QA Tester | Database Administrator | System Integration Engineer |
| Moneba Hanifi            | Backend Developer | Database Administrator | QA Tester | System Integration Engineer |
| Judy El Ghargomi         | Backend Developer | Database Administrator | QA Tester     | System Integration Engineer |
| Ekambir Momi             | Backend/DevOps Developer | UI/UX Designer | Data Model Designer | System Integration Engineer |
| Abrar Jawad Tarafder     | Fullstack Developer | UI/UX Designer | Sprint Coordinator | UI Refactoring Supervisor |

## We had No Unfinished Work!!
- **Sprint 3 User Stories were 11,12,13,14,15,16,20 which were all completed, and the project is complete. **
- PB.md is updated with all of the work finished during Sprint 2 and is under the sprint3 folder - the file is called PB_Updated_S3.md. The completed Product Backlog after Sprint 3 is called PB_EndOfSprint3.md and is under the Sprint3End folder. 
- Note: We successfully integrated MongoDB for product data and implemented API endpoints that return product information to the frontend.
    - We had originally planned to store the images directly in MongoDB. However, during implementation, we discovered that this would cost money or require us to use another server. As a result, we made a design decision to temporarily hardcode the images in the front end using local imports for Sprint 2. These images were then merged with backend data during rendering, and in sprint 3, we finished storing the images with image URLs that dynamically pull from the public repository that hosts them. 
    - We prioritized delivering a working system within the sprint 3 timeline. This approach allowed us to meet functional requirements quickly and ensure that the UI displays correctly and is functional.
    - We do realize, however, that having images in the public repository is not a fully dynamic image storage solution for a full-scale project. If this project were to continue, we would consider alternative approaches, like moving to a paid plan, to make future updates even more flexible.
    - Plan for Improvement (After Sprint 3 and Post Sprint if Project Continues):
    - Investigate alternative approaches such as:
        - Using free-tier cloud storage solutions (e.g., Firebase Storage, AWS S3 free tier, Cloudinary)
        - Using the paid version of MongoDB which supports image storage. 

## Practices to Continue (if the project were to continue)
- Pair programming for integration tasks: helped us resolve integration problems more quickly, allowed us to share knowledge more easily so that expertise was not limited to a single team member, and reduced any miscommunication by allowing team members to collaborate and clarify code in real time.

- Clear task distribution and documentation: tasks were discussed and distributed during standup meetings, progress was tracked in the trello, which clearly communicated expectations and progress. The Trello backlog was updated periodically to mirror the Trello and avoid losing history. 

- Creating subtasks to evenly distribute workload amongst team members, ensuring all members contribute evenly and stay within expected workload limits.

-  Mid-sprint checkpoints for integration-heavy tasks. We kept in touch continuously about integration tasks, which allowed us to identify and resolve issues early on. 

- Creating branches tied to specific user stories allowed us to track changes more easily, which helped improve organization, collaboration and reduce merge conflicts.

- Researching technical constraints of the tools we’re using earlier during spikes to set realistic goals for the sprint. 

- Implementing more error handling cases and beginning testing earlier in the sprint to ensure correctness of our code. 

- Adhering to design principles like separation of concerns between frontend and backend to reduce tight coupling, etc. 

## Practices to Start (if the project were to continue)
- Allocating time for feature improvement and refinement. While we met all our goals this sprint, most of our development focused on completing features, leaving little time to improve and polish our work. 
Further developing the admin view. We introduced an initial admin view that allows administrators to view all orders placed. Adding more features that would support administrative tasks like filtering and searching orders, updating order statuses, etc. 

## Practices to Stop (if the project were to continue)
- Addressing UI and UX improvements at the end of the sprint. While this ensured that core functionality was completed, it limited the time available to refine usability and UI. This resulted in some features, like the admin view, being functional but not fully optimized (ideally a user-separated view would have been built). 

## Team Collaboration Reflection
- Our team maintained strong communication throughout the sprint. Regular standup meetings and informal discussions allowed us to quickly coordinate work and help each other with any issues.
- All team members contributed to development and discussions, which helped maintain steady progress toward sprint goals.
- Roles were assigned according to individual strengths. Cross-role collaboration increased in this sprint due to integration.
- Tasks were distributed equally and everyone did not exceed expected workload limits.
- The project Discord was utilized more for discussion this week. 
- Going forward, maintaining open communication will remain a priority. 
 
## Best/Worst Experiences in Sprint 3
- **Best Experience in Sprint 3:** Successfully implementing the full order workflow (cart → confirmation → tracking), as well as all other consumer functionalities, was a major achievement. Also, solving the issue with backend image integration, reducing reliance on hard-coded data, was rewarding because it demonstrated problem-solving and the application of concepts learned in class. In-person standup meetings were also helpful in fostering collaboration amongst team members and keeping everyone aligned on sprint goals.

- **Worst Experience in Sprint 3:** Managing multiple interconnected features (order placement, tracking, confirmation, etc) was a complex process, especially when it came to debugging, since it required additional coordination and took more time. This highlighted the importance of clear communication and incremental testing at each stage of development. 

