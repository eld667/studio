
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LuminaHeader } from '@/components/demos/lumina/LuminaHeader';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

const menuItems = [
  {
    name: "Seared Scallops",
    description: "with Saffron Risotto",
    price: "$38",
    image: "/demos/lumina/horisontal_tablewith3foods.jpg"
  },
  {
    name: "Wagyu 'Gold' Sirloin",
    description: "8oz, Potato Purée, Red Wine Jus",
    price: "$95",
    image: "/demos/lumina/horisontal_chefmakingfood1.jpg"
  },
  {
    name: "Chocolate Lava Sphere",
    description: "Raspberry Coulis, Hazelnut Crunch",
    price: "$18",
    image: "/demos/lumina/horisontal_insideview1.jpg"
  }
];

export default function LuminaBistroDemo() {
  const [activeMenuImage, setActiveMenuImage] = useState(menuItems[2].image);

  return (
    <div className={cn("bg-stone-950 text-stone-100 font-sans antialiased", playfair.variable, lato.variable)}>
      
      <LuminaHeader />
      
      <main>
        {/* Section 1: The Cinematic Hero */}
        <section className="relative h-screen flex flex-col justify-end items-start">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/demos/lumina/1920_1080_main_soup.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div className="relative z-20 p-8 md:p-16 max-w-3xl">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white">
              Taste the Extraordinary.
            </h2>
            <div className="w-1/4 h-px bg-[#D4AF37] my-6"></div>
            <p className="font-body text-lg md:text-xl text-stone-300">
              A culinary journey in the heart of the city.
            </p>
          </div>
        </section>

        {/* Section 2: The Philosophy (The Story) */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 w-full h-full">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/demos/lumina/2160_4096_vertical_vine.mp4"
                />
              </div>
            </div>
            <div className="lg:col-span-3 flex gap-8">
              <div className="w-1 h-auto bg-[#D4AF37]/50 hidden lg:block"></div>
              <div>
                <h3 className="font-serif text-5xl md:text-6xl text-white mb-6">Farm to Table.</h3>
                <p className="font-body text-stone-300 leading-relaxed text-lg max-w-prose">
                  At Lumina, we believe that the best meals begin with the finest ingredients. Our philosophy is rooted in a deep respect for nature and a commitment to sourcing locally. Every dish tells a story of the season, crafted with passion by our dedicated team of chefs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 3: The Culinary Showcase */}
        <section className="py-24 md:py-32 px-6 bg-stone-900/50">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-serif text-5xl md:text-6xl text-white text-center mb-16">The Culinary Showcase</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div data-parallax className="lg:col-span-2 aspect-video w-full overflow-hidden rounded-lg">
                <Image src="/demos/lumina/horisontal_chefmakingfood1.jpg" width={1200} height={675} alt="Chef preparing food" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
              <div data-parallax className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                 <Image src="/demos/lumina/vertical_interestingfood1_maybesushisalad.jpg" width={600} height={800} alt="A beautifully plated salad" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
              <div data-parallax className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image src="/demos/lumina/vertical_interestingfood2.jpg" width={600} height={800} alt="Another exquisite dish" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 4: The Essentials */}
        <section className="relative py-24 md:py-32 px-6">
          <AnimatePresence>
            <motion.div
              key={activeMenuImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              <Image src={activeMenuImage} layout="fill" objectFit="cover" alt="Dining atmosphere" />
              <div className="absolute inset-0 bg-stone-950/80"></div>
            </motion.div>
          </AnimatePresence>
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* The Menu */}
            <div>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-12">The Menu</h3>
              <div className="font-body space-y-8">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => setActiveMenuImage(item.image)}
                    className="flex justify-between items-end border-b border-stone-700 pb-4"
                  >
                    <div>
                      <h4 className="text-xl text-white">{item.name}</h4>
                      <p className="text-stone-400 text-sm">{item.description}</p>
                    </div>
                    <span className="text-xl text-white whitespace-nowrap pl-4">...... {item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reserve a Table */}
            <div>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-12">Reserve a Table</h3>
              <form className="space-y-6 font-body">
                <Input type="date" className="bg-stone-900 border-stone-700 h-12 text-base" />
                <div className="grid grid-cols-2 gap-6">
                  <Select>
                      <SelectTrigger className="bg-stone-900 border-stone-700 h-12 text-base">
                          <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent className="bg-stone-900 border-stone-700 text-stone-100">
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                  </Select>
                   <Select>
                      <SelectTrigger className="bg-stone-900 border-stone-700 h-12 text-base">
                          <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-stone-900 border-stone-700 text-stone-100">
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <Button 
                  size="lg" 
                  className="w-full h-12 text-lg bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-stone-950 transition-colors duration-300"
                >
                  Book Now
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Demo Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-3">
        <div className="container mx-auto flex justify-center items-center gap-4">
          <p className="text-sm">
            <span className="font-bold">💡 Concept Demo</span> by EldWorkStudio
          </p>
          <Link href="/" passHref>
            <Button variant="outline" size="sm" className="text-gray-900 bg-white hover:bg-gray-200">
              Return to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

    