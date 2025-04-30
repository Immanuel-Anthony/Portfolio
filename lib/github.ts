const GITHUB_USERNAME = "Immanuel-Anthony" // Replace with your GitHub username

export async function fetchGitHubRepos() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories")
  }

  const repos = await response.json()
  return repos.map((repo: any) => ({
    id: repo.id,
    title: repo.name,
    description: repo.description || "No description provided",
    techStack: [], // Optional, since GitHub API does not return tech stack
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || "",
  }))
}
