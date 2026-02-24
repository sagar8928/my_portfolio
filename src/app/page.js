import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiLayout, FiServer, FiCode,FiFileText } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

// ✅ CORRECT IMPORT PATH (use @/ alias or relative)
import AboutSection from '../component/About';
import ContactSection from '../component/Contact';
import Skills from '../component/Skills';

export default function Home() {
  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* PROFILE IMAGE */}
          <div className="flex justify-center mb-10">
            <div className="relative w-[300px] h-[300px]">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-2xl opacity-50 z-0" />

              {/* Profile Image */}
              <Image
                src="/assets/profile.jpg"
                alt="Sagar – Full Stack Developer"
                fill
                priority
                className="rounded-full object-cover border-2 border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-10"
              />
            </div>
          </div>

          {/* INTRO */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I&apos;m <span className="gradient-text">Sagar</span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
            Full Stack Developer & Creative Coder
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            I craft fast, responsive, and scalable web applications using modern
            technologies. I care about clean architecture, real-world
            performance, and shipping things that actually work.
          </p>

          {/* LINKS */}
          <div className="flex justify-center items-center gap-6 mb-10">
            <a
              href="https://github.com/sagar8928"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://linkedin.com/in/sagar-dhebe-891997244"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
            >
              <FaLinkedinIn size={22} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
              aria-label="Resume"
            >
              <FiFileText size={22} />
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              Get In Touch <FiArrowRight className="ml-2" />
            </Link>

            <Link
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection />

      {/* ✅ WHAT I DO SECTION - Services/Specialties */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            What I Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiLayout size={40} />,
                title: 'Frontend Development',
                description:
                  'Crafting fast, accessible, and responsive UIs with React, Next.js, and Tailwind.',
              },
              {
                icon: <FiServer size={40} />,
                title: 'Backend Development',
                description:
                  'Designing scalable APIs and backend systems with Node.js, Express, and databases.',
              },
              {
                icon: <FiCode size={40} />,
                title: 'Full Stack Solutions',
                description:
                  'Building complete products end-to-end with clean architecture and real-world constraints.',
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300 border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-primary mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {skill.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ TECH STACK - Skills Grid */}
      <Skills />

      {/* CONTACT */}
      <ContactSection />
    </div>
  );
}
