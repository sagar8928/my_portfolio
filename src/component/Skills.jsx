'use client';

import Image from 'next/image';
import { useState } from 'react'; // ✅ HIGHLIGHT: Needed for filtering

const skills = [
  {
    name: 'HTML',
    src: '/assets/skills/html.png',
    color: '#e34c26',
    category: 'Frontend',
  },
  {
    name: 'CSS',
    src: '/assets/skills/css.png',
    color: '#264de4',
    category: 'Frontend',
  },
  {
    name: 'JavaScript',
    src: '/assets/skills/javascript.png',
    color: '#f7df1e',
    category: 'Frontend',
  },
  // {
  //   name: 'TypeScript',
  //   src: '/assets/skills/typescript.png',
  //   color: '#3178c6',
  //   category: 'Frontend',
  // },
  {
    name: 'React',
    src: '/assets/skills/react.png',
    color: '#61dafb',
    category: 'Frontend',
  },
  {
    name: 'Next.js',
    src: '/assets/skills/nextjs.png',
    color: '#000000',
    category: 'Frontend',
  },
  {
    name: 'Node.js',
    src: '/assets/skills/nodeJs.png',
    color: '#339933',
    category: 'Backend',
  },
  {
    name: 'Express',
    src: '/assets/skills/expressJs.png',
    color: '#404040',
    category: 'Backend',
  },
  {
    name: 'MongoDB',
    src: '/assets/skills/mongo.png',
    color: '#47a248',
    category: 'Backend',
  },
  {
    name: 'MySQL',
    src: '/assets/skills/mySql.png',
    color: '#00758f',
    category: 'Backend',
  },
  {
    name: 'Tailwind',
    src: '/assets/skills/tailwind.png',
    color: '#06b6d4',
    category: 'Frontend',
  },
  {
    name: 'GitHub',
    src: '/assets/skills/github1.png',
    color: '#181717',
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
      className="w-full py-28 bg-gradient-to-b from-[#fafafa] to-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            What I Can Do
          </h2>
          <p className="text-lg text-slate-600">
            Technologies I use to build production-ready applications.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button" 
              onClick={() => setActiveCategory(cat)} 
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  activeCategory === cat
                    ? 'bg-[#5651e5] text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-gray-200 hover:text-[#5651e5]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="group">
              <div
                className="
                  flex flex-col items-center gap-3
                  p-6 rounded-2xl bg-white
                  border border-gray-100
                  shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                  <Image
                    src={skill.src}
                    alt={skill.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
