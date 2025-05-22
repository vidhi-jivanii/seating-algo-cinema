# MERN Stack Movie Ticket Booking App

Welcome to the Movie Ticket Booking App, a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows users to browse and book movie tickets seamlessly. Below is an overview of the app's architecture, components, and functionalities.

## Technologies Used

- **Frontend:** React.js, React Router DOM  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Testing:** Jest, Supertest (backend), React Testing Library (frontend)  
- **Deployment:** Local environment (instructions below)

## Components

1. **Login Page:**
   - Utilizes the state hook to manage user authentication.
   - Upon successful login, the user state is updated, and any booked tickets are associated with the logged-in user.

2. **Register Page:**
   - Allows new users to register, and their details are stored in the MongoDB database.

3. **Page Routing:**
   - Uses `react-router-dom` to navigate between different pages (login, register, home, payment).

4. **Home Page:**
   - Displays a feed of movies.
   - Clicking on a movie provides options for venues, movie theaters, and show timings.
   - Selection of a show redirects to the payment page.

5. **Payment Page:**
   - Users can choose seats from the available ones.
   - Three online payment methods are available:
     - Credit Card: Validates a 16-digit card number, 3-digit CVV, and cardholder name.
     - Paytm: Allows users to spend money from their digital wallet.
     - Google Pay: Users can scan a QR code to make payment.
   - Upon successful payment, users receive a soft copy of their tickets.

## Features

- **User Authentication:** Secure signup and login with JWT-based session management.
- **Movie & Show Listings:** Browse movies, venues, and show timings.
- **Personalized Seating Algorithm:**  
  - VIP and accessible seating zones.  
  - Groups of 2–7 seated together without splitting.  
  - Avoid solo attendees between groups except for special seats.  
  - Randomly unavailable/broken seats handled dynamically.  
  - Age-restricted zones (e.g., no children allowed).  
  - Flexible seating for elderly users.  
  - Admin override to bypass seating rules.
- **Payment Integration:**  
  - Credit Card (with validation).  
  - Paytm wallet payments.  
  - Google Pay via QR code scanning.
- **Booking Management:** Users can cancel and reschedule bookings; seat reallocation handled automatically.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-ticket-app.git


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-ticket-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-ticket-app
   ```

3. Install dependencies using npm (Node Package Manager):

   ```bash
   npm install
   ```

## Usage

1. Start the backend server:

   ```bash
   npm run server
   ```

2. Start the frontend:

   ```bash
   npm start
   ```

3. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## Contact

Feel free to explore and enjoy the Movie Ticket Booking App!
