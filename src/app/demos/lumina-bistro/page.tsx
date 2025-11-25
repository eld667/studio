
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function LuminaBistroDemo() {
  return (
    <div className={cn("bg-neutral-950 text-neutral-200 font-sans", playfair.variable)}>
      
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-center p-4">
          <p className="text-sm text-neutral-400 mb-2">[ HERO VIDEO SLOT: /demos/lumina/hero.mp4 ]</p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter">
            Dining Reimagined.
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">The Experience</h2>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-neutral-900 aspect-[3/4] flex items-center justify-center text-neutral-500">[ IMAGE 1 ]</div>
                <div className="bg-neutral-900 aspect-[3/4] flex items-center justify-center text-neutral-500">[ IMAGE 2 ]</div>
                <div className="bg-neutral-900 aspect-[3/4] flex items-center justify-center text-neutral-500">[ IMAGE 3 ]</div>
                <div className="bg-neutral-900 aspect-[3/4] flex items-center justify-center text-neutral-500">[ IMAGE 4 ]</div>
                <div className="bg-neutral-900 aspect-[3/4] flex items-center justify-center text-neutral-500">[ IMAGE 5 ]</div>
                <div className="bg-neutral-900 aspect-[3/4] flex items-center justify-center text-neutral-500">[ IMAGE 6 ]</div>
            </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-white text-center mb-12">A Taste of Lumina</h2>
          <div className="space-y-8 border-t border-neutral-800">
            <div className="pt-8">
              <h3 className="font-serif text-3xl text-white">Truffle Radiatore</h3>
              <p className="text-neutral-400 mt-2">Hand-made pasta, black truffle cream, aged parmesan, toasted breadcrumbs.</p>
            </div>
            <div className="border-t border-neutral-800 pt-8">
              <h3 className="font-serif text-3xl text-white">Wagyu "Gold" Steak</h3>
              <p className="text-neutral-400 mt-2">8oz A5 Wagyu, potato purée, red wine reduction, 24k gold leaf.</p>
            </div>
            <div className="border-t border-neutral-800 pt-8">
              <h3 className="font-serif text-3xl text-white">The Sommelier's Flight</h3>
              <p className="text-neutral-400 mt-2">A curated selection of three vintage wines from our private cellar.</p>
            </div>
          </div>
        </div>
      </section>

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
