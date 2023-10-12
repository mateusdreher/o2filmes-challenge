import React from 'react';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import {Modal} from './Modal';
import { ApiProvider } from '../../contexts/ApiContext';

// Create a mock for context
const mockApiContext = {
  repoData: [
    {
      id: 1,
      name: 'RepoName',
      owner: {
        login: 'OwnerLogin'
      },
      description: 'Description',
      url: 'https://github.com/OwnerLogin/RepoName',
      watchers: 100,
      forks: 50,
      stars: 200,
      issues: 10
    }
  ],
  searchTerm: 'exampleSearchTerm',
  loading: false,
};

// REplace the useApi by mock
jest.mock('../../contexts/ApiContext', () => ({
  ...jest.requireActual('../../contexts/ApiContext'),
  useApi: () => mockApiContext,
}));

test('renders Modal component and calls onClose when clicking outside the modal', async () => {
  const onCloseMock = jest.fn();
  const { container, getByText } = render(
    <ApiProvider searchTerm={mockApiContext.searchTerm}>
      <Modal onClose={onCloseMock} id={1} showModal={true} />
    </ApiProvider>
  );

  // Use waitFor to wait for text render
  await waitFor(() => {
    expect(getByText('RepoName')).toBeTruthy()
  });

  fireEvent.click(container.firstChild as Element);

  expect(onCloseMock).toHaveBeenCalled();
});
