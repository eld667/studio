"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion } from "framer-motion";
import { ProjectCard } from "@/app/ProjectCard";

const projects = [
  {
    title: "Placeholder Project 1",
    description: "This is a placeholder for a future project. We will update this later.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Project+1",
  },
  {
    title: "Placeholder Project 2",
    description: "This is a placeholder for a future project. We will update this later.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Project+2",
  },
  {
    title: "Placeholder Project 3",
    description: "This is a placeholder for a future project. We will update this later.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Project+3",
  },
];

function OurWork() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto py-24 px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Our Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <OurWork />
      </main>
    </div>
  );
}
