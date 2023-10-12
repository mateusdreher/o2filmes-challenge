export interface IRepo {
	id: number;
	owner: {
		login: string
	};
	name: string;
	language: string;
	stars: number;
	url: string;
	description: string;
	watchers: number;
	forks: number;
	issues: number;
}