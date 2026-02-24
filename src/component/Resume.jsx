import React from 'react';
import Head from 'next/head';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Resume() {
  return (
    <>
      <Head>
        <title>Sagar | Resume</title>
        <meta
          name="description"
          content="I’m a full-stack web developer specializing in building scalable, modern web applications."
        />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div className="max-w-[940px] mx-auto p-2 pt-[120px]">
        <div className="bg-[#d0d4d6] my-4 p-4 w-full flex justify-between items-center">
          <h2 className="font-bold">Sagar</h2>

          <div className="flex items-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-sm rounded-md shadow-lg shadow-gray-400 p-2 mr-5 hover:scale-110 ease-in duration-300"
            >
              Resume.pdf
            </a>

            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn size={20} className="mr-4" />
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub size={20} className="mr-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
