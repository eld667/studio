import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ClientProviders } from './ClientProviders';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'EldWorkStudio',
  description: 'A premium digital studio building high-performance web applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-gray-950 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950`} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
