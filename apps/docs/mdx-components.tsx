import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { ComponentShowcase } from './components/ComponentShowcase'
import { Button, Card } from '@repo/ui'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components: Record<string, any>) {
  return {
    ...docsComponents,
    ComponentShowcase,
    Button,
    Card,
    ...components
  }
}