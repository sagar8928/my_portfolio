'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Deepseek Clone – Real-Time AI Conversation Platform',
    description:
      'Built a cutting-edge AI-driven conversational platform leveraging Groq API for real-time, context-aware responses. The Next.js frontend delivers a seamless, responsive user experience, while the Node.js & Express backend orchestrates secure and scalable operations.',
    image: '/assets/projects/ecommerce.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    live: 'https://your-live-link.vercel.app',
    github: 'https://github.com/sagar8928/Deepseek-Clone',
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A productivity app with drag-and-drop kanban board, user authentication, and real-time updates. Built with React and a Node/Express backend.',
    image: '/assets/Task-manager.png',
    tags: ['React', 'Express', 'MongoDB', 'REST API'],
    live: 'https://task-manager-three-eta-76.vercel.app/',
    github: 'https://github.com/sagar8928/task-manager',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'Shoe Center – Modern E-commerce Frontend',
    description:
      'Developed a modern one-page UI website titled "Shoe-Center" using Next.js and Tailwind CSS. Focused on user interface design to create a clean and visually appealing layout. Implemented a mobile-first approach, enhancing user experience on various devices.',
    image: '/assets/shoe4.jpg',
    tags: ['Next.js', 'Tailwind'],
    live: 'https://shoe-center.vercel.app/',
    github: 'https://github.com/sagar8928/shoe-center',
    category: 'Frontend',
  },
  {
    id: 4,
    title: 'Nodejs-machine-test',
    description:
      'A full-stack dashboard built with ReactJS + Google Apps Script.Pricing Analytics. product prices, discounts, stock status.Sentiment Analysis . review scores and sentiment scoring.',
    image: '/assets/projects/weather.png',
    tags: ['React',  'Google Apps Script (Web App)'],
    live: '',
    github: 'https://github.com/sagar8928/Nodejs-machine-test',
    category: 'Full Stack',
  },
];

const categories = ['All', 'Full Stack', 'Frontend'];

// Separate card component so each has its own imgError state
function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(86,81,229,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-indigo-50 to-slate-100">
        {/* Placeholder — only shown when image fails */}
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
            <span className="text-6xl font-bold text-indigo-200 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Real image — rendered on top, hidden only on error */}
        {!imgError && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay with action buttons */}
        <div
          className={`absolute inset-0 bg-[#5651e5]/90 flex items-center justify-center gap-5 transition-opacity duration-300 z-10 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-[#5651e5] font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FiExternalLink size={16} />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-full border border-white/40 hover:bg-white/30 hover:scale-105 transition"
          >
            <FiGithub size={16} />
            Source
          </a>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom action strip — always visible on mobile */}
      <div className="px-6 pb-5 flex gap-3 md:hidden">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#5651e5] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#4640d9] transition"
        >
          <FiExternalLink size={15} /> Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-slate-700 text-sm font-semibold py-2.5 rounded-lg hover:border-[#5651e5] hover:text-[#5651e5] transition"
        >
          <FiGithub size={15} /> Source
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="w-full py-28 bg-white border-t border-gray-100 relative overflow-hidden"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase text-sm tracking-[0.2em] text-indigo-600 font-medium">
            My Work
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Featured Projects
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            Things I&apos;ve built — from idea to deployment.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  activeCategory === cat
                    ? 'bg-[#5651e5] text-white shadow-lg shadow-indigo-200'
                    : 'bg-white text-slate-600 border border-gray-200 hover:text-[#5651e5] hover:border-indigo-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View more on GitHub */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/sagar8928"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-200 text-slate-600 font-semibold px-8 py-3 rounded-full hover:border-[#5651e5] hover:text-[#5651e5] transition"
          >
            <FiGithub size={18} />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
