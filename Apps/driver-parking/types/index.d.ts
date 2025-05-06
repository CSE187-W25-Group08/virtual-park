import 'next';

declare module 'next' {
  export type LayoutProps = {
    children: React.ReactNode;
    params: { locale: string };
  }
}