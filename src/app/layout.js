import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sagar | Full Stack Developer',
  description:
    'Portfolio of Sagar - Full Stack Developer specializing in React, Next.js, and Node.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
