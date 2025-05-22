import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SeatSelection from '../components/SeatSelection'; 

const seats = [
  { id: 'A1', type: 'regular', isAvailable: true },
  { id: 'A2', type: 'VIP', isAvailable: true },
  { id: 'A3', type: 'accessible', isAvailable: false },
  { id: 'A4', type: 'regular', isAvailable: true },
  { id: 'A5', type: 'regular', isAvailable: true },
];

describe('SeatSelection Component', () => {
  test('renders all seats and marks unavailable ones', () => {
    render(<SeatSelection seats={seats} adminOverride={false} />);

    // Should render all seat buttons
    seats.forEach(seat => {
      const seatBtn = screen.getByTestId(`seat-${seat.id}`);
      expect(seatBtn).toBeInTheDocument();

      if (!seat.isAvailable) {
        expect(seatBtn).toBeDisabled();
      } else {
        expect(seatBtn).toBeEnabled();
      }
    });
  });

  test('selects available seat on click', () => {
    render(<SeatSelection seats={seats} adminOverride={false} />);
    const seatBtn = screen.getByTestId('seat-A1');

    fireEvent.click(seatBtn);
    expect(seatBtn).toHaveClass('selected');
  });

  test('prevents selection of unavailable seat when admin override is off', () => {
    render(<SeatSelection seats={seats} adminOverride={false} />);
    const seatBtn = screen.getByTestId('seat-A3'); // unavailable seat

    expect(seatBtn).toBeDisabled();
  });

  test('allows selection of unavailable seat when admin override is on', () => {
    render(<SeatSelection seats={seats} adminOverride={true} />);
    const seatBtn = screen.getByTestId('seat-A3');

    expect(seatBtn).toBeEnabled();
    fireEvent.click(seatBtn);
    expect(seatBtn).toHaveClass('selected');
  });

  test('ensures group seats are selected together', () => {
    // Assuming your component supports passing selected group size and manages group selection
    const groupSeats = [
      { id: 'B1', type: 'regular', isAvailable: true },
      { id: 'B2', type: 'regular', isAvailable: true },
      { id: 'B3', type: 'regular', isAvailable: true },
    ];
    render(<SeatSelection seats={groupSeats} groupSize={3} adminOverride={false} />);
    
    const seatB1 = screen.getByTestId('seat-B1');
    fireEvent.click(seatB1);

    // You can test if all group seats are selected together - depends on your implementation
    expect(seatB1).toHaveClass('selected');
    expect(screen.getByTestId('seat-B2')).toHaveClass('selected');
    expect(screen.getByTestId('seat-B3')).toHaveClass('selected');
  });
});
