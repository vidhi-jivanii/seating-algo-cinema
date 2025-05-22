const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require('../controllers/authController');
const { User } = require('../mongoUtil');

const app = express();

app.use(express.json());
app.use(session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
}));

app.post('/register', authRoutes.register);
app.post('/login', authRoutes.login);
app.post('/logout', authRoutes.logout);

// Setup a test database
beforeAll(async () => {
    const uri = "mongodb://127.0.0.1:27017/seatingAppTest";
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await User.deleteMany(); // Clean slate
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Auth API Tests', () => {

    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'test123'
    };

    test('Should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send(testUser);

        expect(res.body.message).toBe("User successfully registered");
    });

    test('Should not register duplicate user', async () => {
        const res = await request(app)
            .post('/register')
            .send(testUser);

        expect(res.body.message).toBe("User already exists");
    });

    test('Should sign in with correct credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: testUser.password });

        expect(res.body.user).toBe(testUser.username);
    });

    test('Should reject wrong credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: "wrongpass" });

        expect(res.body.message).toBe("Invalid user or password");
    });

    test('Should logout successfully', async () => {
        const res = await request(app)
            .post('/logout');

        expect(res.body.message).toBe("Logout successful");
    });

});
