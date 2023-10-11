import css from './Modal.module.css';

interface Props {
	showModal: boolean;
	onClose(): void;
	repoName: string;
	username: string;
	url: string;
	description: string;
	watchers: number;
	forks: number;
	language: string;
	issues: number;
	stars: number;
	entryJson: any;
}



export function Modal(props: Props) {
	console.log({props})
	const { showModal, onClose } = props;
	const modalClassName = showModal ? `${css.popup} ${css.show}` : css.popup;

	function handleBgClick(event: any) {
		if (event.target.classList.contains(css.popup)) {
			props.onClose();		
		}
	}

	function handleDownloadJson() {
		const jsonContent = JSON.stringify(props.entryJson, null, 2);
		
		const blob = new Blob([jsonContent], { type: 'application/json' });
		
		const url = window.URL.createObjectURL(blob);
		
		const a = document.createElement('a');
		a.href = url;
		a.download =  `${props.username} - ${props.repoName}.json`;
		
		a.click();
		
		window.URL.revokeObjectURL(url);
	  }
	  

	return (
		<div className={modalClassName} onClick={handleBgClick}>
			<div className={css.popup__content}>
				<div className={css.title}>
					<a href={props.url} target='_blank' rel="noreferrer">
						<i className="fa fa-2x fa-brands fa-github"></i>
					</a>
					<h2 className='mr-left-10'>{props.repoName}</h2>
				</div>
				<span><i>{props.username}</i></span>
				<p className={css.popup__text}>
				{props.description}
				</p>
				<div className={css.infos}>
					<span >
						<i className="fa fa-solid fa-eye"></i>
						<span className="mr-left-10">{props.watchers}</span>
					</span>
					<span>
						<i className="fa fa-solid fa-code-fork"></i>
						<span className="mr-left-10">{props.forks}</span>
					</span>
					<span>
						<i className="fa fa-solid fa-star"></i>
						<span className="mr-left-10"> {props.stars}</span>
					</span>
					<span>
						<i className="fa fa-solid fa-bug"></i>
						<span className="mr-left-10">{props.issues}</span>
					</span>
				</div>
				<p className='mr-top-40'>Você pode baixar as informações completas desse repositório:</p>
				<button className={css.buttonDownload} onClick={handleDownloadJson}>Baixar JSON</button>
			</div>
		</div>
	);
}
