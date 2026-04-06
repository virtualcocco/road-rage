"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, AlertTriangle } from "lucide-react";

const links = [
  { href: "/report", label: "Report a Driver" },
  { href: "/archetypes", label: "Driver Types" },
  { href: "/trends", label: "Trends" },
  { href: "/merch", label: "Merch" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <AlertTriangle className="w-6 h-6 text-red-500 group-hover:text-orange-400 transition-colors" />
          <span className="font-bold text-lg tracking-tight">
            <span className="text-red-500">You Suck</span>{" "}
            <span className="text-zinc-400">At Driving</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/report"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
          >
            File a Report
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-zinc-400 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/report"
            className="block text-center font-semibold px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            File a Report
          </Link>
        </div>
      )}
    </nav>
  );
}
