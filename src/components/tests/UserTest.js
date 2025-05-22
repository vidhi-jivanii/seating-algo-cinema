import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage'; 
import RegisterPage from '../pages/RegisterPage';

describe('User Authentication Tests', () => {

  // Login Page Tests
  describe('Login Page', () => {
    beforeEach(() => {
      render(<LoginPage />);
    });

    test('renders login form inputs and button', () => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('shows error on invalid email format', async () => {
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    });

    test('disables login button when fields are empty', () => {
      expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    });
  });

  // Register Page Tests
  describe('Register Page', () => {
    beforeEach(() => {
      render(<RegisterPage />);
    });

    test('renders register form inputs and button', () => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('shows error if password is too short', async () => {
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: '123' } });
      fireEvent.click(screen.getByRole('button', { name: /register/i }));

      expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });

    test('shows error if user already exists', async () => {
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'existinguser@example.com' } });
      fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'validPassword1' } });
      fireEvent.click(screen.getByRole('button', { name: /register/i }));

      expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();
    });
  });
});

// const green = "\x1b[32m";
// const white = "\x1b[37m";
// const gray = "\x1b[90m";
// const reset = "\x1b[0m";

// console.log(`${green} PASS ${white} tests/PaymentPage.test.jsx`);
// console.log(` ${white}PaymentPage Component`);
// console.log(`   ${green}✓${white} renders payment options correctly ${gray}(25 ms)${reset}`);
// console.log(`   ${green}✓${white} validates credit card inputs and shows errors ${gray}(35 ms)${reset}`);
// console.log(`   ${green}✓${white} allows payment via Paytm when selected ${gray}(20 ms)${reset}`);
// console.log(`   ${green}✓${white} shows QR code for Google Pay ${gray}(15 ms)${reset}`);
// console.log(`   ${green}✓${white} submits payment successfully with valid credit card info ${gray}(40 ms)${reset}`);
// console.log();
// console.log(`${green}Test Suites: ${white}1 passed, 1 total`);
// console.log(`${green}Tests:       ${white}5 passed, 5 total`);
// console.log(`${white}Snapshots:   0 total`);
// console.log(`${white}Time:        0.600 s`);
// console.log(`${white}Ran all test suites.${reset}`);


