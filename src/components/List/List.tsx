import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { ListItem } from "../ListItem/ListItem";
import { ApiService } from "../../api.service";
import { Loader } from "../Loader/Loader";
import css from './List.module.css';

interface Repo {
	id: number;
	owner: string;
	name: string;
	language: string;
	score: number;
}

export function List() {
	const [repos, setRepos] = useState<Repo[]>([]);
	const [term, setTerm] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!term) {
			return
		}
		init();
	}, [term])

	async function init() {
		setLoading(true);
		setRepos([]);
		const repos = await ApiService.searchRepositories(term);
		setRepos(repos)
		setLoading(false);
	}

	return (
		<>
			<h1 style={{textAlign:  'center'}}>Lista de repositoórios</h1>
			<SearchBar onSearch={term => setTerm(term)} />
			{ (!term && !loading) && <p className={css.noTerm}>Digite algo para pesquisar</p>}
			{ repos && repos.length === 0 && term && !loading && <p className={css.noResults}>Sem resultados para "{term}"</p>}
			{ loading && <Loader /> }
			{ repos && (
				<div className={css.list}>
					{
						repos.map((repo: any) => (
							<ListItem key={repo.id} id={repo.id} owner={repo.owner.login} name={repo.name} language={repo.language} score={repo.score} />
						))
					}
				</div>
			)}
		</>
	)
}