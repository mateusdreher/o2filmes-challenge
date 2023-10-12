/* eslint-disable */

import React from 'react';
import css from './ListHeader.module.css';

export function ListHeader() {
  return (
	<div className={`d-flex ${css.listHeader}`}>
		<span className={css.span}>Owner</span>
		<span className={`${css.span} ${css.name}`}>Repository Name</span>
		<span className={css.span}>Language</span>
		<span className={css.span}>Stars</span>
	</div>
  );
}
