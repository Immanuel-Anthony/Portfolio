import { SpotifyLayout } from "@/components/spotify-layout"
import { ExperienceSection } from "@/components/experience-section"

export default function ExperiencePage() {
  const githubUsername = "Immanuel-Anthony"

  return (
    <SpotifyLayout activeSection="experience" showFullProfile={false} githubUsername={githubUsername}>
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-3xl font-bold mt-8">Experience Timeline</h1>
        <ExperienceSection />
      </div>
    </SpotifyLayout>
  )
}

