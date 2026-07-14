/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.mdx' {
  import * as React from 'react'
  const MDXComponent: React.ComponentType<any>
  export default MDXComponent
}
