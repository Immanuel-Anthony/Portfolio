import { SpotifyLayout } from "@/components/spotify-layout"
import { SkillsSection } from "@/components/skills-section"

export default function SkillsPage() {
  const githubUsername = "Immanuel-Anthony"

  return (
    <SpotifyLayout activeSection="skills" showFullProfile={false} githubUsername={githubUsername}>
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-3xl font-bold mt-8">Top Skills</h1>
        <SkillsSection />
      </div>
    </SpotifyLayout>
  )
}

