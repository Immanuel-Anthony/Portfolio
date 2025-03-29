import { SpotifyLayout } from "@/components/spotify-layout"
import { AllProjectsView } from "@/components/all-projects-view"

export default function ProjectsPage() {
  const githubUsername = "Immanuel-Anthony"

  return (
    <SpotifyLayout activeSection="projects" showFullProfile={false} githubUsername={githubUsername}>
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-3xl font-bold mt-8">All Projects</h1>
        <AllProjectsView />
      </div>
    </SpotifyLayout>
  )
}

