// lib/github.ts

// export async function fetchGitHubRepos() {
//   const username = "Immanuel-Anthony"; // Replace with the actual username
//   const token = process.env.GITHUB_TOKEN; // Get the token from environment variables

//   if (!token) {
//     console.error("GitHub token not provided!");
//     return [];
//   }

export async function fetchGitHubRepos() {
  const username = "Immanuel-Anthony";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token not provided!");
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      console.error("Invalid data format from GitHub API");
      return [];
    }

    // Fetch languages for each repo
    const repoWithDetails = await Promise.all(
      repos.map(async (repo: any) => {
        try {
          const langResponse = await fetch(repo.languages_url, {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          const languages = langResponse.ok ? await langResponse.json() : {};

          return {
            id: repo.id,
            title: repo.name, // ✅ FIXED: Renamed `name` to `title`
            description: repo.description || "",
            githubUrl: repo.html_url, // ✅ FIXED: `html_url` is correct key for GitHub link
            techStack: Object.keys(languages), // ✅ FIXED: Return languages properly
            liveUrl: repo.homepage || null, // ✅ FIXED: Include `homepage` as live URL
          };
        } catch (langError) {
          console.warn(`Failed to fetch languages for repo: ${repo.name}`, langError);
          return {
            id: repo.id,
            title: repo.name, // ✅ FIXED: Ensure `title` is set correctly
            description: repo.description || "",
            githubUrl: repo.html_url,
            techStack: [],
            liveUrl: repo.homepage || null,
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