import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Applies a glitch/scramble animation to a text element.
 */
export function textGlitch(el: HTMLElement, duration = 0.4) {
  const original = el.textContent || ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
  let frame = 0
  const totalFrames = Math.round(duration * 60)

  const interval = setInterval(() => {
    el.textContent = original
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (frame / totalFrames > i / original.length) return char
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    frame++
    if (frame >= totalFrames) {
      el.textContent = original
      clearInterval(interval)
    }
  }, 1000 / 60)
}

/**
 * Adds a magnetic pull effect to a button/element on mouse move.
 */
export function magneticButton(el: HTMLElement, strength = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    gsap.to(el, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  }

  el.addEventListener('mousemove', handleMouseMove)
  el.addEventListener('mouseleave', handleMouseLeave)
}

/**
 * Makes an element float up and down indefinitely.
 */
export function floatingText(el: HTMLElement, yAmount = 12, duration = 3) {
  gsap.to(el, {
    y: -yAmount,
    duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Reveals an element on scroll using ScrollTrigger.
 */
export function scrollReveal(el: HTMLElement, yOffset = 60) {
  gsap.from(el, {
    opacity: 0,
    y: yOffset,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
}

/**
 * Draws an animated particle/line canvas background on the given canvas element.
 */
export function createCanvasBackground(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  const PARTICLE_COUNT = 80
  const particles: {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
  }[] = []

  const colors = ['#ff006e', '#8b39ff', '#00f5ff']

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }

  let animId: number

  function draw() {
    ctx!.clearRect(0, 0, width, height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0

      ctx!.beginPath()
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx!.fillStyle = p.color
      ctx!.fill()
    }

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx!.beginPath()
          ctx!.moveTo(particles[i].x, particles[i].y)
          ctx!.lineTo(particles[j].x, particles[j].y)
          ctx!.strokeStyle = `rgba(139, 57, 255, ${(1 - dist / 120) * 0.25})`
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }
    }

    animId = requestAnimationFrame(draw)
  }

  draw()

  // Return cleanup fn (optional use)
  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', handleResize)
  }
}
