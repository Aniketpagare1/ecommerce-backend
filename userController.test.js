// tests/api.test.js

const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const mongoose = require('mongoose');

describe('API Test Cases', () => {
  let adminToken, userToken;
  let productId, orderId;

  beforeAll(async () => {
    // Connect to the database before running tests
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up the database and close the connection after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  // Admin Authentication and Product Management
  it('should register an admin user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'admin@example.com');
  });

  it('should login the admin user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    adminToken = res.body.token;
  });

  it('should create a product (admin)', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Product 1', description: 'Description', price: 100, category: 'Category 1', stock: 10 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Product 1');
    productId = res.body._id;
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a single product by ID', async () => {
    const res = await request(app).get(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Product 1');
  });

  it('should update a product (admin)', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 150 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('price', 150);
  });

  it('should delete a product (admin)', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Product removed');
  });

  // User Authentication and Order Management
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'user' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    userToken = res.body.token;
  });

  it('should get all products (user view)', async () => {
    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    productId = res.body.length ? res.body[0]._id : null;
  });

  it('should create an order', async () => {
    if (!productId) {
      return console.log('Product ID not present, skipping order creation.');
    }
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 2 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('totalPrice', 300); // Assuming price updated to 150
    orderId = res.body._id;
  });

  it('should get user orders', async () => {
    const res = await request(app)
      .get('/api/orders/myorders')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Admin Order Management
  it('should get all orders (admin)', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update order status (admin)', async () => {
    if (!orderId) {
      return console.log('No orders found to update.');
    }
    const res = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'Shipped' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Order updated');
  });
});
