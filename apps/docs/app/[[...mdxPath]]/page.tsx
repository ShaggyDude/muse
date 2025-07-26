import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    mdxPath?: string[]
  }>
}

export default async function CatchAllPage({ params }: PageProps) {
  const { mdxPath = [] } = await params
  
  // This is handled by Nextra's content directory convention
  // The actual rendering is handled by Nextra's internal routing
  return null
}

export async function generateStaticParams() {
  // This will be populated by Nextra's build process
  return []
}