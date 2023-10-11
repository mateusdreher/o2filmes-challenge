import css from './ListItem.module.css'

interface Props {
	id: number;
	owner: string;
	name: string;
	language: string;
	stars: number;
	onClick(id: number): void;
}

export function ListItem (props: Props) {
	return (

		<div className={`d-flex ${css.listItem}`} onClick={() => props.onClick(props.id)}>
			<span className={css.span}>{props.owner}</span>
			<span className={`${css.span} ${css.name}`}>{props.name}</span>
			<span className={css.span}>{props.language}</span>
			<span className={css.span}>{props.stars}</span>
		</div>
	)
}