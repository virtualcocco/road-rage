import Link from "next/link";
import {
  AlertTriangle,

  ShieldAlert,
  Shirt,
  ArrowRight,
  Car,
  Zap,
  Eye,
  Camera,
} from "lucide-react";

const archetypePreview = [
  {
    name: "The Tailgater",
    emoji: "🚗💨",
    desc: "Two inches from your bumper at 75 mph. Flashing lights optional but encouraged.",
  },
  {
    name: "The Double Parker",
    emoji: "🅿️🅿️",
    desc: "One space was never enough. Why settle for a spot when you can ruin two?",
  },
  {
    name: "The Left Lane Philosopher",
    emoji: "🐢🛣️",
    desc: "Going 52 in the left lane. Deep in thought. Completely unaware of the fury behind them.",
  },
  {
    name: "The Blinker Denier",
    emoji: "🔇➡️",
    desc: "Turn signals are optional. Telepathy is the preferred communication method.",
  },
];

const merchPreview = [
  "Use Your Blinker, You Maniac",
  "Reported for Crimes Against Merging",
  "Left Lane Is Not Your Birthright",
  "You've Been Mentally Reported",
];

const SOCIALS = [
  { label: "TikTok", href: "https://www.tiktok.com/@yousuckatdrivingnet" },
  { label: "Instagram", href: "https://www.instagram.com/usuckatdriving/" },
  { label: "X", href: "https://x.com/Usuckatdriving" },
  { label: "Threads", href: "https://www.threads.com/@usuckatdriving" },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            You{" "}
            <span className="brand-gradient-text">Suck</span>{" "}
            At Driving.
            <br />
            <span className="text-2xl md:text-4xl text-zinc-400 font-bold mt-2 block">
              And we&apos;re collecting the evidence.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Caught someone driving like they got their license from a cereal box?
            Report them. Upload the video. Let the world know they suck.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg transition-all hover:scale-105"
            >
              <ShieldAlert className="w-5 h-5" />
              Report a Sucky Driver
            </Link>
            <Link
              href="/merch"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-lg transition-all"
            >
              <Shirt className="w-5 h-5" />
              Merch & Gear
            </Link>
          </div>

          {/* Social links under CTA */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-600 hover:text-red-400 transition-colors font-medium"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-zinc-500 text-center mb-14 max-w-xl mx-auto">
            Three easy steps to let the world know someone sucks at driving.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Camera,
                title: "1. Catch them sucking",
                desc: "See someone driving like an absolute menace? Grab the dashcam footage, snap a photo, or just describe the chaos.",
              },
              {
                icon: Car,
                title: "2. Report the sucky driver",
                desc: "Fill out the report form. Tell us what happened, where, and why they suck. Upload your video evidence.",
              },
              {
                icon: Zap,
                title: "3. They become content",
                desc: "The best (worst?) reports become social media posts, driver archetypes, and proof that some people shouldn't have licenses.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="text-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-600/10 mb-4">
                  <step.icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER TYPES PREVIEW */}
      <section className="py-20 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">The Hall of Suck</h2>
            <p className="text-zinc-400">
              Meet the worst people on the road. You definitely know all of them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {archetypePreview.map((a) => (
              <div
                key={a.name}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
              >
                <div className="text-3xl mb-3">{a.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{a.name}</h3>
                <p className="text-zinc-400 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/archetypes"
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              See all driver types <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MERCH TEASER */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-600/10 mb-6">
            <Shirt className="w-7 h-7 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Merch & Dash Cams</h2>
          <p className="text-zinc-400 mb-10">
            Bumper stickers for the passive-aggressive driver in you. Plus dash cams to catch everyone else sucking.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {merchPreview.map((slogan) => (
              <span
                key={slogan}
                className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-sm font-medium text-zinc-300"
              >
                {slogan}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/merch"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all hover:scale-105"
            >
              Browse Merch & Gear
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
          <p className="text-zinc-400 text-sm leading-relaxed">
            This is a humor site for reporting sucky drivers. All reports are
            anonymous. We never publish license plates, names, or personal info.
            No doxxing. No mobs. Just vibes, videos, and the collective therapy
            of knowing you&apos;re not the only one screaming in traffic.
          </p>
        </div>
      </section>
    </div>
  );
}
