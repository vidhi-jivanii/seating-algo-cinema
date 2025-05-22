const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/seatingApp";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const { User } = require('../mongoUtil');

exports.getUser = async (req, res) => {
  const username = req.params.username;
  try {
    await mongoose.connection;
    const user = await User.findOne({ username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

