# Public Repositorie Github Search Frontend

This is a simple frontend application that allows you to search for repositories using the Github API. It's built with React and designed to be easy to set up and use.

## Prerequisites

Before you can use this application, you need to obtain a GitHub API authorization token. Here's how you can get one:

1. **Sign In to GitHub:**
    - If you don't already have a GitHub account, you'll need to create one. You can sign up for a free GitHub account at [GitHub Signup](https://github.com/join).

2. **Navigate to Developer Settings:**
    - Once you're logged in to your GitHub account, click on your profile picture in the top right corner.
    - From the dropdown menu, select "Settings."
    - In the left sidebar, click on "Developer settings."

3. **Access Personal Access Tokens:**
    - Under the "Access tokens" section in the Developer settings, click "Personal access tokens."

4. **Generate a New Token:**
    - Click the "Generate token" button to create a new personal access token.

5. **Configure Token Permissions:**
    - Give your token a descriptive name.
    - Select the permissions (scopes) you need for your token. In most cases, for read-only access to public repositories, you can select "public_repo."
    - If your application requires additional permissions, you can select those as well.

6. **Generate Token:**
    - After configuring the settings, scroll down and click the "Generate token" button.

7. **Copy and Save Token:**
    - Once the token is generated, GitHub will display it. Make sure to copy this token and save it in a secure location. You won't be able to see it again.

Now you have an authentication token that can be used with the application to access GitHub's API. Be cautious with this token and avoid sharing it publicly, as it provides access to your GitHub account.


## Setup

1. Clone this repository to your local machine.

   ```
   git clone https://github.com/mateusdreher/o2filmes-challenge
   cd o2filmes-challenge
	```

2. Create a .env file in the root of the application and put your github token in it as follows:

	```
	REACT_APP_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
	```
	You can use the provided .env.example file as a template.


3. Install the project dependencies.
	
	```
	npm install
	```

## Usage

Once you have set up your Giphy API key and installed the dependencies, you can start the application by running:

	```bash
	npm start
	```


The application will start, and you can access it in your web browser at http://localhost:3000.

Enter your search query in the input field and press Enter to see repositories related to your query.