import React from "react";
import css from './Pagination.module.css';

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination(props: Props) {
	const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={css.container}>
			{/* <i className="fa fa-solid fa-arrow-left"></i> */}
			<ul className={css.pagination}>
		{pageNumbers.map((page) => (
			<li key={page} className={page === currentPage ? css.active : ""}>
			<button onClick={() => onPageChange(page)}>{page}</button>
			</li>
		))}
		</ul>
	</div>
  );
}