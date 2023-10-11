import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { ListItem } from "../ListItem/ListItem";
import { ApiService } from "../../api.service";
import { Loader } from "../Loader/Loader";
import {Pagination} from "../Pagination/Pagination"; // Importe o componente de paginação aqui
import css from './List.module.css';
import { Modal } from "../Modal/Modal";

interface Repo {
	id: number;
	owner: string;
	name: string;
	language: string;
	stars: number;
	url: string;
	description: string;
	watchers: number;
	forks: number;
	issues: number;
	entryJson: any;
}

export function List() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(true);
	const [selectedRepo, setSelectedRepo] = useState<Repo>();

  const itemsPerPage = 10;

  useEffect(() => {
    if (!term) {
      return;
    }
    init();
  }, [term]);

  async function init() {
    setLoading(true);
    setRepos([]);
    const repos = await ApiService.searchRepositories(term);
    setRepos(repos);
	console.log({repos})
    setLoading(false);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRepos = repos.slice(startIndex, endIndex);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleSelectItem(id: number) {
	const repo = repos.find(item => item.id === id);
	console.log({repo})
	setSelectedRepo(repo);
	setShowModal(true);
  }

  

  return (
    <>
	  {showModal && selectedRepo && <Modal entryJson={selectedRepo.entryJson} showModal={showModal} onClose={() => setShowModal(false)} repoName={selectedRepo.name} username={(selectedRepo.owner as any).login} url={selectedRepo.url} description={selectedRepo.description} watchers={selectedRepo.watchers} forks={selectedRepo.forks} issues={selectedRepo.issues} language={selectedRepo.language} stars={selectedRepo.stars} />}

      <h1 style={{ textAlign: 'center' }}>Lista de repositórios</h1>
      <SearchBar onSearch={term => setTerm(term)} />
      {(!term && !loading) && <p className={css.noTerm}>Digite algo para pesquisar</p>}
      {repos && repos.length === 0 && term && !loading && <p className={css.noResults}>Sem resultados para "{term}"</p>}
      {loading && <Loader />}
      {repos && (
        <div className={css.list}>
          {displayedRepos.map((repo: any) => (
            <ListItem onClick={handleSelectItem} key={repo.id} id={repo.id} owner={repo.owner.login} name={repo.name} language={repo.language} stars={repo.stars} />
          ))}
        </div>
      )}
      {repos && repos.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(repos.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
