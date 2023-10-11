interface Repo {
	id: number;
	owner: string;
	name: string;
	language: string;
	stars: number;
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
			return {entryJson: item, id: item.id, owner: item.owner, name: item.name, language: item.language, stars: item.stargazers_count, url: item.html_url, description: item.description, watchers: item.watchers, forks: item.forks, issues: item.open_issues}
		})
	}
}