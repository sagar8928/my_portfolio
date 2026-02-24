'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: '/resume.pdf', label: 'Resume', external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link
              href="#home"
              className="text-2xl font-bold tracking-tight text-black"
            >
              Sagar<span className="text-primary">.</span>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="nav-link">
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-black hover:scale-110 transition"
              aria-label="Open menu"
            >
              <HiMenu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* RIGHT SIDE DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-72 z-50
          bg-white shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={handleClose} aria-label="Close menu">
            <HiX size={26} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="mobile-link"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClose}
                className="mobile-link"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}
