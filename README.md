
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
git clone https://github.com/Aniketpagare1/ecommerce-backend.git
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
MONGO_URI=mongodb://localhost:27017/ecommerce  
JWT_SECRET=your_jwt_secret_key
```

Here’s a set of test cases formatted for your GitHub README file. You can run these in Postman to test your API endpoints.

### API Test Cases

#### User Authentication

1. **Register a New User**
   - **Endpoint**: `POST /api/auth/register`
   - **Request Body**:
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password",
       "role": "user"
     }
     ```
   - **Expected Response**: 
     - Status: `201 Created`
     - Body: 
     ```json
     {
       "_id": "userId",
       "email": "test@example.com"
     }
     ```

2. **Login User**
   - **Endpoint**: `POST /api/auth/login`
   - **Request Body**:
     ```json
     {
       "email": "test@example.com",
       "password": "password"
     }
     ```
   - **Expected Response**:
     - Status: `200 OK`
     - Body:
     ```json
     {
       "token": "jwtToken"
     }
     ```

3. **Register an Admin User**
   - **Endpoint**: `POST /api/auth/register`
   - **Request Body**:
     ```json
     {
       "name": "Admin User",
       "email": "admin@example.com",
       "password": "password",
       "role": "admin"
     }
     ```
   - **Expected Response**: 
     - Status: `201 Created`
     - Body:
     ```json
     {
       "_id": "adminId",
       "email": "admin@example.com"
     }
     ```

4. **Login Admin User**
   - **Endpoint**: `POST /api/auth/login`
   - **Request Body**:
     ```json
     {
       "email": "admin@example.com",
       "password": "password"
     }
     ```
   - **Expected Response**:
     - Status: `200 OK`
     - Body:
     ```json
     {
       "token": "adminJwtToken"
     }
     ```

---

#### Products API

5. **Create a Product (Admin)**
   - **Endpoint**: `POST /api/products`
   - **Headers**: 
     - `Authorization: Bearer adminJwtToken`
   - **Request Body**:
     ```json
     {
       "name": "Product 1",
       "description": "Description",
       "price": 100,
       "category": "Category 1",
       "stock": 10
     }
     ```
   - **Expected Response**: 
     - Status: `201 Created`
     - Body: 
     ```json
     {
       "_id": "productId",
       "name": "Product 1"
     }
     ```

6. **Get All Products**
   - **Endpoint**: `GET /api/products`
   - **Expected Response**: 
     - Status: `200 OK`
     - Body: 
     ```json
     [
       {
         "_id": "productId",
         "name": "Product 1"
       }
     ]
     ```

7. **Get a Single Product by ID**
   - **Endpoint**: `GET /api/products/:id`
   - **URL Params**: 
     - `id`: `productId`
   - **Expected Response**: 
     - Status: `200 OK`
     - Body: 
     ```json
     {
       "_id": "productId",
       "name": "Product 1"
     }
     ```

8. **Update a Product (Admin)**
   - **Endpoint**: `PUT /api/products/:id`
   - **Headers**: 
     - `Authorization: Bearer adminJwtToken`
   - **URL Params**: 
     - `id`: `productId`
   - **Request Body**:
     ```json
     {
       "price": 150
     }
     ```
   - **Expected Response**: 
     - Status: `200 OK`
     - Body: 
     ```json
     {
       "_id": "productId",
       "price": 150
     }
     ```

9. **Delete a Product (Admin)**
   - **Endpoint**: `DELETE /api/products/:id`
   - **Headers**: 
     - `Authorization: Bearer adminJwtToken`
   - **URL Params**: 
     - `id`: `productId`
   - **Expected Response**: 
     - Status: `200 OK`
     - Body: 
     ```json
     {
       "message": "Product removed"
     }
     ```

---

#### Orders API

10. **Create an Order**
    - **Endpoint**: `POST /api/orders`
    - **Headers**: 
      - `Authorization: Bearer userJwtToken`
    - **Request Body**:
      ```json
      {
        "productId": "productId",
        "quantity": 2
      }
      ```
    - **Expected Response**: 
      - Status: `201 Created`
      - Body: 
      ```json
      {
        "totalPrice": 200,
        "_id": "orderId"
      }
      ```

11. **Get User Orders**
    - **Endpoint**: `GET /api/orders/myorders`
    - **Headers**: 
      - `Authorization: Bearer userJwtToken`
    - **Expected Response**: 
      - Status: `200 OK`
      - Body: 
      ```json
      [
        {
          "_id": "orderId",
          "totalPrice": 200
        }
      ]
      ```

12. **Get All Orders (Admin)**
    - **Endpoint**: `GET /api/orders`
    - **Headers**: 
      - `Authorization: Bearer adminJwtToken`
    - **Expected Response**: 
      - Status: `200 OK`
      - Body: 
      ```json
      [
        {
          "_id": "orderId",
          "totalPrice": 200
        }
      ]
      ```

13. **Update Order Status (Admin)**
    - **Endpoint**: `PUT /api/orders/:id`
    - **Headers**: 
      - `Authorization: Bearer adminJwtToken`
    - **URL Params**: 
      - `id`: `orderId`
    - **Request Body**:
      ```json
      {
        "status": "Shipped"
      }
      ```
    - **Expected Response**: 
      - Status: `200 OK`
      - Body: 
      ```json
      {
        "message": "Order updated"
      }
      ```

---

### Notes
- Replace `adminJwtToken`, `userJwtToken`, `productId`, and `orderId` with the actual tokens and IDs you receive from your requests.
- Use Postman to send these requests and verify that the responses match the expected output.



