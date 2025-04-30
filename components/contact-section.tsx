"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com"; // Importing EmailJS library

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    emailjs
      .sendForm(
        "service_4bbumun",     
        "template_ml10gxc",    
        e.currentTarget,       
        "9FL1K2cPwlLIDxUDK"      
      )
      .then(
        (result) => {
          console.log("Message sent: ", result.text);
          setFormState({ name: "", email: "", message: "" });
          alert("Message sent successfully!");
          setIsSubmitting(false);
        },
        (error) => {
          console.error("Error sending message: ", error.text);
          alert("Something went wrong. Please try again later.");
          setIsSubmitting(false);
        }
      );
  };
  
  

  const socialLinks = [
    { name: "GitHub", icon: <Github size={20} />, url: "https://github.com/Immanuel-Anthony" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/immanuel-anthony-660a0b277/" },
    { name: "Email", icon: <Mail size={20} />, url: "mailto:immanuelsanthony@gmail.com" },
  ];

  // 🔹 Fade-in animation without left-right movement
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={container} className="space-y-4">
          <motion.section variants={item}>
            <h3 className="text-xl font-semibold text-gray-200">Let's Connect</h3>
            <p className="text-sm text-gray-400">
              Whether you're looking for a developer, have a question, or just want to chat, feel free to reach out!
            </p>
          </motion.section>

          <motion.section variants={item} className="flex gap-2">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-100 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0px_4px_8px_rgba(34,197,94,0.3)]"
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}
          </motion.section>

          <motion.section variants={item} className="bg-gray-800/40 rounded-lg p-3 space-y-1 shadow-[0px_4px_8px_rgba(34,197,94,0.3)]">
            <h4 className="text-sm font-semibold text-white">Location</h4>
            <p className="text-xs text-gray-400">Hyderabad, Telangana</p>
            <h4 className="text-sm font-semibold text-white">Availability</h4>
            <p className="text-xs text-gray-400">Currently open to freelance and full-time opportunities.</p>
          </motion.section>
        </motion.div>

        <motion.div variants={container} className="bg-gray-800/30 rounded-lg p-4 space-y-3 shadow-[0px_4px_8px_rgba(34,197,94,0.3)]">
          <h3 className="text-xl font-semibold text-gray-200">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <motion.div variants={item}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="bg-gray-700 border-gray-600 rounded-md p-2 mt-1 w-full text-sm shadow-[0px_4px_8px_rgba(34,197,94,0.3)]"
              />
            </motion.div>

            <motion.div variants={item}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Your Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                required
                className="bg-gray-700 border-gray-600 rounded-md p-2 mt-1 w-full text-sm shadow-[0px_4px_8px_rgba(34,197,94,0.3)]"
              />
            </motion.div>

            <motion.div variants={item}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Your Message</label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows={4}
                required
                className="bg-gray-700 border-gray-600 rounded-md p-2 mt-1 w-full text-sm shadow-[0px_4px_8px_rgba(34,197,94,0.3)]"
              />
            </motion.div>

            <motion.div variants={item} className="w-full flex justify-center">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2 shadow-[0px_4px_8px_rgba(34,197,94,0.3)]"
                disabled={isSubmitting} // Disable the button during submission
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={14} />
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
