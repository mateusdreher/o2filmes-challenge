import { useApi } from '../contexts/ApiContext';
import { List } from '../components/List/List';
import { Loader } from '../components/Loader/Loader';
import { useState } from 'react';
import { Modal } from '../components/Modal/Modal';
import React from 'react';


export function Home() {
	const {repoData, searchTerm, loading} = useApi();
	const [showModal, setShowModal] = useState(true);
	const [id, setId] = useState<number>();

	function handleSelectedItem(id: number) {
		setId(id);
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
	}

	if (searchTerm !== '' && loading) {
		return <Loader />;
	}
 
	if (repoData?.length === 0 && searchTerm === '') {
		return <p className="noTerm">Digite algo para pesquisar</p>;
	}
 
	if (repoData?.length === 0 && searchTerm !== '' && !loading) {
		return <p className="noResults">Sem resultados para <i>{searchTerm} </i></p>;
	}
 
	return (
		<>
			{showModal && id && <Modal onClose={handleCloseModal} id={id} showModal={showModal}/>}
			<List onSelectItem={handleSelectedItem}/>
		</>
	); 
}