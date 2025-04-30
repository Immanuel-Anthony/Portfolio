import { useEffect, useState } from "react";
import { fetchGitHubRepos } from "@/lib/github"; // Adjust path if necessary

const MyComponent = () => {
  const [repos, setRepos] = useState<any[]>([]); // Use correct type for your repos
  const [loading, setLoading] = useState<boolean>(true);
  const [starred, setStarred] = useState<string[]>([]); // Assuming starred is an array of repo ids

  useEffect(() => {
    async function getRepos() {
      setLoading(true); // Ensure loading state is set at the start
      try {
        const data = await fetchGitHubRepos();
        if (data.length === 0) {
          console.warn("No repos found or API error.");
        }

        // Assuming `starred` contains the ids of the repos you're interested in
        const starredRepos = data.filter((repo) =>
          starred.includes(repo.id.toString()) // Match with `starred` array
        );

        setRepos(starredRepos); // Update the repo state
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    }

    if (starred && starred.length > 0) {
      getRepos();
    } else {
      setLoading(false); // Set loading to false if no starred repos
    }
  }, [starred]); // Ensure that `starred` is included as a dependency

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      {/* Render your repos here */}
      {repos.map((repo) => (
        <div key={repo.id}>
          <h3>{repo.title}</h3>
          <p>{repo.description}</p>
          <a href={repo.githubUrl}>GitHub</a>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
