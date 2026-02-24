'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useTransition } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';

export default function ContactPage() {
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(formRef.current);

    startTransition(async () => {
      // TODO: replace with Server Action (Resend / Nodemailer)
      console.log({
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        subject: data.get('subject'),
        message: data.get('message'),
      });

      formRef.current.reset();
      alert('Message sent');
    });
  }

  return (
    <section id="contact" className="w-full min-h-screen">
      <div className="max-w-[1240px] mx-auto px-4 py-20">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4 text-3xl font-semibold">Get In Touch</h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT */}
          <div className="col-span-3 lg:col-span-2 shadow-xl rounded-xl p-4">
            <div className="p-4 h-full">
              <Image
                src="/assets/contact.jpg"
                alt="Contact"
                width={600}
                height={400}
                className="rounded-xl hover:scale-105 transition"
              />

              <div className="mt-6">
                <h3 className="text-xl font-semibold">Sagar Dhebe</h3>
                <p className="text-gray-600">Full-Stack Developer</p>
                <p className="py-4 text-gray-600">
                  Available for full-time roles and serious freelance work.
                  Let’s build something solid.
                </p>
              </div>

              <p className="uppercase pt-8 text-sm tracking-widest">
                Connect With Me
              </p>

              {/* SOCIAL LINKS */}
              <div className="flex items-center gap-6 py-4">
                <a
                  href="https://www.linkedin.com/in/sagar-dhebe-891997244"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
                >
                  <FaLinkedinIn size={20} />
                </a>

                <a
                  href="https://github.com/sagar8928"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
                >
                  <FaGithub size={20} />
                </a>

                <a
                  href="mailto:sagardhebe8928@gmail.com"
                  aria-label="Email"
                  className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
                >
                  <AiOutlineMail size={22} />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume"
                  className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
                >
                  <BsFillPersonLinesFill size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-3 shadow-xl rounded-xl p-6">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Name" name="name" />
                <Input label="Phone" name="phone" />
              </div>

              <Input label="Email" name="email" type="email" />
              <Input label="Subject" name="subject" />

              <div className="flex flex-col py-2">
                <label className="uppercase text-sm py-2">Message</label>
                <textarea
                  name="message"
                  rows={10}
                  required
                  className="border-2 rounded-lg p-3 border-gray-300"
                />
              </div>

              <button
                disabled={isPending}
                className="w-full bg-[#5651e5] text-white p-4 mt-4 rounded-lg hover:bg-[#4640d9] transition disabled:opacity-50"
              >
                {isPending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* BACK TO TOP */}
        <div className="flex justify-center py-12">
          <Link href="/">
            <div className="rounded-full shadow-lg p-4 hover:scale-110 transition cursor-pointer">
              <HiOutlineChevronDoubleUp size={30} className="text-[#5651e5]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function Input({ label, name, type = 'text' }) {
  return (
    <div className="flex flex-col py-2">
      <label className="uppercase text-sm py-2">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="border-2 rounded-lg p-3 border-gray-300"
      />
    </div>
  );
}
