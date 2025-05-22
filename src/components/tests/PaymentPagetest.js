import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentPage from '../pages/PaymentPage';

describe('PaymentPage Component', () => {
  beforeEach(() => {
    render(<PaymentPage />);
  });

  test('renders payment options correctly', () => {
    expect(screen.getByLabelText(/credit card/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/paytm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/google pay/i)).toBeInTheDocument();
  });

  test('validates credit card inputs and shows error for invalid card number', async () => {
    fireEvent.click(screen.getByLabelText(/credit card/i));

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText(/cardholder name/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    expect(await screen.findByText(/invalid card number/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid cvv/i)).toBeInTheDocument();
    expect(screen.getByText(/cardholder name is required/i)).toBeInTheDocument();
  });

  test('allows payment via Paytm when selected', async () => {
    fireEvent.click(screen.getByLabelText(/paytm/i));

    fireEvent.change(screen.getByLabelText(/paytm wallet amount/i), { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    // Assuming a success message appears on valid payment
    expect(await screen.findByText(/payment successful via paytm/i)).toBeInTheDocument();
  });

  test('shows QR code when Google Pay selected', () => {
    fireEvent.click(screen.getByLabelText(/google pay/i));

    expect(screen.getByAltText(/google pay qr code/i)).toBeInTheDocument();
  });

  test('submits payment successfully with valid credit card info', async () => {
    fireEvent.click(screen.getByLabelText(/credit card/i));

    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/cardholder name/i), { target: { value: 'John Doe' } });

    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    expect(await screen.findByText(/payment successful/i)).toBeInTheDocument();
  });
});
