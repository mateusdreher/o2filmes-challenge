import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Tooltip} from './Tooltip';

test('renders the Tooltip and displays the content on mouse hover', () => {
  const content = 'Tooltip Text';
  const { getByText, queryByText } = render(<Tooltip content={content}>Hover me</Tooltip>);

  // The tooltip should not be displayed initially
  expect(queryByText(content)).toBeNull();

  const tooltipContainer = getByText('Hover me') as Element; // Find the element to trigger the tooltip
  // Simulate hover
  fireEvent.mouseEnter(tooltipContainer);

  // Now the tooltip should be displayed
  expect(queryByText(content)).toBeTruthy();

  // Simulate mouse leave
  fireEvent.mouseLeave(tooltipContainer);

  // The tooltip should be hidden again
  expect(queryByText(content)).toBeNull();
});
