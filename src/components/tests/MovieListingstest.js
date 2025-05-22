import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage'; 
import MovieDetails from '../pages/MovieDetails';
import PaymentPage from '../pages/PaymentPage';  

describe('Movie & Show Listings', () => {
  test('renders movie feed on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Example movie title to look for (replace with your dummy data)
    expect(screen.getByText(/Avengers/i)).toBeInTheDocument();
  });

  test('navigates to movie details on clicking a movie', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const movieLink = screen.getByText(/Avengers/i);
    fireEvent.click(movieLink);

    expect(screen.getByText(/Venues/i)).toBeInTheDocument();
    expect(screen.getByText(/Showtimes/i)).toBeInTheDocument();
  });

  test('shows venues and showtimes correctly', () => {
    // Render movie details page directly with dummy params
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Check venue and showtime example elements (adjust text to your app)
    expect(screen.getByText(/Cinema One/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 PM/i)).toBeInTheDocument();
  });

  test('redirects to payment page on show selection', () => {
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </MemoryRouter>
    );

    const showtimeButton = screen.getByRole('button', { name: /7:00 PM/i });
    fireEvent.click(showtimeButton);

    // Expect the payment page content (adjust as needed)
    expect(screen.getByText(/Select Your Seats/i)).toBeInTheDocument();
  });
});
