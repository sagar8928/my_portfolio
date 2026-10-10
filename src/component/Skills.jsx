'use client';

import Image from 'next/image';
import { useState } from 'react';

const skills = [
  {
    name: 'HTML',
    src: '/assets/skills/html.png',
    category: 'Frontend',
  },
  {
    name: 'CSS',
    src: '/assets/skills/css.png',
    category: 'Frontend',
  },
  {
    name: 'JavaScript',
    src: '/assets/skills/javascript.png',
    category: 'Frontend',
  },
  {
    name: 'React',
    src: '/assets/skills/react.png',
    category: 'Frontend',
  },
  {
    name: 'Next.js',
    src: '/assets/skills/nextjs.png',
    category: 'Frontend',
  },
  {
    name: 'Node.js',
    src: '/assets/skills/nodeJs.png',
    category: 'Backend',
  },
  {
    name: 'Express',
    src: '/assets/skills/expressJs.png',
    category: 'Backend',
  },
  {
    name: 'MongoDB',
    src: '/assets/skills/mongo.png',
    category: 'Backend',
  },
  {
    name: 'MySQL',
    src: '/assets/skills/mySql.png',
    category: 'Backend',
  },
  {
    name: 'Tailwind',
    src: '/assets/skills/tailwind.png',
    category: 'Frontend',
  },
  {
    name: 'GitHub',
    src: '/assets/skills/github1.png',
    category: 'Tools',
  },
];

const categories = ['All', 'Frontend', 'Backend', 'Tools'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="skills-section relative w-full overflow-hidden border-t py-24 md:py-28"
    >
      {/* Decorative top glow */}
      <div className="skills-top-glow pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-500">
            What I Can Do
          </p>

          <h2 className="skills-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            What I Can Do
          </h2>

          <p className="skills-description mt-4 text-base sm:text-lg md:text-xl">
            Technologies I use to build production-ready applications.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`skills-filter rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive ? 'skills-filter-active' : 'skills-filter-inactive'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="skill-card flex h-full min-h-[180px] flex-col items-center justify-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1.5 sm:min-h-[200px] sm:p-6">
                {/* Icon container */}
                <div className="skill-icon-box flex h-20 w-20 items-center justify-center rounded-3xl p-4 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/50">
                  <Image
                    src={skill.src}
                    alt={`${skill.name} logo`}
                    width={52}
                    height={52}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Skill name */}
                <h3 className="skill-name text-center text-base font-semibold sm:text-lg">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          background: linear-gradient(
            135deg,
            var(--bg-color) 0%,
            var(--surface-color) 55%,
            var(--bg-color) 100%
          );
          border-color: var(--border-color);
          transition:
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .skills-top-glow {
          background: linear-gradient(
            90deg,
            transparent,
            #4338ca 25%,
            #818cf8 50%,
            #4338ca 75%,
            transparent
          );
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.3);
        }

        .skills-heading {
          color: var(--text-color);
        }

        .skills-description {
          color: var(--muted-color);
        }

        .skill-card {
          background: rgba(15, 23, 42, 0.25);
          border-color: var(--border-color);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .skill-card:hover {
          border-color: rgba(129, 140, 248, 0.6);
          box-shadow: 0 12px 32px rgba(79, 70, 229, 0.12);
        }

        .skill-icon-box {
          background: linear-gradient(
            145deg,
            rgba(99, 102, 241, 0.17),
            rgba(30, 41, 59, 0.3)
          );
          border: 1px solid rgba(129, 140, 248, 0.08);
        }

        .skill-name {
          color: var(--text-color);
        }

        .skills-filter-active {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: #ffffff;
          border: 1px solid #6366f1;
          box-shadow: 0 5px 20px rgba(79, 70, 229, 0.22);
        }

        .skills-filter-inactive {
          background: transparent;
          color: var(--text-color);
          border: 1px solid var(--border-color);
        }

        .skills-filter-inactive:hover {
          border-color: #818cf8;
          color: #818cf8;
          background: rgba(99, 102, 241, 0.06);
        }

        /* Light theme */
        :global(html[data-theme='light']) .skill-card {
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        :global(html[data-theme='light']) .skill-card:hover {
          box-shadow: 0 12px 32px rgba(79, 70, 229, 0.1);
        }

        :global(html[data-theme='light']) .skill-icon-box {
          background: linear-gradient(145deg, #eef2ff, #f8fafc);
          border-color: #e0e7ff;
        }

        :global(html[data-theme='light']) .skills-filter-inactive {
          background: #ffffff;
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-card,
          .skill-icon-box,
          .skills-filter {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
