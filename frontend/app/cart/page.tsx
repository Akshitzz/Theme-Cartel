'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useCart } from '@/lib/useCarts';
import { magneticButton } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, isLoaded, clearCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      magneticButton(btn as HTMLElement);
    });
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-white/60 font-mono">Loading cart...</p>
      </div>
    );
  }

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
              CART ({cart.length})
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

      {/* Cart Header */}
      <section className="relative z-10 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-white">YOUR</span>
            <br />
            <span className="gradient-text">CART</span>
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {cart.length === 0 ? (
            <div className="text-center py-20 border-2 border-primary/30 cyber-border bg-background/30">
              <div className="text-6xl font-black text-primary/30 mb-4">📦</div>
              <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
              <p className="text-white/60 mb-8 font-mono">Add some products to get started</p>
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-primary text-white font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300 cyber-border"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 border-white/10 hover:border-primary p-6 bg-background/30 hover:bg-background/50 transition-all duration-300 flex items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-black mb-2">{item.name}</h3>
                      <p className="text-white/60 font-mono text-sm">${item.price} each</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex border-2 border-primary/30">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-primary font-bold hover:bg-primary/20 transition-colors"
                        >
                          −
                        </button>
                        <div className="px-4 py-1 border-l-2 border-r-2 border-primary/30 font-bold min-w-12 text-center">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-primary font-bold hover:bg-primary/20 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-24">
                        <p className="text-xl font-black text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-white/50 font-mono">Subtotal</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 px-4 py-2 text-red-500 font-bold hover:bg-red-500/20 transition-colors border border-red-500/30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals & Checkout */}
              <div className="border-t-2 border-primary/30 pt-8">
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-white/60 font-mono">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 font-mono text-sm">
                    <span>Estimated Tax:</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-primary/30 pt-3 flex justify-between text-2xl font-black">
                    <span>Total:</span>
                    <span className="text-primary">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-lg hover:bg-secondary hover:text-background transition-all duration-300 cyber-border"
                    data-magnetic
                  >
                    PROCEED TO CHECKOUT
                  </button>
                  <Link
                    href="/products"
                    className="block text-center py-4 border-2 border-secondary text-secondary font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && cart.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background border-2 border-primary p-8 max-w-md w-full cyber-border">
            <h2 className="text-2xl font-black mb-6">CHECKOUT</h2>
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary font-mono text-sm uppercase tracking-widest"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary font-mono text-sm uppercase tracking-widest"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary font-mono text-sm uppercase tracking-widest"
              />
              <div className="text-2xl font-black text-primary mb-4">
                Total: ${(total * 1.1).toFixed(2)}
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('Order placed! (Demo)');
                  clearCart();
                  setShowCheckout(false);
                }}
                className="w-full py-3 bg-primary text-white font-black uppercase tracking-widest hover:bg-secondary hover:text-background transition-all duration-300"
              >
                Complete Order
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full py-3 border-2 border-white/20 text-white font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
