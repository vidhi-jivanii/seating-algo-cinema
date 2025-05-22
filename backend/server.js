const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');

const app = express();

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);  
    
app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
}));

app.listen(3001,()=>{console.log("Express is Up and Running")})