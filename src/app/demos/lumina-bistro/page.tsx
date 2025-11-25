
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

export default function LuminaBistroDemo() {
  return (
    <div className={cn("bg-stone-950 text-stone-100 font-sans antialiased", playfair.variable, lato.variable)}>
      
      {/* Absolute Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 py-4">
        <h1 className="font-serif text-2xl tracking-widest text-stone-100">LUMINA</h1>
      </div>
      
      <main>
        {/* Section 1: The Cinematic Hero */}
        <section className="relative h-screen flex flex-col justify-end items-start">
          <div className="absolute inset-0 bg-stone-800 z-0">
             {/* Video Placeholder */}
          </div>
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
              <div className="bg-stone-800 aspect-[3/4] w-full flex items-center justify-center text-stone-500">[ Large Vertical Image ]</div>
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
              <div data-parallax className="lg:col-span-2 bg-stone-800 aspect-video w-full flex items-center justify-center text-stone-500">[ Wide Landscape Image ]</div>
              <div data-parallax className="bg-stone-800 aspect-[3/4] w-full flex items-center justify-center text-stone-500">[ Tall Portrait Image 1 ]</div>
              <div data-parallax className="bg-stone-800 aspect-[3/4] w-full flex items-center justify-center text-stone-500">[ Tall Portrait Image 2 ]</div>
            </div>
          </div>
        </section>
        
        {/* Section 4: The Essentials */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* The Menu */}
            <div>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-12">The Menu</h3>
              <div className="font-body space-y-8">
                <div className="flex justify-between items-end border-b border-stone-700 pb-4">
                  <div>
                    <h4 className="text-xl text-white">Seared Scallops</h4>
                    <p className="text-stone-400 text-sm">with Saffron Risotto</p>
                  </div>
                  <span className="text-xl text-white">...... $38</span>
                </div>
                <div className="flex justify-between items-end border-b border-stone-700 pb-4">
                  <div>
                    <h4 className="text-xl text-white">Wagyu "Gold" Sirloin</h4>
                    <p className="text-stone-400 text-sm">8oz, Potato Purée, Red Wine Jus</p>
                  </div>
                  <span className="text-xl text-white">...... $95</span>
                </div>
                <div className="flex justify-between items-end border-b border-stone-700 pb-4">
                  <div>
                    <h4 className="text-xl text-white">Chocolate Lava Sphere</h4>
                    <p className="text-stone-400 text-sm">Raspberry Coulis, Hazelnut Crunch</p>
                  </div>
                  <span className="text-xl text-white">...... $18</span>
                </div>
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
