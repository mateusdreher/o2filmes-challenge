import React from 'react';
import css from './Pagination.module.css';

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (items: number) => void;
}

export function Pagination(props: Props) {
	const { currentPage, totalPages, onPageChange } = props;
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={css.container}>
			<ul className={css.pagination}>
				{pageNumbers.map((page) => (
					<li key={page} className={page === currentPage ? css.active : ''}>
						<button onClick={() => onPageChange(page)}>{page}</button>
					</li>
				))}
			</ul>
			<div className="d-flex">
				<label className="mr-right-10 mr-left-10">Items per page</label>
				<select className={css.itemsPerPageSelect} onChange={event => props.onItemsPerPageChange(parseInt(event.target.value))}>
					<option value="10">10</option>
					<option value="20">20</option>
				</select>
			</div>
		</div>
	);
}