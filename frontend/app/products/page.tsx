'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { products, categories } from '@/lib/products';
import { useCart } from '@/lib/useCarts';
import { scrollReveal } from '@/lib/gsap-utils';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { addToCart, itemCount, isLoaded } = useCart();

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  useEffect(() => {
    let ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        scrollReveal(el as HTMLElement, 80);
      });

      // Smart scroll hiding nav
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
    });
    
    return () => ctx.revert();
  }, [filteredProducts]);

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
              CART ({isLoaded ? itemCount : 0})
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
            <span className="text-white">PREMIUM</span>
            <br />
            <span className="gradient-text">PRODUCTS</span>
          </h1>
          <p className="text-white/60 max-w-2xl font-mono text-lg">
            Everything you need to level up your brand. Handcrafted by our team of experts.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 font-bold uppercase tracking-widest text-sm border-2 transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white border-primary'
                  : 'border-white/20 text-white/60 hover:border-primary hover:text-primary'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 font-bold uppercase tracking-widest text-sm border-2 transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'border-white/20 text-white/60 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-white/10 hover:border-primary p-6 cyber-border bg-background/30 group hover:bg-background/50 transition-all duration-300"
                data-reveal
              >
                <div className="mb-4 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded border border-primary/30 group-hover:border-primary transition-colors">
                  <div className="text-5xl font-black text-primary neon-glow">◆</div>
                </div>

                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary font-mono text-xs font-bold uppercase tracking-widest">
                    {product.category}
                  </span>

                  <h3 className="text-xl font-black tracking-tight">{product.name}</h3>
                  <p className="text-white/60 text-sm">{product.description}</p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">${product.price}</span>
                    <span className="text-xs text-white/50 font-mono">{product.deliveryTime} delivery</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                        });
                        toast.success(`${product.name} added to cart`);
                      }}
                      className="flex-1 py-2 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-secondary hover:text-background transition-all duration-300"
                    >
                      ADD CART
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 py-2 border-2 border-secondary text-secondary font-bold uppercase tracking-wider text-sm hover:bg-secondary hover:text-background transition-all duration-300 text-center"
                    >
                      VIEW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-primary/30 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">© 2026 ThemeCartel</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
