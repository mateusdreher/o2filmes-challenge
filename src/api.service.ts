interface Repo {
	id: number;
	owner: string;
	name: string;
	language: string;
	score: number;
}

export class ApiService {
	static async searchRepositories(term: string) {
		const url = `${process.env.REACT_APP_GITHUB_URL}/search/repositories?q=${term}`
		
		const result = await fetch(url, {
			headers: new Headers({
				'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
				'Content-type': 'application/json'
			})
		});
		if (!result.ok) {
			console.error(result);
			throw new Error('Error on fetch GH api');
		}

		const data = await result.json();

		return data.items.map((item: any) => {
			return {id: item.id, owner: item.owner, name: item.name, language: item.language, score: item.score}
		})
	}
}