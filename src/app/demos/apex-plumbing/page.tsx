
import { ShieldCheck, Award, Star, Phone, Wrench, Droplets, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ApexPlumbingDemo() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Apex Plumbing</h1>
          <Button variant="outline" className="text-blue-600 bg-white hover:bg-gray-100">
            <Phone className="mr-2 h-4 w-4" /> (123) 456-7890
          </Button>
        </nav>
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            24/7 Emergency Plumbing in Your City
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Fast, reliable, and professional service when you need it most.
          </p>
          <Button size="lg" className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">
            <Phone className="mr-3" /> Get Emergency Help Now
          </Button>
        </div>
      </header>

      <main>
        {/* Trust Badges Section */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold">Fully Licensed</h3>
                <p className="mt-1 text-gray-600">Certified and trained professionals.</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold">Insured & Bonded</h3>
                <p className="mt-1 text-gray-600">Your property and our work are protected.</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold">5-Star Rated</h3>
                <p className="mt-1 text-gray-600">Trusted by hundreds of homeowners.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <Droplets className="h-16 w-16 text-orange-500 mx-auto" />
                <h3 className="mt-6 text-2xl font-semibold">Leak Repair</h3>
                <p className="mt-2 text-gray-600">From tiny drips to major pipe bursts, we find and fix them fast.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <Thermometer className="h-16 w-16 text-orange-500 mx-auto" />
                <h3 className="mt-6 text-2xl font-semibold">Water Heaters</h3>
                <p className="mt-2 text-gray-600">Installation, repair, and maintenance for all major brands.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <Wrench className="h-16 w-16 text-orange-500 mx-auto" />
                <h3 className="mt-6 text-2xl font-semibold">Drain Cleaning</h3>
                <p className="mt-2 text-gray-600">Clogged drains cleared quickly to get your home back to normal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-blue-600 text-white">
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold">Need Help Now?</h2>
            <p className="mt-4 text-lg text-blue-100">Don't wait for a small problem to become a big one.</p>
            <Button size="lg" className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">
              Call (123) 456-7890
            </Button>
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
