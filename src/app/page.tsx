import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  ShieldAlert,
  Shirt,
  ArrowRight,
  Car,
  Zap,
  Eye,
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

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Some people should{" "}
            <span className="brand-gradient-text">not</span> be operating a
            motor vehicle.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Report absurd driving. Track anonymous bad-driving trends. Laugh,
            vent, and maybe buy a bumper sticker.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg transition-all hover:scale-105"
            >
              <ShieldAlert className="w-5 h-5" />
              Report a Driver
            </Link>
            <Link
              href="/trends"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-lg transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              See the Worst Trends
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Car,
                title: "1. Report what happened",
                desc: "Submit a bad driving moment: tailgating, lane weaving, parking crimes, no-blinker nonsense, and more.",
              },
              {
                icon: Eye,
                title: "2. We track patterns",
                desc: "Reports help build anonymous trend data around where and how people drive terribly.",
              },
              {
                icon: Zap,
                title: "3. We turn chaos into content",
                desc: "The wildest themes become driver archetypes, stats, jokes, and merch.",
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
            <h2 className="text-3xl font-bold mb-3">Driver Types</h2>
            <p className="text-zinc-400">
              Meet the worst people on the road. You probably know all of them.
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
          <h2 className="text-3xl font-bold mb-3">Merch — Coming Soon</h2>
          <p className="text-zinc-400 mb-10">
            Bumper stickers, magnets, and shirts for people who are tired of
            being cut off.
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
              Browse Merch Ideas
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
          <p className="text-zinc-400 text-sm leading-relaxed">
            This is a humor and pattern-tracking project. It collects anonymous
            driving stories, surfaces trends, and serves documentation. Not to
            start a mob. Not to dox anybody. Just to turn everyday traffic
            insanity into stories, patterns, and possibly a T-shirt.
          </p>
        </div>
      </section>
    </div>
  );
}
