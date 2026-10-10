import './globals.css';
import '@bible-strong/avatar-react/styles.css';
import { Inter } from 'next/font/google';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import FloatingMascot from '../component/FloatingMascot';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sagar | Full Stack Developer',
  description:
    'Portfolio of Sagar - Full Stack Developer specializing in React, Next.js, and Node.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var theme =
                    savedTheme === 'light' || savedTheme === 'dark'
                      ? savedTheme
                      : 'dark';

                  document.documentElement.setAttribute('data-theme', theme);
                } catch (error) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>

      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>

        <FloatingMascot />
      </body>
    </html>
  );
}
