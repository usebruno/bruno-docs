import { Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { Search, Banner } from 'nextra/components'
import Image from 'next/image'
import { CustomMobileNav } from '@/components/custom-mobile-nav'
import GoogleAnalytics from '@/components/google-analytics'
import './globals.css'

export const metadata = {
  title: {
    template: '%s | Bruno Docs',
    default: 'Bruno Docs'
  },
  description: 'Bruno is a fast and git-friendly open source API client, helping developers test and manage APIs efficiently.',
  keywords: 'API client, API testing, Postman alternative, REST client, GraphQL client, SOAP client, API development, git-friendly API client',
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno - The Open Source API Client',
    description: 'Fast and git-friendly open source API client for testing and managing APIs',
    type: 'website',
    url: 'https://docs.usebruno.com',
    images: [
      {
        url: 'https://docs.usebruno.com/bruno.png',
        width: 1200,
        height: 630,
        alt: 'Bruno - The Open Source API Client'
      }
    ],
    siteName: 'Bruno Docs'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bruno - The Open Source API Client',
    description: 'Fast and git-friendly open source API client for testing and managing APIs',
    images: ['https://docs.usebruno.com/bruno.png']
  },
  icons: {
    icon: '/bruno.png',
    apple: '/bruno.png'
  },
  alternates: {
    canonical: 'https://docs.usebruno.com'
  }
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <CustomMobileNav />
        <Layout
          pageMap={pageMap}
          navbar={
            <Navbar
              logo={
                <>
                  <Image
                    src="/bruno.png"
                    alt="Bruno"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <span className="font-bold">Bruno</span>
                </>
              }
              projectLink="https://github.com/usebruno/bruno"
              chatLink="https://discord.com/invite/KgcZUncpjq"
            />
          }
          docsRepositoryBase="https://github.com/usebruno/bruno-docs/tree/main"
          editLink="Edit this page on GitHub"
          sidebar={{
            toggleButton: true,
            autoCollapse: true,
            defaultMenuCollapseLevel: 1
          }}
          footer={false}
          search={<Search placeholder="Search docs..." />}
        >
          <Banner 
            storageKey="bruno-v3-preview-announcement"
            style={{ 
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
              color: 'white'
            }}
          >
            <a 
              href="https://www.usebruno.com/v3-preview" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              🎉 Bruno V3 Early Preview is live! Be among the first to try Workspaces, YAML Support, Inbuilt Terminal, and more. Learn more ↗
            </a>
          </Banner>
          {children}
        </Layout>
      </body>
    </html>
  )
}
