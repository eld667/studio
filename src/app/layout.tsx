import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EldWorkStudio',
  description: 'Premium Web Solutions',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-gray-950 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px]">{children}</body>
    </html>
  );
}
