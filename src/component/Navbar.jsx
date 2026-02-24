'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_HEIGHT = 64;

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: '/resume.pdf', label: 'Resume', external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleAnchorClick(e, href) {
    e.preventDefault();
    closeMenu();

    const target = document.querySelector(href);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* LOGO */}
            <Link href="#home" className="text-2xl font-bold text-black">
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
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="nav-link cursor-pointer"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden transition hover:scale-110"
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
          onClick={closeMenu}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={closeMenu} aria-label="Close menu">
            <HiX size={26} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6 py-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mobile-link"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="mobile-link cursor-pointer"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}
