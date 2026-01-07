
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, MapPin, Building, BedDouble, Bath } from 'lucide-react';

export default function HorizonDemo() {
  return (
    <div className="bg-neutral-900 text-neutral-100 font-sans">
      <header className="fixed top-0 left-0 w-full z-50 bg-neutral-900/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest uppercase">HORIZON</h1>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <Link href="#" className="hover:text-white">Portfolio</Link>
            <Link href="#" className="hover:text-white">About</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </nav>
          <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800 hover:text-white">
            Inquire
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="h-screen relative flex items-end justify-center text-center">
          <Image 
            src="https://picsum.photos/seed/archi1/1920/1080" 
            alt="Modern architectural home"
            fill
            className="object-cover"
            data-ai-hint="architecture building"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="relative z-10 p-12 mb-12">
            <h2 className="text-5xl md:text-8xl font-thin tracking-widest">SKYLINE RESIDENCE</h2>
            <p className="text-lg text-neutral-300 mt-2">Los Angeles, CA</p>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="py-24 bg-neutral-950">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-serif mb-6 border-l-4 border-neutral-700 pl-4">Project Description</h3>
              <p className="text-neutral-400 leading-relaxed">
                The Skyline Residence is a testament to minimalist luxury, designed to frame the panoramic views of the Los Angeles basin. Clean lines, natural materials, and an open-concept floor plan create a seamless connection between the interior and the expansive outdoor living spaces. Every detail is meticulously crafted to evoke a sense of calm, sophistication, and timeless design.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-neutral-500" />
                <span>Beverly Hills, 90210</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-neutral-500" />
                <span>5,200 sq. ft.</span>
              </div>
               <div className="flex items-center gap-3">
                <BedDouble className="w-5 h-5 text-neutral-500" />
                <span>4 Bedrooms</span>
              </div>
               <div className="flex items-center gap-3">
                <Bath className="w-5 h-5 text-neutral-500" />
                <span>5 Bathrooms</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 px-6">
            <h3 className="text-3xl font-serif mb-12 text-center">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group relative aspect-square col-span-2 row-span-2">
                    <Image src="https://picsum.photos/seed/archi-gal1/1200/1200" alt="Gallery image 1" fill className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" data-ai-hint="minimalist interior" />
                </div>
                <div className="group relative aspect-square">
                    <Image src="https://picsum.photos/seed/archi-gal2/600/600" alt="Gallery image 2" fill className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" data-ai-hint="architecture detail" />
                </div>
                <div className="group relative aspect-square">
                    <Image src="https://picsum.photos/seed/archi-gal3/600/600" alt="Gallery image 3" fill className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" data-ai-hint="modern kitchen" />
                </div>
                <div className="group relative aspect-square">
                    <Image src="https://picsum.photos/seed/archi-gal4/600/600" alt="Gallery image 4" fill className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" data-ai-hint="luxury bathroom" />
                </div>
                <div className="group relative aspect-square">
                    <Image src="https://picsum.photos/seed/archi-gal5/600/600" alt="Gallery image 5" fill className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" data-ai-hint="poolside view" />
                </div>
            </div>
             <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800 hover:text-white">
                    <Camera className="mr-2 h-5 w-5" />
                    Request Virtual Tour
                </Button>
            </div>
        </section>
      </main>

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
