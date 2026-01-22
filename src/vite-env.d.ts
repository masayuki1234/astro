import "react";

declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpg" {
    const value: string;
    export default value;
  }
  
  declare module "*.svg" {
    const value: string;
    export default value;
  }
  declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
/// <reference types="vite/client" />
