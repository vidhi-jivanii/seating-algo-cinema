const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  username: String,
  payment_mode: String,
  booking: {
    movieName: String,
    tickets: [String],
  },
  amt: String,
});

const Booking = mongoose.model('Booking', BookingSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bookings: [BookingSchema],
});

const User = mongoose.model('User', UserSchema);

const ShowSchema = new mongoose.Schema({
  movieName: String,
  timing: String,
  seats: Number,
  cost: Number,
});

const Show = mongoose.model('Show', ShowSchema);

const VenueSchema = new mongoose.Schema({
  name: String,
  location: String,
  shows: [ShowSchema], // Use ShowSchema directly here
});

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = {
  User,
  Booking,
  Show,
  Venue,
};
