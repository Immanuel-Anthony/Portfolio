"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection({ setGithubUsername }: { setGithubUsername: (username: string) => void }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    githubLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract GitHub username from provided link
    const githubMatch = formState.githubLink.match(/github\.com\/([^/]+)/);
    if (githubMatch) {
      const username = githubMatch[1];
      setGithubUsername(username);
    }

    // Reset form
    setFormState({
      name: "",
      email: "",
      message: "",
      githubLink: "",
    });

    alert("Message sent successfully!");
  };

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-6">Contact</h2>
      <motion.div className="bg-neutral-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Send a message</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={formState.name} onChange={handleChange} placeholder="Your name" required />
          <Input name="email" value={formState.email} onChange={handleChange} placeholder="Your email" required />
          <Textarea name="message" value={formState.message} onChange={handleChange} placeholder="Your message" rows={5} required />
          <Input name="githubLink" value={formState.githubLink} onChange={handleChange} placeholder="Your GitHub URL (optional)" />
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
            Send Message <Send size={16} className="ml-2" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
