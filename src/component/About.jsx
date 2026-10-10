export default function About() {
  return (
    <section
      id="about"
      className="portfolio-section w-full px-6 py-28 border-t border-[var(--border-color)]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="uppercase text-sm tracking-[0.2em] text-indigo-600 font-medium">
            About Me
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-color)]">
            MERN Stack Developer
          </h2>

          <p className="mt-2 text-xl theme-muted">
            Building Products That Scale
          </p>
        </div>

        {/* Description */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg leading-relaxed theme-muted">
            I&apos;m a{' '}
            <span className="font-medium text-[var(--text-color)]">
              MERN Stack Developer
            </span>{' '}
            passionate about building full-stack web applications from the
            ground up. Through self-directed learning and hands-on project
            development, I&apos;ve gained practical experience in creating{' '}
            <span className="font-medium text-[var(--text-color)]">
              production-ready applications
            </span>{' '}
            that solve real-world problems.
          </p>

          <p className="text-base md:text-lg leading-relaxed theme-muted">
            My core expertise lies in{' '}
            <span className="font-medium text-[var(--text-color)]">
              MongoDB, Express, React, and Node.js
            </span>
            , but I&apos;m always expanding my toolkit. I&apos;ve built complete
            applications handling authentication, database design, REST APIs,
            and responsive frontends—learning industry best practices through{' '}
            <span className="font-medium text-[var(--text-color)]">
              building, breaking, and rebuilding
            </span>
            .
          </p>

          <p className="text-base md:text-lg leading-relaxed theme-muted">
            I&apos;m deeply interested in how{' '}
            <span className="font-medium text-[var(--text-color)]">
              artificial intelligence and LLMs
            </span>{' '}
            can enhance developer productivity and user experiences. I actively
            experiment with integrating AI tools into my projects and stay
            curious about emerging technologies that shape the future of
            software development.
          </p>

          <p className="text-base md:text-lg leading-relaxed theme-muted">
            Currently seeking opportunities at{' '}
            <span className="font-medium text-[var(--text-color)]">
              product-driven companies
            </span>{' '}
            where I can contribute meaningfully, grow rapidly, and collaborate
            with experienced engineers who value{' '}
            <span className="font-medium text-[var(--text-color)]">
              clean code, user-centric design, and continuous learning
            </span>
            .
          </p>
        </div>

        {/* Project Experience Highlights */}
        <div className="mt-12 p-8 bg-[var(--surface-color)] rounded-2xl border border-[var(--border-color)] max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold text-[var(--text-color)] uppercase tracking-wider mb-6 text-center">
            Project Experience
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)]">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="theme-muted text-sm">
                Built and deployed{' '}
                <span className="font-medium text-[var(--text-color)]">
                  full-stack applications
                </span>{' '}
                with authentication &amp; CRUD
              </span>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)]">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="theme-muted text-sm">
                Implemented{' '}
                <span className="font-medium text-[var(--text-color)]">
                  RESTful APIs
                </span>{' '}
                with MongoDB &amp; MySQL
              </span>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)]">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="theme-muted text-sm">
                Integrated{' '}
                <span className="font-medium text-[var(--text-color)]">
                  third-party APIs
                </span>{' '}
                &amp; payment gateways
              </span>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)]">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
              <span className="theme-muted text-sm">
                Managed{' '}
                <span className="font-medium text-[var(--text-color)]">
                  deployment
                </span>{' '}
                via Git, Vercel &amp; Render
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-8">
          <div className="text-center p-6 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl min-w-[120px]">
            <div className="text-3xl font-bold text-indigo-600">5+</div>
            <div className="text-sm theme-muted mt-1">Self Projects</div>
          </div>

          <div className="text-center p-6 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl min-w-[120px]">
            <div className="text-3xl font-bold text-indigo-600">100%</div>
            <div className="text-sm theme-muted mt-1">Self Taught</div>
          </div>

          <div className="text-center p-6 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl min-w-[120px]">
            <div className="text-3xl font-bold text-indigo-600">24/7</div>
            <div className="text-sm theme-muted mt-1">Learning</div>
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
