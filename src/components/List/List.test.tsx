import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {List} from './List';
import { ApiProvider } from '../../contexts/ApiContext';

// Create a mock of the context to provide example data
const mockApiContext = {
  repoData: [
    {
      id: 1,
      name: 'RepoName1',
      owner: {
        login: 'OwnerLogin1'
      },
      language: 'JavaScript',
      stars: 100
    },
    {
      id: 2,
      name: 'RepoName2',
      owner: {
        login: 'OwnerLogin2'
      },
      language: 'TypeScript',
      stars: 50
    },
    // ... other data
  ]
};

// Override useApi to return the mocked context
jest.mock('../../contexts/ApiContext', () => ({
  ...jest.requireActual('../../contexts/ApiContext'),
  useApi: () => mockApiContext,
}));

test('renders the List component with correct data', () => {
  const onSelectItemMock = jest.fn();
  const { getByText } = render(
    <ApiProvider searchTerm="exampleSearchTerm">
      <List onSelectItem={onSelectItemMock} />
    </ApiProvider>
  );

  // Check if repository elements are present
  const repo1Name = getByText('RepoName1');
  const repo2Name = getByText('RepoName2');

  expect(repo1Name).toBeTruthy();
  expect(repo2Name).toBeTruthy();
});

test('calls onSelectItem when ListItem is clicked', () => {
  const onSelectItemMock = jest.fn();
  const { getByText } = render(
    <ApiProvider searchTerm="exampleSearchTerm">
      <List onSelectItem={onSelectItemMock} />
    </ApiProvider>
  );

  // Simulate clicking on a list item
  const repo1Name = getByText('RepoName1');
  fireEvent.click(repo1Name);

  // Verify if onSelectItem function was called with the correct ID
  expect(onSelectItemMock).toHaveBeenCalledWith(1);
});
