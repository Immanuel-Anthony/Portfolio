"use client"

import { useEffect, useState } from "react"

interface SmallProfilePictureProps {
  githubUsername?: string
}

export function SmallProfilePicture({ githubUsername = "Immanuel-Anthony" }: SmallProfilePictureProps) {
  const [profilePic, setProfilePic] = useState("/placeholder.svg?height=48&width=48")

  useEffect(() => {
    if (githubUsername) {
      setProfilePic(`https://github.com/${githubUsername}.png`)
    }
  }, [githubUsername])

  return (
    <div className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-700/50 shadow-lg">
      <img src={profilePic || "/placeholder.svg"} alt="Profile" className="object-cover w-full h-full" />
    </div>
  )
}

