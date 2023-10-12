import React from 'react';
import { render } from '@testing-library/react';
import {Loader} from './Loader';
import '@testing-library/jest-dom'

test('renders the Loader component', () => {
  const { container } = render(<Loader />);
  const loaderElement = container.firstChild;

  expect(loaderElement).toHaveClass('loader');
});
