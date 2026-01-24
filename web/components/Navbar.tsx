'use client';

import { useState } from 'react';
import Link from 'next/link';

import { FaTag } from "react-icons/fa6";
import { MdOutlineFilterFrames } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-md bg-[#001330] p-4 text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-[#001330] text-white transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 text-xl font-semibold">Eric Doering</div>

        <ul className="space-y-4 px-6">
          <li className="flex items-center gap-2">
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <HiPaintBrush size={20} />
          </li>
          <li className="flex items-center gap-2">
            <Link href="/gallery" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <MdOutlineFilterFrames size={20} />
          </li>
          <li className="flex items-center gap-2">
            <Link href="/shop" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <FaTag size={20} />
          </li>
          <li className="flex items-center gap-2">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <IoMdContact size={20} />
          </li>
        </ul>
      </nav>
    </>
  );
}
