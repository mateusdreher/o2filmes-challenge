import { useState } from 'react';
import css from './SearchBar.module.css';
import React from 'react';
interface Props {
	onSearch(term: string): void;
}


export function SearchBar(props: Props) {
	const [term, setTerm] = useState('');

	function handleKeyboardKey(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			props.onSearch(term);
		}
	}

	return (
		<>
			<div className={css.wrap}>
				<div className={css.search}>
					<input type="text" className={css.searchTerm} placeholder="Pesquise por repositórios" value={term} onChange={(event) => setTerm(event.target.value)} onKeyUp={handleKeyboardKey} />
					<button onClick={() => props.onSearch(term)} className={css.searchButton}>
						<i className="fa fa-search"></i>
					</button>
				</div>
			</div>
		</>
	);
}