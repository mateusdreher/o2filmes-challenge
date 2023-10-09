import css from './ListItem.module.css'

interface Props {
	id: number;
	owner: string;
	name: string;
	language: string;
	score: number;
}

export function ListItem (props: Props) {
	return (

		<div className={`d-flex ${css.listItem}`}>
			<span className={css.span}>{props.owner}</span>
			<span className={`${css.span} ${css.name}`}>{props.name}</span>
			<span className={css.span}>{props.language}</span>
			<span className={css.span}>{props.score}</span>
		</div>
	)
}