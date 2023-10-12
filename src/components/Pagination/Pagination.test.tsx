import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Pagination} from './Pagination';

test('renders Pagination component and calls onPageChange when a page is clicked', () => {
  const onPageChangeMock = jest.fn();
  const onItemsPerPageChangeMock = jest.fn();
  const totalPages = 5;
  const { container, getByText } = render(
    <Pagination currentPage={1} totalPages={totalPages} onPageChange={onPageChangeMock} onItemsPerPageChange={onItemsPerPageChangeMock} />
  );

  const pageButtons = container.querySelectorAll('button');

  // Verify if the correct number of page buttons is rendered
  expect(pageButtons).toHaveLength(totalPages);

  // Simulate clicking on a page
  fireEvent.click(pageButtons[2]);

  // Verify if the onPageChange function was called with the page number
  expect(onPageChangeMock).toHaveBeenCalledWith(3);
});

test('calls onItemsPerPageChange when the items per page select is changed', () => {
  const onPageChangeMock = jest.fn();
  const onItemsPerPageChangeMock = jest.fn();
  const { getByLabelText, getByDisplayValue } = render(
    <Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} onItemsPerPageChange={onItemsPerPageChangeMock} />
  );

  const itemsPerPageSelect = getByDisplayValue('10');

  // Simulate changing the items per page value
  fireEvent.change(itemsPerPageSelect, { target: { value: '20' } });

  // Verify if the onItemsPerPageChange function was called with the new value
  expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(20);
});
