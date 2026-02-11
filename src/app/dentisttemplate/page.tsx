
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
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/app/FadeIn';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const DENTIST_COLORS = {
  primary: '#1B4D72',
  secondary: '#4A90A4',
  accent: '#F4A261',
  background: '#FAF8F5',
  text: '#333333',
};

const services = [
  {
    title: "General Dentistry",
    description: "Expert general dentistry with quality guarantee",
    icon: Stethoscope
  },
  {
    title: "Teeth Cleaning",
    description: "Expert teeth cleaning with quality guarantee",
    icon: Sparkles
  },
  {
    title: "Cosmetic Dentistry",
    description: "Expert cosmetic dentistry with quality guarantee",
    icon: Award
  },
  {
    title: "Dental Implants",
    description: "Expert dental implants with quality guarantee",
    icon: ShieldCheck
  }
];

const testimonials = [
  {
    name: "Ryan G.",
    text: "Outstanding experience from start to finish. affordable and very professional.",
    rating: 5
  },
  {
    name: "Ryan S.",
    text: "This is hands down the best dentist I've ever used. modern office!",
    rating: 5
  },
  {
    name: "Jessica D.",
    text: "Absolutely love this place! The staff is so pain-free and the service is top-notch.",
    rating: 4
  }
];

const features = [
  {
    title: "Experienced Professionals",
    description: "Years of expertise in dentistry",
    icon: Users
  },
  {
    title: "Customer-First Approach",
    description: "Your satisfaction is our priority",
    icon: HeartIcon
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

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function DentistTemplatePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroImage = PlaceHolderImages.find(img => img.id === 'dentist-hero');
  const teamImage = PlaceHolderImages.find(img => img.id === 'dentist-team');
  const mapImage = PlaceHolderImages.find(img => img.id === 'dentist-map');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#333333] selection:bg-[#1B4D72] selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1B4D72] rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1B4D72]">Bright Smile</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('about')} className="hover:text-[#1B4D72] transition-colors">About</button>
            <button onClick={() => scrollTo('services')} className="hover:text-[#1B4D72] transition-colors">Services</button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-[#1B4D72] transition-colors">Reviews</button>
            <button onClick={() => scrollTo('location')} className="hover:text-[#1B4D72] transition-colors">Contact</button>
            <a href="tel:4072512856">
              <Button className="bg-[#1B4D72] hover:bg-[#1B4D72]/90 text-white font-bold">
                Call Now
              </Button>
            </a>
          </div>

          <button className="md:hidden text-[#1B4D72]" onClick={() => setIsMenuOpen(true)}>
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
                <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-[#1B4D72]" /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold text-[#1B4D72]">
                <button onClick={() => scrollTo('about')}>About Us</button>
                <button onClick={() => scrollTo('services')}>Our Services</button>
                <button onClick={() => scrollTo('testimonials')}>Patient Stories</button>
                <button onClick={() => scrollTo('location')}>Visit Us</button>
                <a href="tel:4072512856" className="mt-8">
                  <Button className="w-full bg-[#1B4D72] text-white py-8 text-xl">
                    Call (407) 251-2856
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <Image
              src={heroImage?.imageUrl || ''}
              alt="Bright Smile Dentistry"
              fill
              className="object-cover"
              priority
              data-ai-hint="dental office"
            />
          </div>
          
          <div className="container relative z-20 mx-auto px-6">
            <FadeIn className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#1B4D72]/10 text-[#1B4D72] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4 fill-current" />
                4.8 Stars | 201+ Happy Customers
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-[#1B4D72] leading-[1.1] mb-6">
                Bright Smile Dentistry
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
                Gentle Care for the Whole Family
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="tel:4072512856" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-[#F4A261] hover:bg-[#f4a261]/90 text-white font-extrabold text-xl px-12 py-7 h-auto shadow-xl hover:scale-105 transition-all">
                    Call Now: (407) 251-2856
                  </Button>
                </a>
                <button onClick={() => scrollTo('location')} className="flex items-center gap-2 text-[#1B4D72] font-bold hover:underline">
                  Get Directions <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <p className="mt-12 text-sm text-gray-500 font-semibold uppercase tracking-widest">
                Serving Manchester for over 10 years
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1B4D72] mb-8">About Bright Smile Dentistry</h2>
                <p className="text-lg leading-relaxed text-gray-600 mb-8">
                  Bright Smile Dentistry has been serving the Manchester community with exceptional dental care for over a decade. Our team of experienced professionals is dedicated to providing gentle, comprehensive dental services in a comfortable, modern environment.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    "201+ satisfied customers",
                    "Locally owned and operated",
                    "Professional team",
                    "Full service care"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#4A90A4] w-6 h-6 flex-shrink-0" />
                      <span className="font-bold text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  We combine the latest technology with a personal touch to ensure every patient achieves their best smile.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={teamImage?.imageUrl || ''}
                    alt="Our Team"
                    fill
                    className="object-cover"
                    data-ai-hint="dentist team"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section id="services" className="py-24 md:py-32 bg-[#FAF8F5]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1B4D72] mb-6">Our Services</h2>
                <p className="text-xl text-gray-600">Professional solutions tailored to your needs</p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <Card className="h-full border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                      <CardContent className="pt-8 pb-10 px-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#1B4D72]/5 rounded-2xl flex items-center justify-center mb-6">
                          <Icon className="text-[#1B4D72] w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* 4. TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1B4D72] mb-6">What Our Customers Say</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#F4A261] fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-600">4.8 out of 5 stars based on 201 reviews</p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-[#FAF8F5] p-10 rounded-2xl relative">
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#F4A261] fill-current" />
                      ))}
                    </div>
                    <p className="text-lg italic text-gray-700 mb-8 leading-relaxed">"{t.text}"</p>
                    <div className="font-bold text-[#1B4D72]">— {t.name}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Verified Google Reviews
              </span>
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE US */}
        <section className="py-24 md:py-32 bg-[#1B4D72] text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">Why Choose Bright Smile Dentistry?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1} className="text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[#F4A261]" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. LOCATION & HOURS */}
        <section id="location" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1B4D72] mb-12">Visit Us</h2>
                <div className="space-y-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#4A90A4] w-8 h-8 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">Address</h4>
                      <p className="text-gray-600 text-lg">2183 Center Dr, Manchester, NH 71532</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#4A90A4] w-8 h-8 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">Phone</h4>
                      <a href="tel:4072512856" className="text-gray-600 text-lg hover:text-[#1B4D72] hover:underline">(407) 251-2856</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-[#4A90A4] w-8 h-8 mt-1" />
                    <div className="w-full">
                      <h4 className="font-bold text-xl mb-4">Hours</h4>
                      <div className="space-y-2 text-gray-600 max-w-sm">
                        <div className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 7:00 PM</span></div>
                        <div className="flex justify-between font-medium"><span>Saturday - Sunday</span> <span>Closed</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                   <Link href="https://maps.google.com" target="_blank">
                    <Button size="lg" className="bg-[#1B4D72] text-white px-10">Get Directions</Button>
                   </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={mapImage?.imageUrl || ''}
                    alt="Map Location"
                    fill
                    className="object-cover"
                    data-ai-hint="city map"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 7. CALL-TO-ACTION SECTION */}
        <section className="py-24 md:py-32 bg-[#1B4D72] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Get Started?</h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
                Contact us today and experience the difference of gentle, professional dental care.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="tel:4072512856" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-white text-[#1B4D72] hover:bg-white/90 font-extrabold text-2xl px-16 py-8 h-auto shadow-2xl">
                    Call (407) 251-2856
                  </Button>
                </a>
                <button onClick={() => scrollTo('location')} className="text-white/80 font-bold hover:text-white transition-colors underline-offset-4 underline">
                  Get Directions
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#1B4D72] rounded flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-[#1B4D72]">Bright Smile</span>
              </div>
              <p className="text-gray-500 mb-6">Gentle Care for the Whole Family</p>
              <div className="flex items-center gap-1 text-[#F4A261]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <span className="text-xs font-bold text-gray-400 ml-2">4.8 on Google</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-[#1B4D72]">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li><button onClick={() => scrollTo('nav')} className="hover:text-[#1B4D72]">Home</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-[#1B4D72]">About</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#1B4D72]">Services</button></li>
                <li><button onClick={() => scrollTo('location')} className="hover:text-[#1B4D72]">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-[#1B4D72]">Contact</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-[#4A90A4]" />
                  <span>2183 Center Dr<br/>Manchester, NH 71532</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#4A90A4]" />
                  <span>(407) 251-2856</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-[#1B4D72]">Hours</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="flex justify-between"><span>Mon-Fri</span> <span>9:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between"><span>Sat-Sun</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-10 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Bright Smile Dentistry. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <a href="tel:4072512856">
          <Button className="w-full bg-[#F4A261] hover:bg-[#f4a261]/90 text-white font-bold py-6 text-lg shadow-2xl rounded-full flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" />
            Call Now: (407) 251-2856
          </Button>
        </a>
      </div>
    </div>
  );
}
