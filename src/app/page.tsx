"use client";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function OurWork() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto py-24"
    >
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
        Our Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <Link href="#" key={item}>
            <div
              className="bg-gray-900 rounded-xl border border-white/10 p-6 filter transition-all duration-300 ease-in-out hover:scale-103 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            >
              <Image
                src="https://placehold.co/600x400/1e293b/ffffff?text=Project+Demo"
                alt="Project Demo"
                width={600}
                height={400}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Placeholder Project</h3>
              <p className="text-muted-foreground">
                This is a placeholder for a future project. We will update this
                later.
              </p>
            </div>
          </Link>
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
