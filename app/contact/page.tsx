import { SpotifyLayout } from "@/components/spotify-layout"
import { ContactSection } from "@/components/contact-section"

export default function ContactPage() {
  const githubUsername = "Immanuel-Anthony"

  return (
    <SpotifyLayout activeSection="contact" showFullProfile={false} githubUsername={githubUsername}>
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-3xl font-bold mt-8">Get In Touch</h1>
        <ContactSection />
      </div>
    </SpotifyLayout>
  )
}

