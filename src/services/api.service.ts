import { IRepo } from './repo.interface';

interface ApiResult extends IRepo {
	stargazers_count: number;
	html_url: string;
	open_issues: number;
}

export class ApiService {
	static async searchRepositories(term: string) {
		const url = `${process.env.REACT_APP_GITHUB_URL}/search/repositories?q=${term}`;
		
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
		return data.items.map((item: ApiResult) => {
			return {
				...item, 
				stars: (item).stargazers_count, url: item.html_url, issues: item.open_issues
			} as IRepo;
		});
	}
}

