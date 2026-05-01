# 🚀 Task Manager API

A simple and scalable **Task Manager Backend API** built using **Node.js, Express, and MongoDB**, deployed on **Railway**.

---

## 📌 Features

* 🔐 User Authentication (Signup & Login)
* 🔑 Password Hashing using bcrypt
* 🎟 JWT-based Authentication
* 🗂 Task Management (Create, Read, Update, Delete)
* 🌐 RESTful API
* ☁️ Deployed on Railway

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcrypt
* Railway (Deployment)

---

## 🌍 Live API

👉 https://task-manager-production-ed0d.up.railway.app

---

## 📂 API Endpoints

### 🔐 Auth Routes

#### ➤ Signup

POST /api/auth/signup

```json
{
  "name": "test",
  "email": "test@gmail.com",
  "password": "123456"
}
```

#### ➤ Login

POST /api/auth/login

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## ⚙️ Installation (Local Setup)

1. Clone the repository

```
git clone https://github.com/kaushalgangwar2005/task-manager.git
```

2. Install dependencies

```
npm install
```

3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server

```
npm run dev
```

---

## 🔐 Security

* Passwords are hashed using bcrypt
* Sensitive data like password is not returned in API response
* JWT used for authentication

---

## 📸 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 📌 Future Improvements

* Task CRUD APIs (if not added)
* Role-based authentication
* Frontend integration (React)
* Pagination & Filtering

