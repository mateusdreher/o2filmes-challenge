import React, { createContext, useContext, useEffect, useState } from 'react';
import { IRepo } from '../services/repo.interface';
import { ApiService } from '../services/api.service';

interface IApiContext {
	repoData: IRepo[];
	searchTerm: string;
	loading: boolean;
}


const ApiContext = createContext<IApiContext | undefined>(undefined);

export function useApi() {
	const context = useContext(ApiContext);

	if(!context) {
		throw new Error('useApi deve ser usado dentro de um ApiProvider');
	}

	return context;
}

export function ApiProvider({children, searchTerm}: {children: React.ReactNode, searchTerm: string}) {
	const [repoData, setRepoData] = useState<IRepo[]>([]);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		async function fetchData(){
			setRepoData([]);
			setLoading(true);
			const data = await ApiService.searchRepositories(searchTerm);
			setRepoData(data);
			setLoading(false);
		}

		if (!searchTerm) return;
		fetchData();
	}, [searchTerm]);

	return(
		<ApiContext.Provider value={{repoData, searchTerm, loading}}>
			{children}
		</ApiContext.Provider>
	);
}