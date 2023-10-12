import css from './Loader.module.css';
import React from 'react';

export function Loader() {
	return (
		<span className={css.loader}></span>
	);
}