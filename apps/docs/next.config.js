import nextra from 'nextra'

const withNextra = nextra({
  // No theme or themeConfig options in Nextra 4
})

export default withNextra({
  transpilePackages: ['@repo/ui'],
  experimental: {
    optimizePackageImports: ['@repo/ui']
  }
})