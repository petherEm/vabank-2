import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vabank.dev - AI-Powered Web Development',
    short_name: 'Vabank.dev',
    description: 'From replatforming to AI-driven innovation, we craft modern digital solutions that move your business ahead of the curve.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
