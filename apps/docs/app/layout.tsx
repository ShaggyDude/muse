import React from 'react'
import { Metadata } from 'next'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Muse Design System',
    template: '%s – Muse Design System'
  },
  description: 'A living design system embodying the Muse methodology for joyful software creation.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()

  const navbar = (
    <Navbar 
      logo={<span>📚 Muse Design System</span>}
      projectLink="https://github.com/your-org/muse"
    >
      <Search placeholder="Search documentation..." />
    </Navbar>
  )

  const footer = (
    <Footer>
      <div className="flex flex-col items-center md:items-start">
        <p>Muse Design System © {new Date().getFullYear()}</p>
        <p className="text-sm text-gray-600">Built with ❤️ following the Muse methodology for joyful creation</p>
      </div>
    </Footer>
  )

  return (
    <html 
      lang="en" 
      dir="ltr"
      suppressHydrationWarning
    >
      <Head 
        backgroundColor={{
          dark: 'rgb(15, 23, 42)',
          light: 'rgb(254, 252, 232)'
        }}
        color={{
          hue: { dark: 240, light: 240 },
          saturation: { dark: 100, light: 100 }
        }}
      />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/your-org/muse/tree/main/apps/docs"
          editLink="Edit this page on GitHub →"
          feedback={{ 
            content: 'Question? Give us feedback →',
            labels: 'feedback'
          }}
          sidebar={{ 
            defaultMenuCollapseLevel: 2,
            autoCollapse: true 
          }}
          toc={{
            backToTop: true,
            title: 'On This Page'
          }}
          themeSwitch={{
            light: 'Light',
            dark: 'Dark',
            system: 'System'
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}