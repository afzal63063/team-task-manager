# 🚀 Team Task Manager (Full-Stack)

A full-stack web application that allows teams to manage projects, assign tasks, and track progress with role-based access.

---

## 🌐 Live Demo

🔗 (Add your Railway deployed link here)

---

## 📂 GitHub Repository

🔗 (Add your GitHub repo link here)

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* Secure JWT-based authentication

### 📁 Project Management

* Create new projects
* View all projects
* Delete projects

### 📋 Task Management

* Create tasks
* Assign tasks to users
* Link tasks to projects
* Update task status (Pending / In Progress / Done)
* Delete tasks

### 📊 Dashboard

* Total tasks count
* Overdue tasks tracking
* Clean UI with structured sections

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Installation & Setup



---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📌 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`
* GET `/api/auth/users`

### Projects

* POST `/api/projects`
* GET `/api/projects`
* DELETE `/api/projects/:id`

### Tasks

* POST `/api/tasks`
* GET `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

---

## 📈 Improvements (Future Scope)

* Role-based access control (Admin/Member restrictions)
* Task filtering & search
* Notifications for overdue tasks
* UI enhancements

---

## 👨‍💻 Author

Afzal Khan



