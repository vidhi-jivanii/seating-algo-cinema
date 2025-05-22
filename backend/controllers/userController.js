const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/seatingApp";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const { User } = require('../mongoUtil');

exports.getUser = async (req, res) => {
  const user = req.params.i
  try {
    await mongoose.connection;
    const users = await User.findOne({username:user});
    res.json(users);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
