// Custom declaration for gatsby-plugin-react-svg to work with typescript
declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.jpg" {
  export default "" as string;
}

declare module "*.png" {
  export default "" as string
}

// Allow css modules to work
declare module "*.module.css"