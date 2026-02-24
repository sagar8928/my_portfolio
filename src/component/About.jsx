// app/about/page.js
import Image from 'next/image';

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-white px-6 py-28 border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="uppercase text-sm tracking-[0.2em] text-indigo-600 font-medium">
            About
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Who I Am
          </h2>
          {/* Description */}
          <div className="mt-8 max-w-3xl">
            <p className="text-base md:text-lg leading-relaxed text-slate-600">
              I build{' '}
              <span className="font-medium text-slate-900">
                scalable, mobile-responsive front-end interfaces
              </span>{' '}
              that integrate cleanly with APIs and backend systems. My focus is
              on writing UI that is{' '}
              <span className="font-medium text-slate-900">
                predictable, maintainable, and production-ready
              </span>
              .
            </p>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">
              While I work most often with{' '}
              <span className="font-medium text-slate-900">
                React, Next.js, and modern CSS
              </span>
              , I don’t tie myself to a single stack. I learn fast, adapt
              quickly, and choose technologies based on{' '}
              <span className="font-medium text-slate-900">
                real engineering trade-offs
              </span>
              — not trends.
            </p>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">
              To me, being a strong developer isn’t about mastering one language
              — it’s about{' '}
              <span className="font-medium text-slate-900">
                selecting the right tool for the problem and executing it well
              </span>
              .
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.25em] mb-8">
            Tech Stack
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl">
            {[
              { name: 'React', src: '/assets/skills/react.png' },
              { name: 'Next.js', src: '/assets/skills/nextjs.png' },
              { name: 'Node.js', src: '/assets/skills/nodeJs.png' },
              { name: 'Express', src: '/assets/skills/expressJs.png' },
              { name: 'MongoDB', src: '/assets/skills/mongo.png' },
              { name: 'MySQL', src: '/assets/skills/mySql.png' },
              { name: 'Tailwind CSS', src: '/assets/skills/tailwind.png' },
              { name: 'Git', src: '/assets/skills/github1.png' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="
                  group flex items-center gap-4
                  rounded-xl border border-gray-200
                  bg-white px-5 py-4
                  transition
                  hover:-translate-y-0.5
                  hover:border-gray-300
                  hover:shadow-sm
                "
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-50 border border-gray-200">
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>

                <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
