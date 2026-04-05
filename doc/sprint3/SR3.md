Notes
- A minimum of 30% of all commits were completed during Week 01 (March 23rd – March 30th), with the remaining commits completed in Week 02 (March 30 - April 6th), demonstrating consistent progress across the sprint timeline.

- Branches were named after their primary ticket, with supporting branches opened only when parallel work was needed: see the detailed tables for branch naming and workload distribution in [distribution_naming.md](./distribution_naming.md).

Summary of Active Branches
- Cart and address updates (PB-05, PB-06, PB-09, PB-10) - Shoumik - `features/cart`
- Product filters (PB-03) - Abrar - `refactor/filter`
- Recipe ingredient scaling (PB-08) - Abrar - `features/recipes-add`
- Backend integrations (span multiple stories) - Ekam/Judy/Moneba - `features/organic-integration-backend`, `features/ethicallyraised-integration-backend`, `features/recipes-integration-backend`

# Sprint 2 Retrospective (SR2)

## Participants (Everyone was present in all meetings! )

| Name                     | Role 1     | Role 2     | Role 3     | Role 4     |
|--------------------------|------------|------------|------------|------------|
| Shoumik Ahmed            | Fullstack Developer | QA Tester | Database Administrator | System Integration Engineer |
| Moneba Hanifi            | Backend Developer | Database Administrator | QA Tester | System Integration Engineer |
| Judy El Ghargomi         | Backend Developer | Database Administrator | QA Tester     | System Integration Engineer |
| Ekambir Momi             | Backend/DevOps Developer | UI/UX Designer | Data Model Designer | System Integration Engineer |
| Abrar Jawad Tarafder     | Fullstack Developer | UI/UX Designer | Sprint Coordinator | UI Refactoring Supervisor |

## Unfinished Work
- Spike 2: MongoDB Image Storage and Retrieval (partially completed)
    - We successfully integrated mongoDB for product data and implemented API endpoints that return product information to the frontend.
We had originally had planned to store the images directly in mongoDB.
    - However, during implementation, we discovered that this would cost money or require us to use another server.
    - As a result, we made a design decision to temporarily hardcode the images in the front end using local imports. These images are then merged with backend data during rendering and in sprint 3 we aim to store the urls of the images that will dynamically pull from the repository that will store the images.
    - We prioritized delivering a working system within the sprint timeline. This approach allowed us to meet functional requirements quickly and ensure that the UI displays correctly.
    - However, this is not a fully dynamic image storage solution and makes future updates less flexible.
    - Plan for Improvement (Sprint 3):
        - Investigate alternative approaches such as:
        - Storing image URLs in MongoDB (instead of raw images)
        - Using free-tier cloud storage solutions (e.g., Firebase Storage, AWS S3 free tier, Cloudinary)
        - Refactor backend to return image URLs dynamically
        - Update frontend to fully rely on backend-provided image data
- All other tasks were completed as expected, so we will continue with the tasks as needed for Sprint 3.
- **Sprint 3 User Stories will be 11,12,13,14,15,16,20**
- PB.md is updated with all of the work finished during Sprint 2 and is under the Sprint 3 folder, the file is called PBpostSprint2.md
 
## Practices to Continue
- Pair programming for integration tasks: helped us resolve integration problems more quickly, allowed us to share knowledge more easily so that expertise was not limited to a single team member, and reduced any miscommunication by allowing team members to collaborate and clarify code in real time.
- Weekly standups with clear next-24h commitments: helped us maintain clear communication and expectations about task progress and discuss any issues we ran into. Regular meetings also helped us adjust responsibilities quickly when someone was overwhelmed.
- Keeping Trello/backlog items mirrored in repository docs to avoid losing history even when trello tools changed or became unavailable.
- Creating subtasks to evenly distribute workload amongst team members, ensuring all members contribute evenly and stay within expected workload limits.
-  Mid-sprint checkpoints for integration-heavy tasks. We had 4 sprint meetings, and continuously kept in touch about integration tasks, which allowed us to discover and solve issues early on. 
- Creating more branches for user stories allowed us to track changes more easily which helped improve collaboration and reduce merge conflicts.
## Practices to Start
- Researching technical constraints of the tools we’re using (e.g., cost, scalability) earlier during spikes to avoid mid-sprint design changes. This will help us get a better sense of how long a task will take and if it’s achievable during the sprint. 
- Implementing more error handling cases. Currently our failures are often handled by defaulting to empty data because these errors are only caused by products not being available for now. While we didn’t run into any major debugging issues this sprint, logging errors a little more clearly, providing meaningful error messages, and avoiding silent failures can help improve debugging in the future.
- Begin testing earlier in the sprint: most of our testing occurred near the end of the sprint, which was more stressful and did not give us a lot of time to fix any identified issues. Although we didn’t run into any major issues this sprint, testing new features incrementally as they are developed can help prevent any issues in the future. 
- Improve separation of concerns between frontend and backend. Because we had to hardcode the image retrieval in the front end, there’s tight coupling between the frontend and data layer. Reducing reliance on hardcoded frontend values should help improve this and make the system more flexible and maintainable. 

## Practices to Stop
- Leaving backend–frontend wiring until the very last days of the sprint. Although the integration succeeded, this created unnecessary time pressure and increased the risk of bugs.
- Setting sprint goals that rely heavily on technical tools we’re using without checking if using certain features requires additional costs or other services. We assumed  that we’d be able to store images on mongoDB which was not the case. This led to a mid-sprint change in our approach to this goal, highlighting a gap in our planning process. 
 - Using silent failures, which masks the root cause of issues. While this prevented application crashes and did not cause any issues this sprint, it makes it harder for us to debug more complex issues in the future. 
## Team Collaboration Reflection
- Our team maintained strong communication throughout the sprint. Regular standup meetings and informal discussions allowed us to quickly coordinate work and help each other with any issues.
- All team members contributed to development and discussions, which helped maintain steady progress toward sprint goals.
- Roles were assigned according to individual strengths. Cross-role collaboration increased in this sprint due to integration.
- Tasks will continue to be distributed more equally to make sure everyone meets and does not exceed expected workload limits.
- Maintaining open communication will remain a priority in future sprints.
- Going forward, the project discord server should be utilized more for communication. 
 
## Best/Worst Experiences in Sprint 1
- **Best Experience in Sprint 1:** Pair programming sessions that allowed us to complete Integration quickly. Successfully integrating backend and frontend allowed us to see full-stack functionality for the first time. In-person standup meetings were also helpful in fostering collaboration amongst team members and keeping everyone aligned on sprint goals.
- **Worst Experience in Sprint 1:** Discovering mid-sprint that MongoDB image storage required payment, which forced us to pivot to a hardcoded frontend approach. This created a gap between our intended scalable design and the implemented solution.

