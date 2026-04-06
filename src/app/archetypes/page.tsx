import { AlertTriangle } from "lucide-react";

const archetypes = [
  {
    name: "The Tailgater",
    emoji: "🚗💨",
    tagline: "Personal space? Never heard of it.",
    desc: "Two inches from your bumper at 75 mph. Flashing lights optional but encouraged. Probably late for something they should have left earlier for.",
    traits: ["Impatient", "Aggressive", "Zero awareness of stopping distance"],
    habitat: "Highways, school zones (somehow still tailgating), any lane you're in",
  },
  {
    name: "The Double Parker",
    emoji: "🅿️🅿️",
    tagline: "One space was never enough.",
    desc: "Why settle for a spot when you can ruin two? Bonus points for a lifted truck taking up four spaces at Target.",
    traits: ["Entitled", "Oblivious", "Probably in a hurry to buy nothing"],
    habitat: "Mall parking lots, grocery stores, anywhere with painted lines",
  },
  {
    name: "The Left Lane Philosopher",
    emoji: "🐢🛣️",
    tagline: "The speed limit is a suggestion — a low one.",
    desc: "Going 52 in the left lane. Deep in thought. Completely unaware of the fury behind them. Has never once checked a mirror.",
    traits: ["Slow", "Serene", "Maddeningly unaware"],
    habitat: "The left lane. Always the left lane. Only the left lane.",
  },
  {
    name: "The Blinker Denier",
    emoji: "🔇➡️",
    tagline: "Turn signals are a premium feature they didn't pay for.",
    desc: "Cuts across three lanes of traffic using telepathy alone. Believes blinkers reveal weakness.",
    traits: ["Unpredictable", "Secretive", "Probably an agent of chaos"],
    habitat: "Everywhere. They are among us.",
  },
  {
    name: "The Main Character",
    emoji: "🎬🚘",
    tagline: "The road is their movie set.",
    desc: "Weaving through traffic like it's a Fast & Furious audition. Every trip is an action sequence. Other drivers are just extras.",
    traits: ["Dramatic", "Self-absorbed", "Dangerously confident"],
    habitat: "Interstate on-ramps, parking garages, school drop-off lanes",
  },
  {
    name: "The Phone Zombie",
    emoji: "📱🧟",
    tagline: "Just one more scroll...",
    desc: "Swerving gently into your lane because TikTok waits for no one. The light's been green for 8 seconds but they haven't looked up yet.",
    traits: ["Distracted", "Drifting", "Will honk at YOU when you pass them"],
    habitat: "Red lights, slow traffic, anywhere a screen is more interesting than driving",
  },
  {
    name: "The Honk Artist",
    emoji: "📯😤",
    tagline: "Everything deserves a honk.",
    desc: "Light turned green 0.3 seconds ago? HONK. Someone merged legally? HONK. A bird landed on the road? HONK.",
    traits: ["Reactive", "Loud", "Permanently frustrated"],
    habitat: "Dense city streets, traffic jams, your nightmares",
  },
  {
    name: "The Merge Denier",
    emoji: "🚫🔀",
    tagline: "Zipper merge? Over my dead body.",
    desc: "Would rather cause a 40-car pileup than let you in. Makes direct eye contact while closing the gap.",
    traits: ["Territorial", "Petty", "Will lose 2 seconds to prove a point"],
    habitat: "Highway on-ramps, construction zones, anywhere lanes merge",
  },
];

export default function ArchetypesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-3">Driver Types</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          A field guide to the worst people on the road. Based on real reports
          from real frustrated drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {archetypes.map((a) => (
          <div
            key={a.name}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-900/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{a.emoji}</span>
              <div>
                <h2 className="font-bold text-xl">{a.name}</h2>
                <p className="text-sm text-red-400 italic">{a.tagline}</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mb-4">{a.desc}</p>
            <div className="mb-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Known Traits
              </p>
              <div className="flex flex-wrap gap-2">
                {a.traits.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Natural Habitat
              </p>
              <p className="text-xs text-zinc-500">{a.habitat}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
        <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <p className="text-zinc-400 text-sm">
          Know a driver type we&apos;re missing? Submit a report and help us
          identify the next archetype.
        </p>
      </div>
    </div>
  );
}
