import React from 'react';

interface ComponentExample {
  name: string;
  component: React.ReactNode;
}

interface ComponentMeta {
  title: string;
  component: React.FC<any> | React.ComponentClass<any>;
  examples: ComponentExample[];
}

interface ComponentShowcaseProps {
  meta: ComponentMeta;
  scope?: Record<string, any>;
}

export function ComponentShowcase({ meta, scope = {} }: ComponentShowcaseProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">{meta.title}</h2>
        <p className="text-gray-600 mb-6">
          Interactive examples of all {meta.title.toLowerCase()} variants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {meta.examples.map((example, index) => (
          <div key={example.name} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium text-sm text-gray-700">{example.name}</h3>
            </div>
            
            {/* Live Preview */}
            <div className="p-6 bg-white flex items-center justify-center min-h-[100px]">
              {example.component}
            </div>
            
            {/* Code Example */}
            <div className="border-t">
              <details className="group">
                <summary className="px-4 py-2 bg-gray-50 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                  View Code
                  <span className="float-right group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="p-4">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateCodeExample(example)}</code>
                  </pre>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>

      {/* Code Examples */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Component Usage</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h4 className="font-medium text-sm text-gray-700">Import and Usage</h4>
          </div>
          <div className="p-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { ${meta.component?.name || 'Component'} } from '@repo/ui'

function MyComponent() {
  return (
    ${generatePlaygroundCode(meta)}
  )
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateCodeExample(example: ComponentExample): string {
  if (React.isValidElement(example.component)) {
    return elementToString(example.component);
  }
  return String(example.component);
}

function generatePlaygroundCode(meta: ComponentMeta): string {
  const componentName = meta.component.name || 'Component';
  const firstExample = meta.examples[0];
  
  if (firstExample && React.isValidElement(firstExample.component)) {
    return elementToString(firstExample.component);
  }
  
  return `<${componentName}>Example</${componentName}>`;
}

function elementToString(element: React.ReactElement): string {
  try {
    const elementProps = element.props || {} as any;
    
    if (typeof element.type === 'string') {
      const props = Object.entries(elementProps)
        .filter(([key]) => key !== 'children')
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          } else if (typeof value === 'boolean' && value) {
            return key;
          } else {
            return `${key}={${JSON.stringify(value)}}`;
          }
        })
        .join(' ');
      
      const children = elementProps.children;
      const propsString = props ? ` ${props}` : '';
      
      if (children) {
        return `<${element.type}${propsString}>${children}</${element.type}>`;
      } else {
        return `<${element.type}${propsString} />`;
      }
    }
    
    // Handle function components
    const componentName = (element.type as any)?.displayName || (element.type as any)?.name || 'Component';
    const props = Object.entries(elementProps)
      .filter(([key]) => key !== 'children')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean' && value) {
          return key;
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })
      .join(' ');
    
    const children = elementProps.children;
    const propsString = props ? ` ${props}` : '';
    
    if (children) {
      return `<${componentName}${propsString}>${children}</${componentName}>`;
    } else {
      return `<${componentName}${propsString} />`;
    }
  } catch (error) {
    console.warn('Error generating code string:', error);
    return '<Component />';
  }
}