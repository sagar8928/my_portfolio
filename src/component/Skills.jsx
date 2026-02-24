import Image from 'next/image';
import React from 'react';

const skills = [
  { name: 'HTML', src: '/assets/skills/html.png' },
  { name: 'CSS', src: '/assets/skills/css.png' },
  { name: 'JavaScript', src: '/assets/skills/javascript.png' },
  { name: 'React', src: '/assets/skills/react.png' },
  { name: 'Next.js', src: '/assets/skills/nextjs.png' },
  { name: 'Node.js', src: '/assets/skills/nodeJs.png' },
  { name: 'Express', src: '/assets/skills/expressJs.png' },
  { name: 'MongoDB', src: '/assets/skills/mongo.png' },
  { name: 'MySQL', src: '/assets/skills/mySql.png' },
  { name: 'GitHub', src: '/assets/skills/github1.png' },
];

export default function Skills() {
  
  return (
    <section id="skills" className="w-full py-28 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Skills
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Tools I use to build reliable systems
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            A focused set of technologies I use to design, build, and maintain
            production-ready web applications.
          </p>
        </div>

        {/* Skills grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="
            group flex items-center gap-4
            p-4 rounded-xl bg-white
            border border-gray-200
            shadow-[0_1px_2px_rgba(0,0,0,0.04)]
            hover:border-gray-300
            hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            transition-all duration-200
          "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f8fafc] border border-gray-200">
                <Image
                  src={skill.src}
                  alt={skill.name}
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>

              <span className="text-sm font-medium text-slate-800">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
