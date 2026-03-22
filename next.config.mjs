/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  
  // Compression
  compress: true,
  
  // Remove powered by header
  poweredByHeader: false,

  
  
 
}

export default nextConfig