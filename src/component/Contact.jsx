'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useTransition, useEffect } from 'react'; // ✅ Added useEffect
import emailjs from '@emailjs/browser';

import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';

// ==================== ENVIRONMENT VARIABLES ====================
// ✅ HIGHLIGHT: These read from process.env
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// ✅ DEBUG: Log to verify values are loaded (remove in production)
console.log('🔍 EmailJS Config:', {
  SERVICE_ID: SERVICE_ID || '❌ UNDEFINED',
  TEMPLATE_ID: TEMPLATE_ID || '❌ UNDEFINED',
  PUBLIC_KEY: PUBLIC_KEY || '❌ UNDEFINED',
});
// ================================================================

export default function ContactPage() {
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  // ✅ ADD THIS: Check if env vars are loaded on mount
  useEffect(() => {
    if (!PUBLIC_KEY) {
      console.error('❌ NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not defined!');
      alert(
        'Configuration error: EmailJS Public Key is missing. Check console.',
      );
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ HIGHLIGHT: Guard clause to prevent submission if key is missing
    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      alert(
        'EmailJS configuration is missing. Please check your environment variables.',
      );
      return;
    }

    const formData = new FormData(formRef.current);

    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    startTransition(async () => {
      try {
        // ✅ HIGHLIGHT: Correct parameter order for emailjs.send()
        // send(serviceID, templateID, templateParams, publicKey)
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        formRef.current.reset();
        alert('✅ Message sent successfully!');
      } catch (error) {
        console.error('❌ EmailJS Error:', error);
        alert('❌ Failed to send message: ' + error.message);
      }
    });
  }

  // ... rest of your component remains the same

  return (
    <section id="contact" className="w-full min-h-screen">
      <div className="max-w-[1240px] mx-auto px-4 py-20">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4 text-3xl font-semibold">Get In Touch</h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT */}
          <aside className="col-span-3 lg:col-span-2 shadow-xl rounded-xl p-4">
            <div className="p-4 h-full">
              <Image
                src="/assets/contact.jpg"
                alt="Contact"
                width={600}
                height={400}
                priority
                className="rounded-xl hover:scale-105 transition"
              />

              <div className="mt-6">
                <h3 className="text-xl font-semibold">Sagar Dhebe</h3>
                <p className="text-gray-600">Full-Stack Developer</p>
                <p className="py-4 text-gray-600">
                  Available for full-time roles and serious freelance work.
                </p>
              </div>

              <p className="uppercase pt-8 text-sm tracking-widest">
                Connect With Me
              </p>

              <div className="flex items-center gap-6 py-4">
                <SocialLink
                  href="https://www.linkedin.com/in/sagar-dhebe-891997244"
                  label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </SocialLink>

                <SocialLink href="https://github.com/sagar8928" label="GitHub">
                  <FaGithub size={20} />
                </SocialLink>

                <SocialLink
                  href="mailto:sagardhebe12yt@gmail.com"
                  label="Email"
                >
                  <AiOutlineMail size={22} />
                </SocialLink>

                <SocialLink href="/resume.pdf" label="Resume">
                  <BsFillPersonLinesFill size={20} />
                </SocialLink>
              </div>
            </div>
          </aside>

          {/* RIGHT */}
          <div className="col-span-3 shadow-xl rounded-xl p-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              <fieldset className="grid md:grid-cols-2 gap-4">
                <Input id="name" label="Name" name="name" required />
                <Input id="phone" label="Phone" name="phone" type="tel" />
              </fieldset>

              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                required
              />

              <Input id="subject" label="Subject" name="subject" required />

              <div className="flex flex-col py-2">
                <label htmlFor="message" className="uppercase text-sm py-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={10}
                  required
                  className="border-2 rounded-lg p-3 border-gray-300 resize-none"
                />
              </div>

              <button
                type="submit"
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
          <Link href="/" aria-label="Back to top">
            <div className="rounded-full shadow-lg p-4 hover:scale-110 transition cursor-pointer">
              <HiOutlineChevronDoubleUp size={30} className="text-[#5651e5]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================= HELPERS ================= */

function Input({ id, label, name, type = 'text', required = false }) {
  return (
    <div className="flex flex-col py-2">
      <label htmlFor={id} className="uppercase text-sm py-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="border-2 rounded-lg p-3 border-gray-300"
      />
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-full p-4 shadow-lg cursor-pointer text-gray-500 hover:text-[#5651e5] hover:scale-110 transition"
    >
      {children}
    </a>
  );
}
