import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sagar. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="mailto:sagardhebe12yt@gmail.com"
              className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
