const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/seatingApp";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const { User } = require('../mongoUtil');

// Register function
async function register(username, email, password) {
    const user = new User({
        username: username,
        email: email,
        password: password,
        booking: []
    });

    try {
        const foundUser = await User.findOne({ username: username });
        if (foundUser) {
            return false;
        } else {
            await user.save();
            return true;
        }
    } catch (error) {
        console.error('Error checking user:', error);
        return false;
    }
}

// Sign-in function
async function signIn(email, password) {
    try {
        const foundUser = await User.findOne({ email: email });
        if (foundUser && foundUser.password === password) {
            return foundUser.username;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
    }
}

// Exported login handler
exports.login = (req, res) => {
    const { email, password } = req.body;
    signIn(email, password).then(user => {
        if (user) {
            res.json({ user: user });
        } else {
            res.json({ message: "Invalid user or password" });
        }
    });
};

// Exported logout handler
exports.logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
};

// Exported register handler
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const result = await register(username, email, password);
    if (result === true) {
        res.json({ message: "User successfully registered" });
    } else {
        res.json({ message: "User already exists" });
    }
};
