declare module "*.mdx" {
  export const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
