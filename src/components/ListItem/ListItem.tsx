import { useApi } from '../../contexts/ApiContext';
import { IRepo } from '../../services/repo.interface';
import css from './ListItem.module.css';
import React, { useEffect, useState } from 'react';
interface Props {
	id: number;
	onClick(id: number): void;
}

export function ListItem (props: Props) {
	const {repoData} = useApi();
	const [repo, setRepo] = useState<IRepo>();

	useEffect(() => {
		const repo = repoData.find(item => item.id === props.id);

		if(!repo) return;

		setRepo(repo);
	}, []);


	return (
		<>
			{repo && (
				<div id={props.id.toString()} className={`d-flex ${css.listItem}`} onClick={() => props.onClick(props.id)}>
					<span className={css.span}>{repo.owner.login}</span>
					<span className={`${css.span} ${css.name}`}>{repo.name}</span>
					<span className={css.span}>{repo.language}</span>
					<span className={css.span}>{repo.stars}</span>
				</div>
			)}
		</>	
		
	);
}