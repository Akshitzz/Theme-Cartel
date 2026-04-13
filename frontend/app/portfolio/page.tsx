'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { scrollReveal } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: 'Luxury E-Commerce Redesign',
    category: 'Web Design',
    year: '2024',
    description: 'Complete redesign and development of luxury fashion e-commerce platform with custom animations.',
  },
  {
    id: 2,
    title: '3D Brand Animation',
    category: 'Motion Design',
    year: '2024',
    description: 'Cinematic 3D animation series for brand launch campaign reaching 2M+ views.',
  },
  {
    id: 3,
    title: 'Custom Shopify Theme',
    category: 'Development',
    year: '2023',
    description: 'High-converting Shopify theme for tech startup resulting in 45% increase in sales.',
  },
  {
    id: 4,
    title: 'Complete Brand Identity',
    category: 'Branding',
    year: '2023',
    description: 'Full brand system including logo, guidelines, and marketing materials for SaaS company.',
  },
  {
    id: 5,
    title: 'Motion Graphics Campaign',
    category: 'Animation',
    year: '2023',
    description: 'Series of animated explainer videos for product launch campaign.',
  },
  {
    id: 6,
    title: 'Interactive Web Experience',
    category: 'Development',
    year: '2024',
    description: 'Cutting-edge interactive website with GSAP animations and immersive user experience.',
  },
];

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      scrollReveal(el as HTMLElement, 80);
    });

    if (navRef.current) {
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.getVelocity() > 500) {
            gsap.to(navRef.current, { y: -80, overwrite: 'auto', duration: 0.2 });
          } else if (self.direction < 0) {
            gsap.to(navRef.current, { y: 0, overwrite: 'auto', duration: 0.2 });
          } else {
            gsap.to(navRef.current, { y: -80, overwrite: 'auto', duration: 0.2 });
          }
        },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground scanlines">
      <canvas className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60" />

      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-primary/30"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 0, 21, 0.8), rgba(26, 0, 51, 0.8))',
          boxShadow: '0 0 30px rgba(255, 0, 110, 0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <Link href="/" className="text-3xl font-black tracking-tighter font-mono">
            <span className="text-primary neon-glow">{'>'}</span>
            <span className="text-secondary">Theme</span>
            <span className="text-primary">Cartel</span>
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/portfolio" className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all">Work</Link>
            <Link href="/products" className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all">Products</Link>
            <Link href="/about" className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all">About</Link>
            <Link href="/cart" className="px-6 py-2 bg-primary text-white font-bold uppercase tracking-wider text-sm border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 cyber-border">
              CART
            </Link>
          </div>

          <button 
            className="md:hidden text-2xl text-primary font-bold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '≡'}
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="relative z-10 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-white">OUR</span>
            <br />
            <span className="gradient-text">BEST WORK</span>
          </h1>
          <p className="text-white/60 max-w-2xl font-mono text-lg">
            A showcase of projects that pushed boundaries and delivered results.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                data-reveal
              >
                <div className="aspect-video border-2 border-white/10 hover:border-primary bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 mb-4 cyber-border">
                  <div className="text-5xl font-black text-primary neon-glow group-hover:animate-pulse">
                    ◆
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary/20 border border-primary text-primary font-mono text-xs font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-white/50 font-mono text-xs">{item.year}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black group-hover:text-secondary transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 border-t-2 border-primary/30">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-white">READY TO</span>
            <br />
            <span className="gradient-text">START YOUR PROJECT?</span>
          </h2>
          <Link
            href="/products"
            className="inline-block px-12 py-4 bg-primary text-white font-black uppercase tracking-widest border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 cyber-border text-lg"
          >
            EXPLORE PRODUCTS
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-primary/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">© 2026 Theme-Cartel</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
