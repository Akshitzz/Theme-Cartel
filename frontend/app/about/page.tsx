'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { scrollReveal } from '@/lib/gsap-utils';

export default function About() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        scrollReveal(el as HTMLElement, 80);
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-background text-foreground scanlines min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-primary/30 py-4" style={{ background: 'linear-gradient(135deg, rgba(10, 0, 21, 0.8), rgba(26, 0, 51, 0.8))' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          <a href="/" className="text-2xl font-black tracking-tighter font-mono">
            <span className="text-primary">{'>'}</span>
            <span className="text-secondary">ThemeCartel</span>
          </a>
          <a href="/" className="text-white font-mono uppercase text-sm tracking-widest hover:text-secondary transition-all">Back Home</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="gradient-text">ABOUT US</span>
          </h1>
          <p className="text-white/60 font-mono text-lg">
            We&apos;re a digital agency obsessed with creating work that matters.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="relative z-10 py-24 px-6 border-t border-primary/30">
        <div className="max-w-3xl mx-auto space-y-12">
          <div data-reveal>
            <h2 className="text-4xl font-black mb-6 tracking-tight">The Story</h2>
            <p className="text-white/70 leading-relaxed text-lg mb-4">
              ThemeCartel started with a simple mission: create digital experiences that blow people&apos;s minds. We got tired of generic, boring design. We wanted to build something different.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Eight years later, we&apos;ve worked with 3,000+ brands and delivered 500+ projects that actually moved the needle. From indie startups to enterprise companies, we bring the same energy and excellence to every single project.
            </p>
          </div>

          <div data-reveal>
            <h2 className="text-4xl font-black mb-6 tracking-tight">Our Philosophy</h2>
            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed text-lg">
                <span className="text-secondary font-black">Design First.</span> We believe great design solves problems. It&apos;s not just about looking cool (though it should). Every pixel has a purpose.
              </p>
              <p className="text-white/70 leading-relaxed text-lg">
                <span className="text-secondary font-black">Results Matter.</span> If it doesn&apos;t move your business forward, it&apos;s not done. We measure success by your success.
              </p>
              <p className="text-white/70 leading-relaxed text-lg">
                <span className="text-secondary font-black">Push Boundaries.</span> We&apos;re always experimenting, always learning, always pushing what&apos;s possible on the web.
              </p>
            </div>
          </div>

          <div data-reveal>
            <h2 className="text-4xl font-black mb-6 tracking-tight">The Team</h2>
            <p className="text-white/70 leading-relaxed text-lg mb-8">
              We&apos;re a lean, mean, creative machine. Every person on our team is hand-picked for their skills and passion. We don&apos;t hire for experience alone—we hire for attitude and drive.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Alex Chen', role: 'Creative Director', bio: '8+ years pushing pixels and boundaries' },
                { name: 'Jordan Lee', role: 'Lead Developer', bio: 'Next.js wizard and performance obsessive' },
                { name: 'Sam Martinez', role: 'Brand Strategist', bio: 'Turns chaos into clarity, always' },
                { name: 'Casey Johnson', role: 'Motion Designer', bio: 'Makes things move in ways you didn\'t think possible' }
              ].map((member, idx) => (
                <div key={idx} className="border-2 border-primary/30 p-6" data-reveal>
                  <h3 className="text-lg font-black text-secondary mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-white/60">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal>
            <h2 className="text-4xl font-black mb-6 tracking-tight">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '3K+', label: 'Happy Clients' },
                { number: '500+', label: 'Projects Done' },
                { number: '8+', label: 'Years Running' },
                { number: '0', label: 'Boring Projects' }
              ].map((stat, idx) => (
                <div key={idx} className="border-2 border-secondary/30 p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">{stat.number}</div>
                  <p className="text-xs text-white/50 font-mono uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal>
            <h2 className="text-4xl font-black mb-6 tracking-tight">Get In Touch</h2>
            <p className="text-white/70 leading-relaxed text-lg mb-8">
              Have a project? Want to collaborate? Just want to chat about design? We&apos;re always down to talk.
            </p>
            <button className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 text-lg">
              Start a Conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
