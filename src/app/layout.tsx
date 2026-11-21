import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Commit City — Your code builds your skyline', description: 'A living city shaped by open source.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
