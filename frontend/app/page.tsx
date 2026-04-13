'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  textGlitch, 
  magneticButton, 
  floatingText, 
  scrollReveal, 
  createCanvasBackground
} from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      createCanvasBackground(canvasRef.current);
    }

    // Magnetic buttons
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      magneticButton(btn as HTMLElement);
    });

    // Glitch text on hover
    document.querySelectorAll('[data-glitch]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        textGlitch(el as HTMLElement, 0.3);
      });
    });

    // Floating elements
    document.querySelectorAll('[data-float]').forEach((el) => {
      floatingText(el as HTMLElement);
    });

    // Scroll reveals
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      scrollReveal(el as HTMLElement, 80);
    });

    // Moving banner animation
    const banners = document.querySelectorAll('[data-banner]');
    banners.forEach((banner) => {
      gsap.fromTo(
        banner,
        { x: 100 + '%' },
        {
          x: -100 + '%',
          duration: 20,
          repeat: -1,
          ease: 'none',
        }
      );
    });

    // Hero title animation
    if (heroTextRef.current) {
      const chars = heroTextRef.current.querySelectorAll('span');
      gsap.from(chars, {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out',
      });
    }

    // Nav blur on scroll
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
    <div className="relative overflow-hidden bg-background text-foreground scanlines">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

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
          <div className="text-3xl font-black tracking-tighter font-mono">
            <span className="text-primary neon-glow">{'>'}</span>
            <span className="text-secondary">Theme</span>
            <span className="text-primary">Cartel</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link 
              href="/portfolio"
              className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group"
              data-glitch
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/products"
              className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group"
              data-glitch
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about"
              className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group"
              data-glitch
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="#contact"
              className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group"
              data-glitch
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products"
              className="px-6 py-2 block text-center bg-primary text-white font-bold uppercase tracking-wider text-sm border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 cyber-border"
              data-magnetic
            >
              Start
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-primary font-bold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '≡'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/90 backdrop-blur-xl border-t border-primary/30">
            <div className="px-6 py-4 space-y-4">
              <Link 
                href="/portfolio"
                className="block text-white font-mono uppercase text-sm tracking-widest hover:text-primary transition-colors"
              >
                Work
              </Link>
              <Link 
                href="/products"
                className="block text-white font-mono uppercase text-sm tracking-widest hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link 
                href="/about"
                className="block text-white font-mono uppercase text-sm tracking-widest hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link 
                href="#contact"
                className="block text-white font-mono uppercase text-sm tracking-widest hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Moving Banner */}
      <div className="relative z-10 w-full overflow-hidden bg-primary/10 border-y-2 border-primary/30 py-6">
        <div className="flex whitespace-nowrap" data-banner>
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="text-2xl font-black text-secondary uppercase tracking-widest mx-12">
              🔥 Next Level Design • 🚀 Custom Shopify • ✨ 3D Motion Graphics • 
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-12">
              <div className="inline-block">
                <span className="px-4 py-2 border-2 border-secondary text-secondary font-mono uppercase text-xs tracking-widest">
                  ⚡ NEXT GEN AGENCY
                </span>
              </div>
              
              <div ref={heroTextRef} className="space-y-6">
                <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tighter">
                  <span className="block text-white">DESIGN</span>
                  <span className="block gradient-text">THAT HITS</span>
                  <span className="block text-secondary">DIFFERENT</span>
                </h1>
              </div>
              
              <p className="text-lg text-white/70 max-w-md leading-relaxed font-mono">
                Neon-soaked digital experiences. Custom Shopify. 3D logos. Animations that blow minds. Code that crushes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link href="/products"
                  className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 cyber-border text-lg text-center inline-block"
                  data-magnetic
                  data-glitch
                >
                  START NOW
                </Link>
                <Link href="/portfolio"
                  className="px-8 py-4 border-2 border-secondary text-secondary font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300 text-lg text-center inline-block"
                  data-magnetic
                >
                  PORTFOLIO
                </Link>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-3 gap-6 pt-12 border-t border-primary/30">
                <div data-reveal>
                  <div className="text-4xl font-black text-primary">3K+</div>
                  <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Clients</div>
                </div>
                <div data-reveal>
                  <div className="text-4xl font-black text-secondary">500+</div>
                  <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Projects</div>
                </div>
                <div data-reveal>
                  <div className="text-4xl font-black text-purple-400">8+</div>
                  <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Years</div>
                </div>
              </div>
            </div>

            {/* Hero SVG Animation */}
            <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-2xl"
                preserveAspectRatio="xMidYMid meet"
                style={{ filter: 'drop-shadow(0 0 30px rgba(255, 0, 110, 0.5))' }}
              >
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff006e" />
                    <stop offset="50%" stopColor="#8b39ff" />
                    <stop offset="100%" stopColor="#00f5ff" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Animated outer ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="url(#heroGrad)"
                  strokeWidth="3"
                  opacity="0.6"
                  style={{
                    animation: 'spin 8s linear infinite',
                  }}
                />
                
                {/* Inner rotating shape */}
                <g style={{ animation: 'spin-reverse 6s linear infinite' }}>
                  <polygon
                    points="200,80 280,200 200,320 120,200"
                    fill="none"
                    stroke="#ff006e"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                </g>
                
                {/* Pulsing center dot */}
                <circle
                  cx="200"
                  cy="200"
                  r="20"
                  fill="#ff006e"
                  filter="url(#glow)"
                  style={{
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                
                {/* Orbiting elements */}
                <g style={{ animation: 'orbit 12s linear infinite' }}>
                  <circle cx="200" cy="100" r="8" fill="#00f5ff" filter="url(#glow)" />
                </g>
                <g style={{ animation: 'orbit 12s linear infinite 4s' }}>
                  <circle cx="280" cy="200" r="8" fill="#8b39ff" filter="url(#glow)" />
                </g>
                <g style={{ animation: 'orbit 12s linear infinite 8s' }}>
                  <circle cx="200" cy="300" r="8" fill="#ff006e" filter="url(#glow)" />
                </g>
              </svg>

              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                  to { transform: rotate(-360deg); }
                }
                @keyframes pulse {
                  0%, 100% { r: 20; opacity: 1; }
                  50% { r: 30; opacity: 0.6; }
                }
                @keyframes orbit {
                  to { transform: rotate(360deg) translateX(100px); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-white">WHAT WE</span>
              <br />
              <span className="gradient-text">ACTUALLY</span>
              <br />
              <span className="text-secondary">DO</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Custom Shopify Themes",
                description: "Blazing fast, conversion-focused themes that make money. Starting at $50.",
                color: 'border-primary'
              },
              {
                title: "3D Logo Design",
                description: "Dimensional logos that actually pop. With animations and full brand guidelines.",
                color: 'border-secondary'
              },
              {
                title: "3D Animations",
                description: "Motion graphics so fire your competitors will want them too.",
                color: 'border-purple-400'
              },
              {
                title: "Graphic Design",
                description: "Brand identity, socials, merch, posters. Everything visual.",
                color: 'border-primary'
              },
              {
                title: "Web Development",
                description: "High-performance custom sites. React, Next.js, GSAP magic.",
                color: 'border-secondary'
              },
              {
                title: "Brand Strategy",
                description: "We figure out what makes your brand actually special.",
                color: 'border-purple-400'
              }
            ].map((service, idx) => (
              <div 
                key={idx}
                className={`p-8 border-2 ${service.color} bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 group cursor-pointer relative overflow-hidden`}
                data-reveal
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="relative z-10 py-32 px-6 border-t-2 border-primary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="gradient-text">BEST SELLERS</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto font-mono text-lg">
              Thousands of agencies using our themes and design tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "3D LOGO PKG",
                price: "$35",
                originalPrice: "$50",
                badge: "FIRE",
                color: 'border-primary'
              },
              {
                name: "PREMIUM THEMES",
                price: "From $75",
                originalPrice: "$200",
                badge: "CRAZY",
                color: 'border-secondary'
              },
              {
                name: "BRAND KIT",
                price: "From $50",
                color: 'border-purple-400'
              }
            ].map((product, idx) => (
              <div 
                key={idx}
                className={`border-2 ${product.color} p-8 bg-background/50 backdrop-blur-sm cyber-border group hover:bg-background/80 transition-all duration-300`}
                data-reveal
                data-magnetic
              >
                {product.badge && (
                  <div className="mb-4 inline-block px-3 py-1 bg-primary/20 border border-primary text-primary font-mono text-xs font-bold uppercase tracking-widest">
                    {product.badge}
                  </div>
                )}
                <h3 className="text-2xl font-black mb-4 tracking-tight">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-4xl font-black text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-white/40 line-through font-mono">{product.originalPrice}</span>
                  )}
                </div>

                <Link href="/products" className="block text-center w-full py-3 bg-primary text-white font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300">
                  GET IT
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight">
              <span className="text-white">RECENT</span>
              <br />
              <span className="gradient-text">WORK</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Luxury Brand ID",
                category: "BRANDING",
                color: 'border-primary'
              },
              {
                title: "E-Commerce X",
                category: "SHOPIFY",
                color: 'border-secondary'
              },
              {
                title: "3D Animation",
                category: "MOTION",
                color: 'border-purple-400'
              },
              {
                title: "Web Experience",
                category: "DEVELOPMENT",
                color: 'border-primary'
              }
            ].map((project, idx) => (
              <div 
                key={idx}
                className="group cursor-pointer"
                data-reveal
              >
                <div className={`aspect-video border-2 ${project.color} bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-background/80 transition-all duration-300 mb-4 cyber-border`}>
                  <div className="text-5xl font-black text-primary neon-glow group-hover:animate-bounce">
                    ⚡
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 group-hover:text-secondary transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-primary font-mono font-bold uppercase tracking-widest">{project.category}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-16">
            <Link href="/portfolio" className="inline-block px-12 py-4 bg-primary text-white font-black uppercase tracking-widest border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 cyber-border text-lg">
              See All Work →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 py-32 px-6 border-t-2 border-primary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight">
              WHY
              <br />
              <span className="gradient-text">CHOOSE US</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "8+ YEARS DEEP", desc: "Experience that actually matters" },
              { title: "RESULTS ONLY", desc: "Measurable growth, always" },
              { title: "NO COMPROMISES", desc: "Quality is non-negotiable" },
              { title: "24/7 SUPPORT", desc: "Always here for you" },
              { title: "CUTTING EDGE", desc: "Latest tech, always" },
              { title: "TRANSPARENT", desc: "No BS pricing" }
            ].map((reason, idx) => (
              <div 
                key={idx} 
                className="border-2 border-white/10 hover:border-primary p-6 cyber-border bg-background/30 group hover:bg-background/50 transition-all duration-300"
                data-reveal
              >
                <div className="text-3xl font-black text-primary mb-3 tracking-tight">{reason.title}</div>
                <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6 border-t-2 border-primary/30">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-6xl md:text-7xl font-black tracking-tight">
            LET&apos;S BUILD
            <br />
            <span className="gradient-text">SOMETHING CRAZY</span>
          </h2>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Your brand. Our expertise. Let&apos;s create something that breaks the internet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 cyber-border text-lg"
              data-magnetic
              data-glitch
            >
              START PROJECT
            </button>
            <Link href="/products"
              className="px-12 py-4 border-2 border-secondary text-secondary font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300 text-lg inline-block"
              data-magnetic
            >
              PRICING
            </Link>
          </div>

          <form id="contact-form" onSubmit={(e) => { e.preventDefault(); import('sonner').then(m => m.toast.success("Message sent successfully!")); (e.target as HTMLFormElement).reset(); }} className="space-y-4 max-w-2xl mx-auto pt-12">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="NAME"
                className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary font-mono text-sm uppercase tracking-widest"
              />
              <input
                type="email"
                placeholder="EMAIL"
                className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary font-mono text-sm uppercase tracking-widest"
              />
            </div>
            <textarea
              placeholder="YOUR PROJECT DETAILS"
              rows={5}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary font-mono text-sm uppercase tracking-widest resize-none"
            />
            <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300 cyber-border text-lg">
              SEND IT
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-primary/30 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-black mb-4 font-mono">
                <span className="text-primary">{'>'}</span>
                <span className="text-secondary">Theme</span>
              </div>
              <p className="text-white/50 text-sm">Design that hits different.</p>
            </div>
            
            <div>
              <h4 className="font-black mb-4 uppercase tracking-widest text-sm">Services</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Shopify</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">3D Design</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Web Dev</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Branding</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4 uppercase tracking-widest text-sm">Company</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Work</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4 uppercase tracking-widest text-sm">Socials</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-4">
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest">© 2026 ThemeCartel</p>
              <div className="flex gap-6">
                <a href="#" className="text-white/40 text-xs hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="text-white/40 text-xs hover:text-secondary transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
