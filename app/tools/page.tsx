import { SpotifyLayout } from "@/components/spotify-layout"
import { ToolsSection } from "@/components/tools-section"

export default function ToolsPage() {
  const githubUsername = "Immanuel-Anthony"

  return (
    <SpotifyLayout activeSection="tools" showFullProfile={false} githubUsername={githubUsername}>
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-3xl font-bold mt-8">Tools & Technologies</h1>
        <ToolsSection />
      </div>
    </SpotifyLayout>
  )
}

