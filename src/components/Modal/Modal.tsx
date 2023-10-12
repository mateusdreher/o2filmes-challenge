import { useEffect, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';
import css from './Modal.module.css';
import { IRepo } from '../../services/repo.interface';
import React from 'react';
import {Tooltip} from '../Tooltip/Tooltip';
import tooltipStyles from '../Tooltip/Tooltip.module.css';

interface Props {
	onClose(): void;
	id: number;
	showModal: boolean
}



export function Modal(props: Props) {
	const { showModal, onClose, id } = props;
	const modalClassName = showModal ? `${css.popup} ${css.show}` : css.popup;
	const {repoData} = useApi();
	const [repo, setRepo] = useState<IRepo>();

	useEffect(() => {
		const repo = repoData.find(item => item.id === id);
		setRepo(repo);
	}, []);

	function handleBgClick(event: React.MouseEvent<HTMLElement>) {
		const target = event.target as Element;
		if (target.classList.contains(css.popup)) {
			onClose();		
		}
	}

	function handleDownloadJson() {
		if(!repo) return;

		const jsonContent = JSON.stringify(repo, null, 2);
		
		const blob = new Blob([jsonContent], { type: 'application/json' });
		
		const url = window.URL.createObjectURL(blob);
		
		const a = document.createElement('a');
		a.href = url;
		a.download =  `${repo.owner.login} - ${repo.name}.json`;
		
		a.click();
		
		window.URL.revokeObjectURL(url);
	}
 
 
	if(!repo) return <></>;

	return (
		<div className={modalClassName} onClick={handleBgClick}>
			<div className={css.popup__content}>
				<div className={css.title}>
					<a href={repo.url} target='_blank' rel="noreferrer">
						<i className="fa fa-2x fa-brands fa-github"></i>
					</a>
					<h2 className='mr-left-10'>{repo.name}</h2>
				</div>
				<span><i>{repo.owner.login}</i></span>
				<p className={css.popup__text}>
					{repo.description}
				</p>
				<div className={css.infos}>
					<Tooltip content="Watchers">
						<i className={`fa fa-solid fa-eye ${tooltipStyles.trigger}`}></i>
						<span className="mr-left-10">{repo.watchers}</span>
					</Tooltip>
					<Tooltip content='Forks'>
						<i className={`fa fa-solid fa-code-fork ${tooltipStyles.trigger}`}></i>
						<span className="mr-left-10">{repo.forks}</span>
					</Tooltip>
					<Tooltip content='Stars'>
						<i className={`fa fa-solid fa-star ${tooltipStyles.trigger}`}></i>
						<span className="mr-left-10"> {repo.stars}</span>
					</Tooltip>
					<Tooltip content='Opended issues'>
						<i className={`fa fa-solid fa-bug ${tooltipStyles.trigger}`}></i>
						<span className="mr-left-10">{repo.issues}</span>
					</Tooltip>
				</div>
				<p className='mr-top-40'>Você pode baixar as informações completas desse repositório:</p>
				<button className={css.buttonDownload} onClick={handleDownloadJson}>Baixar JSON</button>
			</div>
		</div>
	);
}
