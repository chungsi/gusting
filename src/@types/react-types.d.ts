// Custom declaration for gatsby-plugin-react-svg to work with typescript
declare module "*.svg" {
  const content: any
  export default content
}

// Allow css modules to work
declare module "*.module.css"