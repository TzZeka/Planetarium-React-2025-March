
## 🌌 **Project Name: Planetarium ** 🚀

### **Installation**

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TzZeka/Planetarium-React-2025-March

2. **Navigate to the project directory:**
   ```bash
   cd Planetarium-React-2025-March

3. **Install dependencies:**
   ```bash
   npm install

4. **Start the development server:**
   ```bash
   npm run dev

5. **Open the application in your browser:**
- The application should now be running locally on your machine.

 ### **Used Libraries**

The project uses the following key technologies and libraries:
- React: The primary frontend framework.
- Three.js: For rendering 3D graphics and animations.
- react-router: Handles routing within the application.
- Firebase Authentication: Manages login and registration functionalities.
- Firebase Firestore: Database for storing planet data.
- Orbitron Font (Google Fonts): A futuristic font used for sci-fi design.


### **Features**
1. Authentication:
- Registration of new users.
- Login with email and password.
- Logout functionality.

2. Routing:
- Centralized route management in AppRoutes.
- Protected routes handled via ProtectedRoute.

3. Styling:
- Cosmic sci-fi design with neon gradients and futuristic fonts.

4. Accessibility:
- Added autocomplete attributes for form inputs.=
- Enhanced user experience through better accessibility practices.

5. 3D Rendering:
- Utilizes Three.js for rendering 3D planets.
- Animated planets and stars with realistic lighting effects.


### **Project Structure** 
The project structure is as follows for now:
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   ├── CreateEditDelete/
│   │   ├── Create.jsx
│   │   ├── Edit.jsx
│   │   ├── Delete.jsx
│   ├── Background/
│   │   ├── StarryBackground.jsx
│   ├── Favourites/
│   │   ├── Favourites.jsx
│   ├── Header/
│       ├── Header.jsx
├── contexts/
│   ├── AuthContext.js
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   ├── About/
│   │   ├── About.jsx
│   ├── Contacts/
│       ├── Contacts.jsx
├── routes/
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
├── App.css
├── App.jsx

### **Future Features**

1. Like Functionality: 
- Allow users to like content (e.g., planets or other objects).
2. Favourites Functionality: 
- Create a section for saving favorite planets or objects for quicker access.
3. Create, Edit, and Delete Functionality: 
- Enable users to add, edit, and delete content in their profiles (e.g., notes on planets or galaxies).
4. User Profile Page: 
- Develop a user profile page with information, including avatar upload, settings, and activity history.
5. Adding Animations: 
- Introduce more interactive sci-fi effects for an engaging interface.
6. Integration with Space APIs: 
- Fetch real-world data about planets, stars, and galaxies.