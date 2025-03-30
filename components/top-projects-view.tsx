useEffect(() => {
    async function getRepos() {
      try {
        const data = await fetchGitHubRepos();
        if (data.length === 0) {
          console.warn("No repos found or API error.");
        }
        const starredRepos = data.filter((repo) =>
          starred.includes(repo.id.toString())
        );
        setRepos(starredRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    }
  
    if (starred && starred.length > 0) {
      getRepos();
    } else {
      setLoading(false);
    }
  }, [starred]);
  