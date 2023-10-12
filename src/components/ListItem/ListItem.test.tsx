import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ListItem } from './ListItem';
import { ApiProvider } from '../../contexts/ApiContext';

// Create a mock of the context to provide example data
const mockApiContext = {
  repoData: [
    {
      id: 1,
      name: 'RepoName',
      owner: {
        login: 'OwnerLogin'
      },
      language: 'JavaScript',
      stars: 100
    },
    {
      id: 2,
      name: 'AnotherRepo',
      owner: {
        login: 'AnotherOwner'
      },
      language: 'TypeScript',
      stars: 50
    }
  ]
};

// Override useApi to return the mocked context
jest.mock('../../contexts/ApiContext', () => ({
  ...jest.requireActual('../../contexts/ApiContext'),
  useApi: () => mockApiContext,
}));

test('renders the ListItem component with correct data', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(
    <ApiProvider searchTerm="exampleSearchTerm">
      <ListItem id={1} onClick={onClickMock} />
    </ApiProvider>
  );

  const ownerElement = getByText('OwnerLogin');
  const nameElement = getByText('RepoName');
  const languageElement = getByText('JavaScript');
  const starsElement = getByText('100');

  expect(ownerElement).toBeTruthy();
  expect(nameElement).toBeTruthy();
  expect(languageElement).toBeTruthy();
  expect(starsElement).toBeTruthy();
});

test('calls onClick when ListItem is clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(
    <ApiProvider searchTerm="exampleSearchTerm">
      <ListItem id={1} onClick={onClickMock} />
    </ApiProvider>
  );

  const listItem = getByText('RepoName');

  fireEvent.click(listItem);

  expect(onClickMock).toHaveBeenCalledWith(1);
});
