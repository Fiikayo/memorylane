# Planned coding challenge: Memory lane

**Please avoid initiating pull requests on this repository or forking this repository. To submit your solution, either set up a repository on your own account or forward a zip file to the appropriate contact within our talent team.**

### Problem definition

After a series of discovery calls we found out a problem that our users are facing. They are having a hard time sharing their memories with friends and family. They are using a combination of social media, messaging apps, and email to share their memories. They are also using a combination of cloud storage, social media, and messaging apps to store their memories. They are looking for a solution that allows them to store and share their memories in a single place.

As a first iteration for this solution, we want to build a web application that allows users to create a memory lane and share it with friends and family. A memory lane is a collection of events that happened in a chronological order. Each event consists of a title, a description, a timestamp, and at least one image.

## Deliverables

- Clone this repository and create a new branch with your name. Open a pull request on your own instance of the repository.
- An updated README providing a high level explanation of your implementation.
- Update the API to accommodate for your technical design. Run the API by using `npm run serve:api`.
- The provided mockup is only for reference and inspiration. Feel free to improve it!

## My Solution

**How to Run**
-`npm run serve:api` to start the server
-`npm run dev` to start the react application

1. **State Management:**

   - Manages state variables like `isAddSectionVisible` and `isEditSectionVisible` to control the visibility of sections for adding and editing memories.
   - Keeps track of the memory being edited with `currentMemoryToEdit`.
   - Uses the `useFetchMemories` custom hook to fetch and manage the list of memories, loading state, and potential errors.
   - Uses the `useUploadedMemories` custom hook to upload images to the db. Currently only supports 1 image per memory

2. **User Interface:**

   - Provides sections for adding and editing memories, which are conditionally rendered based on user interactions.
   - Offers a button labeled "+ New Memory" to initiate the process of adding a new memory.

3. **Functionality:**

   - Implements event handlers for actions such as adding, editing, and deleting memories.
   - Enables the user to seamlessly navigate between different memory management sections.

4. **Integration with Memory Components:**

   - Utilizes the `AddMemory` and `EditMemory` components for adding and editing memories, respectively.
   - Renders a list of memories using the `Memories` component, showcasing loading indicators and error messages when necessary.

5. **Backend Changes**
   - Implemented a new endpoint to upload images using `multer`

**Possible Future Changes**

- Ability to share individual memories with their personalized link
- Accessibility is currently very limited
- A more robust validation system on the backend
- User Authentication

In summary, this component orchestrates the main features of the memory application, providing users with a cohesive and intuitive platform for managing their memories. It encompasses state management, user interface elements, and the integration of various memory-related components to deliver a complete user experience.

Screenshots: **Memory Lane with no memories** <img width="1355" alt="Screenshot 2023-11-13 at 1 00 46 PM" src="https://github.com/Fiikayo/memorylane/assets/8403201/7236d8ca-6d18-4819-88e1-8b4a4cffb056">
**Memory Lane with memories** <img width="1222" alt="Screenshot 2023-11-13 at 10 59 10 AM" src="https://github.com/Fiikayo/memorylane/assets/8403201/63183368-a52b-4f04-bc6d-cc862cbe5b88">
**Memory Lane while adding a memory** <img width="1222" alt="Screenshot 2023-11-13 at 12 15 59 PM" src="https://github.com/Fiikayo/memorylane/assets/8403201/d4553e3f-9bd6-45f5-84bd-b18d82157c21">
**Memory Lane while successfully uploading an image** <img width="1219" alt="Screenshot 2023-11-13 at 12 16 19 PM" src="https://github.com/Fiikayo/memorylane/assets/8403201/9ad7923c-dcb4-4471-9a55-f3667649dc15">





