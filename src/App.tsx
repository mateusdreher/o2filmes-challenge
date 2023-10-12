import React, { useState } from 'react';
import { ApiProvider } from './contexts/ApiContext';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Home } from './pages/Home';


function App() {
	const [searchTerm, setSearchTerm] = useState('');
  

	return (
		<ApiProvider searchTerm={searchTerm}>
			<div className="App">
				<h1 style={{ textAlign: 'center' }}>Lista de repositórios publicos do GIT</h1>
				<SearchBar onSearch={term => setSearchTerm(term)} />
				<Home />
			</div>
		</ApiProvider>
    
	);
}

export default App;
