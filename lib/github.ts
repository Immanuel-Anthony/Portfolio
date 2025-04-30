// lib/github.ts

const GITHUB_USERNAME = "Immanuel-Anthony";

export async function fetchGitHubRepos() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token not provided!");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      console.error("Invalid data format from GitHub API");
      return [];
    }

    const repoWithDetails = await Promise.all(
      repos.map(async (repo: any) => {
        try {
          const langResponse = await fetch(repo.languages_url, {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          const languages = langResponse.ok ? await langResponse.json() : {};

          return {
            id: repo.id,
            title: repo.name,
            description: repo.description || "No description provided",
            githubUrl: repo.html_url,
            techStack: Object.keys(languages),
            liveUrl: repo.homepage || "",
          };
        } catch (langError) {
          console.warn(`Failed to fetch languages for repo: ${repo.name}`, langError);
          return {
            id: repo.id,
            title: repo.name,
            description: repo.description || "No description provided",
            githubUrl: repo.html_url,
            techStack: [],
            liveUrl: repo.homepage || "",
          };
        }
      })
    );

    return repoWithDetails;

  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
