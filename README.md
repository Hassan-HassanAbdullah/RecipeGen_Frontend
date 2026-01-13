# 🍲 Recipe Finder App

A **full-stack web application** built with **Angular (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB (Database)**.  
This app allows users to discover, search, and save recipes. The project is designed as a **Final Year Project** to demonstrate modern web development.

---

## ✨ Features
- 🔑 User authentication (signup & login with JWT)
- 🍳 Add new recipes
- 🍲 Genrate recipe with leftover ingredients
- 🔍 Search recipes by  cuisine, or ingredients
- 📂 Save recipes for later
- 📱 Responsive design (works on mobile & desktop)

⚠️ **Note**: There is **no admin panel** in this project. Only user features are available.

---

## 🛠️ Tech Stack
- **Frontend**: Angular, TypeScript, Tailwind,HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT)

---

## 📂 Folder Structure
```
FYP/
 ├── Client/                     # Angular frontend
```

---

## ⚙️ Prerequisites
Make sure you have installed:
- [Node.js (v16+ recommended)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Angular CLI](https://angular.io/cli)

---

## 🚀 Setup & Installation

### 2. Frontend (Client Setup)
```bash
cd ../Client
npm install  # if there is no nodemodule folder 
ng serve --open
```
Frontend will run on → `http://localhost:4200`

---

## 🗄 Database Setup (GUI Method with MongoDB Compass)

1. **Start MongoDB locally** (or connect to your Atlas cluster).  
2. Open **MongoDB Compass**.  
3. Click **Connect** to your MongoDB server (default: `mongodb://localhost:27017`).  
4. In the left sidebar, click **`+ Create Database`**.  
   - **Database Name**: `recipeFinder`  
   - **Collection Name**: `recipes` (for the first import)  
5. Now select the `recipes` collection.  
   - Click **Collection → Import Data** (top right button).  
   - Choose **`recipeFinder.recipes.json`** from your `FYP` folder.  
   - Select **JSON** as the file type.  
   - Click **Import**.  
6. Repeat the process for the `users` collection:  
   - Create a new collection named `users` inside the `recipeFinder` database.  
   - Import the file **`recipeFinder.users.json`**.  
7. Done ✅  
   Now your `recipeFinder` database has two collections:  
   - `recipes`  
   - `users`  

---

## 🧪 Testing the App
- Open browser → `http://localhost:4200/`
- Create a new user or login with an existing one
- Try searching, adding, and saving recipes
- APIs can also be tested via Postman

---

Backend is an other reposetory  name recipesaverBackend