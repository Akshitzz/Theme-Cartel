export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  fullDescription: string;
  category: string;
  image?: string;
  features: string[];
  deliveryTime: string;
  revisions: number;
  sourceFiles: boolean;
}

export const products: Product[] = [
  {
    id: '3d-logo-standard',
    name: '3D Logo Design',
    price: 35,
    description: 'Professional 3D logo with animations',
    fullDescription: 'Get a stunning 3D logo that makes your brand stand out. Includes professional animation, multiple file formats, and brand guide documentation.',
    category: '3D Design',
    features: ['3D Model File', 'Animation MP4', 'PNG/SVG Exports', 'Color Variations', 'Brand Guide PDF'],
    deliveryTime: '5-7 days',
    revisions: 2,
    sourceFiles: true,
  },
  {
    id: 'shopify-theme-premium',
    name: 'Premium Shopify Theme',
    price: 75,
    description: 'High-converting e-commerce theme',
    fullDescription: 'Fully customizable, conversion-optimized Shopify theme built for sales. Includes product showcase, cart optimization, and mobile responsiveness.',
    category: 'Shopify',
    features: ['Fully Responsive', 'Dark Mode', 'Product Filters', 'Fast Loading', 'Checkout Optimization', 'Analytics Ready'],
    deliveryTime: '3-5 days',
    revisions: 3,
    sourceFiles: true,
  },
  {
    id: 'animation-explainer',
    name: 'Explainer Animation',
    price: 125,
    description: 'Custom animated explainer video',
    fullDescription: 'Professional 2D/3D explainer animation for your product or service. Includes storyboarding, voiceover integration, and multiple revisions.',
    category: 'Animation',
    features: ['Storyboard', 'Voiceover Integration', '1080p Export', 'Soundtrack Included', 'Multiple Revisions'],
    deliveryTime: '10-14 days',
    revisions: 4,
    sourceFiles: true,
  },
  {
    id: 'brand-identity',
    name: 'Complete Brand Kit',
    price: 150,
    description: 'Full brand identity package',
    fullDescription: 'Everything you need: logo, color palette, typography guide, social templates, and brand guidelines. Professional and comprehensive branding solution.',
    category: 'Branding',
    features: ['Logo Design', 'Color Palette', 'Typography Guide', 'Social Templates', 'Brand Guidelines', 'Business Cards'],
    deliveryTime: '14-21 days',
    revisions: 5,
    sourceFiles: true,
  },
  {
    id: 'web-dev-custom',
    name: 'Custom Web Development',
    price: 200,
    description: 'High-performance custom website',
    fullDescription: 'Bespoke web development with modern technologies. SEO optimized, fast loading, fully responsive design with smooth animations.',
    category: 'Development',
    features: ['Next.js/React', 'Fully Responsive', 'SEO Optimized', 'Fast Performance', 'CMS Integration', 'Email Setup'],
    deliveryTime: '21-30 days',
    revisions: 10,
    sourceFiles: true,
  },
  {
    id: 'motion-graphics-pack',
    name: 'Motion Graphics Pack',
    price: 95,
    description: 'Multiple animated graphics',
    fullDescription: 'Get 5 custom motion graphics for social media, marketing, or website. Includes looping animations and static image alternatives.',
    category: 'Motion',
    features: ['5 Animations', 'Social Sizes', '4K Export', 'Looping Format', 'PNG Sequence', 'Customizable Colors'],
    deliveryTime: '7-10 days',
    revisions: 3,
    sourceFiles: true,
  },
  {
    id: 'graphic-design-social',
    name: 'Social Media Design Pack',
    price: 50,
    description: '10 professional social posts',
    fullDescription: 'Get 10 beautifully designed social media graphics ready to post. Includes Instagram, TikTok, and LinkedIn optimized sizes.',
    category: 'Graphic Design',
    features: ['10 Posts', 'All Sizes', 'Fully Editable', 'Brand Consistent', 'Free Updates', 'Usage Rights'],
    deliveryTime: '3-5 days',
    revisions: 2,
    sourceFiles: true,
  },
  {
    id: 'ui-design-package',
    name: 'UI/UX Design',
    price: 180,
    description: 'Complete app or website design',
    fullDescription: 'Full UI/UX design for your app or website. Wireframes, high-fidelity mockups, design system, and interactive prototypes included.',
    category: 'Design',
    features: ['Wireframes', 'High-Fi Mockups', 'Design System', 'Interactive Prototype', 'User Research', 'Component Library'],
    deliveryTime: '14-21 days',
    revisions: 5,
    sourceFiles: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const categories = Array.from(new Set(products.map((p) => p.category)));
