import { useState } from 'react';
import { ListItem } from '../ListItem/ListItem';
import {Pagination} from '../Pagination/Pagination';
import css from './List.module.css';
import { useApi } from '../../contexts/ApiContext';
import React from 'react';
import { IRepo } from '../../services/repo.interface';
interface Props {
  onSelectItem(id: number): void;
}

export function List(props: Props) {
	const {repoData} = useApi();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);


	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedRepoData = repoData.slice(startIndex, endIndex);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	function handleSelectItem(id: number) {
		props.onSelectItem(id);
	}

	function handleItemsPerPageChange(items: number) {
		setItemsPerPage(items);
	} 

  

	return (
		<>     
			{repoData && (
				<div className={css.list}>
					{displayedRepoData.map((repo: IRepo) => (
						<ListItem onClick={handleSelectItem} key={repo.id} id={repo.id}  />
					))}
				</div>
			)}
			{repoData && repoData.length > itemsPerPage && (
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(repoData.length / itemsPerPage)}
					onPageChange={handlePageChange}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			)}
		</>
	);
}
