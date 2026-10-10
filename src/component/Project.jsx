'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Deepseek Clone – Real-Time AI Conversation Platform',
    description:
      'Built an AI-driven conversational platform leveraging Groq API for real-time, context-aware responses. The Next.js frontend delivers a responsive user experience, while the Node.js and Express backend handles server-side operations.',
    image: '/assets/deepseek.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    live: 'https://github.com/sagar8928/Deepseek-Clone',
    github: 'https://github.com/sagar8928/Deepseek-Clone',
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A productivity app with task management, user authentication, and status updates. Built with React and a Node.js/Express backend.',
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
      'Developed a modern one-page e-commerce UI using Next.js and Tailwind CSS. Focused on clean interface design and a mobile-first experience.',
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
      'A dashboard built with React and Google Apps Script featuring pricing analytics, product prices, discounts, stock status, and review sentiment analysis.',
    image: '/assets/nodemachine.png',
    tags: ['React', 'Google Apps Script'],
    live: 'https://github.com/sagar8928/Nodejs-machine-test',
    github: 'https://github.com/sagar8928/Nodejs-machine-test',
    category: 'Full Stack',
  },
];

const categories = ['All', 'Full Stack', 'Frontend'];

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(86,81,229,0.18)]"
    >
      {/* Image container */}
      <div className="relative h-52 w-full overflow-hidden bg-[var(--surface-color)]">
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-color)]">
            <span className="select-none text-6xl font-bold text-indigo-400">
              {project.title.charAt(0)}
            </span>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Desktop hover overlay */}
        <div
          className={`absolute inset-0 z-10 hidden items-center justify-center gap-5 bg-[#5651e5]/90 transition-opacity duration-300 md:flex ${
            hovered ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#5651e5] shadow-lg transition hover:scale-105"
          >
            <FiExternalLink size={16} />
            Live Demo
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white/30"
          >
            <FiGithub size={16} />
            Source
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="mb-2 text-lg font-bold text-[var(--text-color)]">
          {project.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-[var(--muted-color)]">
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions: always visible on mobile */}
      <div className="flex gap-3 px-6 pb-5 md:hidden">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#5651e5] py-2.5 text-sm font-semibold text-white transition hover:bg-[#4640d9]"
        >
          <FiExternalLink size={15} />
          Live Demo
        </a>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] py-2.5 text-sm font-semibold text-[var(--text-color)] transition hover:border-[#5651e5] hover:text-indigo-500"
        >
          <FiGithub size={15} />
          Source
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg-color)] py-28 text-[var(--text-color)] transition-colors duration-300"
    >
      {/* Subtle top accent */}
      <div className="absolute left-1/2 top-0 h-[2px] w-[600px] max-w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-500">
            My Work
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[var(--text-color)] md:text-5xl">
            Featured Projects
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-lg text-[var(--muted-color)]">
            Things I&apos;ve built — from idea to deployment.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-[#5651e5] bg-[#5651e5] text-white shadow-lg shadow-indigo-500/20'
                    : 'border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-color)] hover:border-indigo-400 hover:text-indigo-500'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/sagar8928"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-8 py-3 font-semibold text-[var(--text-color)] transition hover:border-indigo-500 hover:text-indigo-500"
          >
            <FiGithub size={18} />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
