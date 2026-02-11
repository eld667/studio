
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Scissors, 
  Sparkles, 
  ShieldCheck, 
  Users,
  Award,
  ArrowRight,
  Palette,
  Droplet,
  User,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/app/FadeIn';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SALON_COLORS = {
  primary: '#9C4D8C',
  secondary: '#D4A5A5',
  accent: '#F4A261',
  background: '#FAF8F5',
  text: '#333333',
};

const services = [
  {
    title: "Haircuts & Styling",
    description: "Expert haircuts & styling with quality guarantee",
    icon: Scissors
  },
  {
    title: "Color & Highlights",
    description: "Expert color & highlights with quality guarantee",
    icon: Palette
  },
  {
    title: "Balayage & Ombre",
    description: "Expert balayage & ombre with quality guarantee",
    icon: Droplet
  },
  {
    title: "Hair Treatments",
    description: "Expert hair treatments with quality guarantee",
    icon: Sparkles
  },
  {
    title: "Special Occasion Styling",
    description: "Expert special occasion styling with quality guarantee",
    icon: Award
  },
  {
    title: "Men's Cuts",
    description: "Expert men's cuts with quality guarantee",
    icon: User
  }
];

const testimonials = [
  {
    name: "Amanda M.",
    text: "This is hands down the best hair_salon I've ever used. reasonable prices!",
    rating: 5
  },
  {
    name: "Nicole L.",
    text: "This is hands down the best hair_salon I've ever used. listened to what I wanted!",
    rating: 5
  },
  {
    name: "Jennifer G.",
    text: "This is hands down the best hair_salon I've ever used. clean!",
    rating: 5
  }
];

const features = [
  {
    title: "Experienced Professionals",
    description: "Years of expertise in hair salon",
    icon: Users
  },
  {
    title: "Customer-First Approach",
    description: "Your satisfaction is our priority",
    icon: Heart
  },
  {
    title: "Quality Guaranteed",
    description: "We stand behind our work",
    icon: ShieldCheck
  },
  {
    title: "Local & Trusted",
    description: "Part of the Manchester community",
    icon: MapPin
  }
];

export default function ManchesterHairStudioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hair-hero');
  const teamImage = PlaceHolderImages.find(img => img.id === 'hair-stylist');
  const interiorImage = PlaceHolderImages.find(img => img.id === 'hair-interior');
  const mapImage = PlaceHolderImages.find(img => img.id === 'hair-map');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#333333] selection:bg-[#9C4D8C] selection:text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#9C4D8C] rounded-lg flex items-center justify-center">
              <Scissors className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#9C4D8C]">Manchester Hair Studio</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('about')} className="hover:text-[#9C4D8C] transition-colors">About</button>
            <button onClick={() => scrollTo('services')} className="hover:text-[#9C4D8C] transition-colors">Services</button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-[#9C4D8C] transition-colors">Reviews</button>
            <button onClick={() => scrollTo('location')} className="hover:text-[#9C4D8C] transition-colors">Contact</button>
            <a href="tel:8137544963">
              <Button className="bg-[#9C4D8C] hover:bg-[#9C4D8C]/90 text-white font-bold px-6">
                Book Now
              </Button>
            </a>
          </div>

          <button className="md:hidden text-[#9C4D8C]" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-white md:hidden"
          >
            <div className="p-6">
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-[#9C4D8C]" /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold text-[#9C4D8C]">
                <button onClick={() => scrollTo('about')}>About Us</button>
                <button onClick={() => scrollTo('services')}>Our Services</button>
                <button onClick={() => scrollTo('testimonials')}>Customer Stories</button>
                <button onClick={() => scrollTo('location')}>Visit Us</button>
                <a href="tel:8137544963" className="mt-8">
                  <Button className="w-full bg-[#9C4D8C] text-white py-8 text-xl">
                    Call (813) 754-4963
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
            <Image
              src={heroImage?.imageUrl || ''}
              alt="Manchester Hair Studio"
              fill
              className="object-cover"
              priority
              data-ai-hint="hair salon"
            />
          </div>
          
          <div className="container relative z-20 mx-auto px-6">
            <FadeIn className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#9C4D8C]/10 text-[#9C4D8C] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4 fill-current" />
                5.0 Stars | 136+ Happy Customers
              </div>
              <h1 className="text-5xl md:text-8xl font-bold text-[#9C4D8C] leading-[1.1] mb-6">
                Manchester Hair Studio
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-10 font-medium">
                Transform Your Look
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <a href="tel:8137544963" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-[#F4A261] hover:bg-[#f4a261]/90 text-white font-extrabold text-2xl px-12 py-8 h-auto shadow-2xl hover:scale-105 transition-all">
                    Call Now: (813) 754-4963
                  </Button>
                </a>
                <button onClick={() => scrollTo('location')} className="flex items-center gap-2 text-[#9C4D8C] font-bold hover:underline text-lg">
                  Get Directions <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              
              <p className="mt-14 text-sm text-gray-500 font-bold uppercase tracking-[0.2em]">
                Serving Manchester for over 10 years
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-24 md:py-40 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold text-[#9C4D8C] mb-8">About Manchester Hair Studio</h2>
                <p className="text-xl leading-relaxed text-gray-600 mb-10">
                  Welcome to Manchester Hair Studio, where style meets personality. Our talented team of stylists in Manchester specializes in creating looks that make you feel confident and beautiful. From precision cuts to stunning color, we use premium products and the latest techniques to bring your vision to life. Step in, relax, and let us transform your look.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    "136+ satisfied customers",
                    "Locally owned and operated",
                    "Professional team",
                    "6 premium services"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#D4A5A5]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="text-[#9C4D8C] w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10">
                  <Image
                    src={teamImage?.imageUrl || ''}
                    alt="Our Stylists"
                    fill
                    className="object-cover"
                    data-ai-hint="hair stylist"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#D4A5A5]/20 rounded-full blur-3xl -z-10" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section id="services" className="py-24 md:py-40 bg-[#FAF8F5]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold text-[#9C4D8C] mb-6">Our Services</h2>
                <p className="text-xl text-gray-600 font-medium">Professional solutions tailored to your unique style</p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <Card className="h-full border-none shadow-xl hover:-translate-y-3 transition-all duration-300 group overflow-hidden bg-white">
                      <CardContent className="p-10 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[#9C4D8C]/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#9C4D8C] group-hover:text-white transition-colors duration-300">
                          <Icon className="text-[#9C4D8C] group-hover:text-white w-10 h-10 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-[#9C4D8C]">{service.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-lg">{service.description}</p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* 4. TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-24 md:py-40 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold text-[#9C4D8C] mb-6">What Our Customers Say</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 text-[#F4A261] fill-current" />
                  ))}
                </div>
                <p className="text-2xl text-gray-600 font-medium">5.0 out of 5 stars based on 136 reviews</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-[#FAF8F5] p-12 rounded-[2.5rem] relative h-full flex flex-col">
                    <div className="flex gap-1 mb-8">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#F4A261] fill-current" />
                      ))}
                    </div>
                    <p className="text-xl italic text-gray-700 mb-10 leading-relaxed flex-grow">"{t.text}"</p>
                    <div className="font-bold text-[#9C4D8C] text-lg">— {t.name}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <FadeIn>
                <span className="inline-flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-[0.3em] bg-gray-50 px-6 py-3 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Verified Google Reviews
                </span>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE US */}
        <section className="py-24 md:py-40 bg-[#9C4D8C] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-24">Why Choose Manchester Hair Studio?</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1} className="text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                      <Icon className="w-10 h-10 text-[#F4A261]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-rose-100 text-lg">{feature.description}</p>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. LOCATION & HOURS */}
        <section id="location" className="py-24 md:py-40 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold text-[#9C4D8C] mb-16">Visit Us</h2>
                <div className="space-y-12">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-[#D4A5A5]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#9C4D8C] w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl mb-3 text-[#9C4D8C]">Address</h4>
                      <p className="text-gray-600 text-xl leading-relaxed">9207 Main Dr, Manchester, NH 13013</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-[#D4A5A5]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#9C4D8C] w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl mb-3 text-[#9C4D8C]">Phone</h4>
                      <a href="tel:8137544963" className="text-gray-600 text-xl hover:text-[#9C4D8C] hover:underline transition-colors">(813) 754-4963</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-[#D4A5A5]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Clock className="text-[#9C4D8C] w-7 h-7" />
                    </div>
                    <div className="w-full">
                      <h4 className="font-bold text-2xl mb-6 text-[#9C4D8C]">Studio Hours</h4>
                      <div className="space-y-4 text-gray-600 max-w-md text-lg">
                        <div className="flex justify-between border-b border-gray-100 pb-2"><span>Mon - Fri</span> <span className="font-bold">8:00 AM - 7:00 PM</span></div>
                        <div className="flex justify-between border-b border-gray-100 pb-2"><span>Saturday</span> <span className="font-bold">9:00 AM - 2:00 PM</span></div>
                        <div className="flex justify-between text-gray-400"><span>Sunday</span> <span>Closed</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16">
                   <Link href="https://maps.google.com" target="_blank">
                    <Button size="lg" className="bg-[#9C4D8C] text-white px-12 py-7 text-xl h-auto rounded-full hover:scale-105 transition-transform shadow-lg">
                      Get Directions
                    </Button>
                   </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="relative">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl z-10">
                  <Image
                    src={mapImage?.imageUrl || ''}
                    alt="Map Location"
                    fill
                    className="object-cover"
                    data-ai-hint="city map"
                  />
                </div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F4A261]/10 rounded-full blur-3xl -z-10" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 7. CALL-TO-ACTION SECTION */}
        <section className="py-24 md:py-48 bg-[#9C4D8C] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9C4D8C] to-[#7a3c6e] z-0" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-8xl font-bold mb-10 tracking-tight">Ready to Transform Your Look?</h2>
              <p className="text-xl md:text-3xl text-rose-100 mb-16 max-w-3xl mx-auto font-medium">
                Contact us today and experience the difference of expert styling in a welcoming studio environment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a href="tel:8137544963" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-white text-[#9C4D8C] hover:bg-rose-50 font-extrabold text-3xl px-16 py-10 h-auto shadow-2xl rounded-full transition-all">
                    Call (813) 754-4963
                  </Button>
                </a>
                <button onClick={() => scrollTo('location')} className="text-rose-100 font-bold hover:text-white transition-colors underline-offset-8 underline text-xl decoration-2">
                  Get Directions
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#9C4D8C] rounded-xl flex items-center justify-center">
                  <Scissors className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-[#9C4D8C]">Manchester Hair Studio</span>
              </div>
              <p className="text-gray-500 mb-8 text-lg">Transform Your Look with the city's finest stylists.</p>
              <div className="flex items-center gap-2 text-[#F4A261]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                <span className="text-sm font-bold text-gray-400 ml-2">5.0 on Google</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-8 text-[#9C4D8C]">Quick Links</h4>
              <ul className="space-y-5 text-gray-500 text-lg">
                <li><button onClick={() => scrollTo('nav')} className="hover:text-[#9C4D8C] transition-colors">Home</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-[#9C4D8C] transition-colors">About Us</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#9C4D8C] transition-colors">Services</button></li>
                <li><button onClick={() => scrollTo('location')} className="hover:text-[#9C4D8C] transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8 text-[#9C4D8C]">Contact Details</h4>
              <ul className="space-y-6 text-gray-500 text-lg">
                <li className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#D4A5A5] flex-shrink-0 mt-1" />
                  <span>9207 Main Dr<br/>Manchester, NH 13013</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#D4A5A5] flex-shrink-0" />
                  <span>(813) 754-4963</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8 text-[#9C4D8C]">Hours</h4>
              <ul className="space-y-4 text-gray-500 text-lg">
                <li className="flex justify-between"><span>Mon - Fri</span> <span className="font-bold">8am - 7pm</span></li>
                <li className="flex justify-between"><span>Sat</span> <span className="font-bold">9am - 2pm</span></li>
                <li className="flex justify-between text-gray-300"><span>Sun</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-12 text-center text-gray-400 font-medium">
            <p>&copy; {new Date().getFullYear()} Manchester Hair Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-8 left-8 right-8 z-50">
        <a href="tel:8137544963">
          <Button className="w-full bg-[#F4A261] hover:bg-[#f4a261]/90 text-white font-bold py-8 text-xl shadow-2xl rounded-full flex items-center justify-center gap-4">
            <Phone className="w-6 h-6" />
            Book Now: (813) 754-4963
          </Button>
        </a>
      </div>
    </div>
  );
}
