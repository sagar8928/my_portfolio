
export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-white px-6 py-28 border-t border-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="uppercase text-sm tracking-[0.2em] text-indigo-600 font-medium">
            About Me
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            MERN Stack Developer
          </h2>
          <p className="mt-2 text-xl text-slate-600">
            Building Products That Scale
          </p>
        </div>

        {/* Description */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg leading-relaxed text-slate-600">
            I&apos;m a{' '}
            <span className="font-medium text-slate-900">
               MERN Stack Developer
            </span>{' '}
            passionate about building full-stack web applications from the
            ground up. Through self-directed learning and hands-on project
            development, I&apos;ve gained practical experience in creating{' '}
            <span className="font-medium text-slate-900">
              production-ready applications
            </span>{' '}
            that solve real-world problems.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-slate-600">
            My core expertise lies in{' '}
            <span className="font-medium text-slate-900">
              MongoDB, Express, React, and Node.js
            </span>
            , but I&apos;m always expanding my toolkit. I&apos;ve built complete
            applications handling authentication, database design, REST APIs,
            and responsive frontends—learning industry best practices through{' '}
            <span className="font-medium text-slate-900">
              building, breaking, and rebuilding
            </span>
            .
          </p>

          <p className="text-base md:text-lg leading-relaxed text-slate-600">
            I&apos;m deeply interested in how{' '}
            <span className="font-medium text-slate-900">
              artificial intelligence and LLMs
            </span>{' '}
            can enhance developer productivity and user experiences. I actively experiment with integrating
            AI tools into my projects and stay curious about emerging
            technologies that shape the future of software development.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-slate-600">
            Currently seeking opportunities at{' '}
            <span className="font-medium text-slate-900">
              product-driven companies
            </span>{' '}
            where I can contribute meaningfully, grow rapidly, and collaborate
            with experienced engineers who value{' '}
            <span className="font-medium text-slate-900">
              clean code, user-centric design, and continuous learning
            </span>
            .
          </p>
        </div>

        {/* Project Experience Highlights */}
        <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6 text-center">
            Project Experience
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="text-slate-600 text-sm">
                Built and deployed{' '}
                <span className="font-medium text-slate-900">
                  full-stack applications
                </span>{' '}
                with authentication & CRUD
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="text-slate-600 text-sm">
                Implemented{' '}
                <span className="font-medium text-slate-900">RESTful APIs</span>{' '}
                with MongoDB & MySQL
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="text-slate-600 text-sm">
                Integrated{' '}
                <span className="font-medium text-slate-900">
                  third-party APIs
                </span>{' '}
                & payment gateways
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="text-slate-600 text-sm">
                Managed{' '}
                <span className="font-medium text-slate-900">deployment</span>{' '}
                via Git, Vercel & Render
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-center p-6 bg-indigo-50 rounded-xl min-w-[120px]">
            <div className="text-3xl font-bold text-indigo-600">5+</div>
            <div className="text-sm text-slate-600 mt-1">Self Projects</div>
          </div>
          <div className="text-center p-6 bg-indigo-50 rounded-xl min-w-[120px]">
            <div className="text-3xl font-bold text-indigo-600">100%</div>
            <div className="text-sm text-slate-600 mt-1">Self Taught</div>
          </div>
          <div className="text-center p-6 bg-indigo-50 rounded-xl min-w-[120px]">
            <div className="text-3xl font-bold text-indigo-600">24/7</div>
            <div className="text-sm text-slate-600 mt-1">Learning</div>
          </div>
        </div>

        {/* Open to Work Badge */}
        <div className="mt-12 text-center">
          <span className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg">
            Open to Work
          </span>
        </div>
      </div>
    </section>
  );
}
