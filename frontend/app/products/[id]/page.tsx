'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getProductById } from '@/lib/products';
import { useCart } from '@/lib/useCarts';
import { magneticButton } from '@/lib/gsap-utils';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { addToCart, itemCount, isLoaded } = useCart();

  useEffect(() => {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      magneticButton(btn as HTMLElement);
    });
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:text-secondary">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    }
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

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

      {/* Product Detail */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/products" className="text-primary hover:text-secondary font-mono text-sm uppercase tracking-widest mb-8 inline-block">
            ← Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="border-2 border-primary h-96 flex items-center justify-center cyber-border bg-gradient-to-br from-primary/20 to-secondary/20">
              <div className="text-7xl font-black text-primary neon-glow">◆</div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary font-mono text-xs font-bold uppercase tracking-widest mb-4">
                  {product.category}
                </span>
                <h1 className="text-5xl font-black tracking-tight mb-4">{product.name}</h1>
                <p className="text-white/70 text-lg leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Price & Details */}
              <div className="border-y-2 border-primary/30 py-6 space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black text-primary">${product.price}</span>
                  <span className="text-white/50 font-mono">One-time payment</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/50 font-mono">Delivery</span>
                    <p className="text-primary font-bold">{product.deliveryTime}</p>
                  </div>
                  <div>
                    <span className="text-white/50 font-mono">Revisions</span>
                    <p className="text-primary font-bold">{product.revisions} rounds</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-black mb-4">WHAT YOU GET</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-white/70 font-mono uppercase text-sm">Quantity</span>
                  <div className="flex border-2 border-primary/30">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-primary font-bold hover:bg-primary/20 transition-colors"
                    >
                      −
                    </button>
                    <div className="px-6 py-2 flex items-center justify-center border-l-2 border-r-2 border-primary/30 font-bold">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-primary font-bold hover:bg-primary/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  data-magnetic
                  className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-lg hover:bg-secondary hover:text-background transition-all duration-300 cyber-border"
                >
                  ADD TO CART - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
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
