import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {SearchBar} from './SearchBar'; // Import the component you want to test

test('renders SearchBar and calls the onSearch function when Enter key is pressed', () => {
  const onSearchMock = jest.fn();
  const { getByPlaceholderText } = render(<SearchBar onSearch={onSearchMock} />);

  const inputElement = getByPlaceholderText('Pesquise por repositórios');


  // Verify if the input field is rendered correctly
  expect(inputElement).toBeTruthy();

  // Simulate typing a search term
  fireEvent.change(inputElement, { target: { value: 'react' } });

//   // Simulate pressing the Enter key
  fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

//   // Verify if the onSearch function was called with the search term
  expect(onSearchMock).toHaveBeenCalledWith('react');
});
