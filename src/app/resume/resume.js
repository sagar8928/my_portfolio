import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: 'Sagar | Resume',
  description:
    'Full-stack web developer specializing in scalable, modern web applications.',
};

export default function Resume() {
  return (
    <div className="max-w-[940px] mx-auto p-2 pt-[120px]">
      {/* Header */}
      <div className="bg-[#d0d4d6] my-4 p-4 w-full flex justify-between items-center">
        <h2 className="font-bold">Sagar</h2>

        <div className="flex items-center">
          <a
            href="/resume-19-02-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm rounded-md shadow-lg shadow-gray-400 p-2 mr-5 hover:scale-110 transition"
          >
            Resume.pdf
          </a>
          <a
            href="https://www.linkedin.com/in/sagar-dhebe-891997244"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={20} className="mr-4" />
          </a>

          <a
            href="https://github.com/sagar8928"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} className="mr-4" />
          </a>
        </div>
      </div>

      {/* Title */}
      <div className="text-center py-4 text-xl font-bold uppercase tracking-wider">
        <div className="hidden sm:block">
          <p>
            Full-Stack Web Development <span className="px-1">|</span>
            MERN Stack Development
          </p>
        </div>

        <div className="sm:hidden">
          <p className="py-2">Full-Stack Web Development</p>
          <p>MERN Stack Development</p>
        </div>
      </div>

      {/* Skills */}
      <div className="text-center py-4">
        <h5 className="underline text-lg py-2">Skills</h5>
        <p className="py-2 text-sm leading-relaxed">
          <span className="font-bold">Technical:</span> HTML | CSS | JavaScript
          | React | Next.js | Node.js | Express | MongoDB | MySQL | Tailwind CSS
          | REST APIs
        </p>
      </div>
    </div>
  );
}
