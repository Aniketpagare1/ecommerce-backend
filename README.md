
# 📦 E-commerce Backend API

## Project Overview

This project is a backend API for an e-commerce website. It provides functionality for **user authentication**, **product management**, and **order processing**. Users can register, log in, browse products, and place orders, while admins have additional privileges to manage products and update orders.

---

## 🛠️ Features

- **User Authentication**: JWT-based registration and login with bcrypt password hashing.
- **Role-based Access**: Admins can manage products, while regular users can only view products and place orders.
- **Products API**: Admins can create, update, and delete products. All users can view available products.
- **Orders API**: Users can place orders for products. Admins can manage and update order status.
- **MongoDB**: Stores user, product, and order data.

---

## 📂 Project Structure

```txt
ecommerce-backend/
│
├── config/
│   └── db.js            # MongoDB connection setup
├── controllers/
│   └── authController.js # Handles user authentication logic
│   └── productController.js # Handles product CRUD logic
│   └── orderController.js   # Handles order logic
├── middlewares/
│   └── authMiddleware.js # JWT-based role validation
├── models/
│   └── userModel.js      # User schema with Mongoose
│   └── productModel.js   # Product schema with Mongoose
│   └── orderModel.js     # Order schema with Mongoose
├── routes/
│   └── authRoutes.js     # Authentication routes (register/login)
│   └── productRoutes.js  # Product CRUD routes
│   └── orderRoutes.js    # Order management routes
├── .env                  # Environment variables (JWT secret, DB URL)
├── app.js                # Main server file
├── package.json          # Project dependencies and scripts
└── README.md             # Instructions (this file)
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Install Dependencies

Install all required Node.js dependencies by running:

```bash
npm install
```

### 3. Configure Environment Variables

Create a **`.env`** file in the root of your project. Add the following environment variables:

```txt
MONGO_URI=mongodb://localhost:27017/ecommerce  # or your MongoDB Atlas connection string
JWT_SECRET=your_jwt_secret_key
```

- Replace **`your_jwt_secret_key`** with a strong random secret for JWT token signing.


This will insert sample **admin**, **user**, and **product** data into your MongoDB.

### 4. Start the Server

Run the server using:

```bash
npm run start
```

You should see output indicating the server is running on port **5000**:

```
MongoDB connected: localhost
Server running on port 5000
```

---

## 🛠️ API Endpoints

### **User Authentication**

1. **Register** - `POST /api/auth/register`
   - Register a new user (or admin).
   - **Body** (JSON):
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "user"  // or "admin"
     }
     ```

2. **Login** - `POST /api/auth/login`
   - Log in to get a JWT token.
   - **Body** (JSON):
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```

### **Product Management (Admin Only)**

1. **Create Product** - `POST /api/products`
   - Requires admin JWT token.
   - **Body** (JSON):
     ```json
     {
       "name": "Product 1",
       "description": "This is a product description",
       "price": 29.99,
       "category": "Electronics",
       "stock": 50
     }
     ```

2. **Get All Products** - `GET /api/products`
   - Public route, accessible by all users.

### **Order Management**

1. **Place Order** - `POST /api/orders`
   - Requires user JWT token.
   - **Body** (JSON):
     ```json
     {
       "productId": "601c7e0c9f1f88471c82895b",
       "quantity": 2
     }
     ```

2. **Get User Orders** - `GET /api/orders/myorders`
   - Requires user JWT token.

---

## 🔑 Authentication and Authorization

This API uses **JWT (JSON Web Tokens)** for securing routes. When logging in, you’ll receive a **token** in the response. Use this token to access protected routes by passing it in the **Authorization** header.

- **JWT Token Example**:
  ```txt
  Authorization: Bearer your_jwt_token_here
  ```

---


