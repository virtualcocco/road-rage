"use client";

import { useState } from "react";
import {
  Shirt,
  Star,
  Mail,
  CheckCircle,
  Loader2,
  Camera,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// Replace YOUR-TAG-20 with your Amazon Associates tag once you have one
const AFFILIATE_TAG = "yousuckatdriv-20";

const affiliateGear = [
  {
    name: "Vantrue N4 Pro 3-Channel Dash Cam",
    desc: "Front, inside, and rear coverage. 4K front. Night vision. The gold standard for catching sucky drivers.",
    price: "$300",
    asin: "B0CG1GMP2H",
    badge: "Best Overall",
  },
  {
    name: "Garmin Dash Cam 67W",
    desc: "Compact, 180° field of view, voice control. Great for everyday proof that other people can't drive.",
    price: "$230",
    asin: "B0B3R4L4MZ",
    badge: "Most Popular",
  },
  {
    name: "VIOFO A129 Plus Duo",
    desc: "Front and rear 2K. Budget-friendly but still catches every lane-drifter and tailgater in HD.",
    price: "$170",
    asin: "B08DV51H3T",
    badge: "Best Value",
  },
  {
    name: "Nexar Beam GPS Dash Cam",
    desc: "Auto-uploads clips to the cloud. Perfect for when someone cuts you off and you need the evidence NOW.",
    price: "$130",
    asin: "B0BTMRHLKB",
    badge: null,
  },
  {
    name: "\"Student Driver\" Magnet (Funny)",
    desc: "Slap it on the car of your friend who drives like they just discovered what a steering wheel is.",
    price: "$10",
    asin: "B09WDGHFHB",
    badge: "Gag Gift",
  },
  {
    name: "Bumper Sticker: \"Dash Cam Recording\"",
    desc: "Let tailgaters know they're on camera. Surprisingly effective deterrent.",
    price: "$8",
    asin: "B07V52KPNL",
    badge: null,
  },
];

const bumperStickers = [
  { slogan: "Use Your Blinker, You Maniac", hot: true },
  { slogan: "Reported for Crimes Against Merging", hot: true },
  { slogan: "Left Lane Is Not Your Birthright", hot: true },
  { slogan: "You've Been Mentally Reported", hot: true },
  { slogan: "Parking Like It's a Personal Expression", hot: false },
  { slogan: "I Brake for Emotional Stability", hot: false },
  { slogan: "Main Character Driving Again", hot: false },
  { slogan: "Student Driver? No, Just Chaotic", hot: false },
  { slogan: "This Car Has Strong Opinions About Turn Signals", hot: false },
  { slogan: "Merge Like You Mean It", hot: false },
];

const shirts = [
  "Some people should not be operating a motor vehicle",
  "Drive better. Or become content.",
  "Tailgating is not a personality",
  "Blinkers are not premium features",
];

const jokeProducts = [
  {
    name: "Fake Citation Cards",
    desc: "Leave one under the wiper of terribly parked cars. Looks official. Is not.",
  },
  {
    name: "Bad Driver of the Week Certificate",
    desc: "A framed honor for the worst driver you witnessed this week.",
  },
];

export default function MerchPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("email_waitlist")
        .insert({ email: email.toLowerCase().trim() });
      if (dbError) {
        if (dbError.code === "23505") {
          // Unique constraint — already signed up
          setSubscribed(true);
        } else {
          throw dbError;
        }
      } else {
        setSubscribed(true);
      }
    } catch {
      setError("Something went wrong. Try again?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <Shirt className="w-10 h-10 text-orange-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-3">Merch</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Bumper stickers, magnets, and shirts for people who are tired of
          being cut off. Coming soon — get notified.
        </p>
      </div>

      {/* Affiliate Gear */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Camera className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Gear Up</h2>
        </div>
        <p className="text-zinc-400 text-sm mb-6">
          Catch every sucky driver in the act. These are our top picks for dash cams
          and driving accessories.{" "}
          <span className="text-zinc-600">(We may earn a small commission — keeps the site running.)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {affiliateGear.map((item) => (
            <a
              key={item.asin}
              href={`https://www.amazon.com/dp/${item.asin}?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-600/50 transition-all hover:bg-zinc-900/80 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-zinc-200 group-hover:text-orange-400 transition-colors text-sm leading-tight">
                  {item.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 flex-shrink-0 mt-0.5" />
              </div>
              {item.badge && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full w-fit mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  {item.badge}
                </span>
              )}
              <p className="text-xs text-zinc-500 mb-3 flex-1">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-400">{item.price}</span>
                <span className="text-xs text-zinc-600 group-hover:text-orange-500 transition-colors">
                  View on Amazon →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bumper Stickers */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          Bumper Stickers & Magnets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bumperStickers.map((item) => (
            <div
              key={item.slogan}
              className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-900/50 transition-colors flex items-center gap-3"
            >
              <div className="flex-1">
                <p className="font-semibold text-zinc-200">{item.slogan}</p>
              </div>
              {item.hot && (
                <span className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full whitespace-nowrap">
                  <Star className="w-3 h-3" /> Top Pick
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shirts */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">T-Shirts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shirts.map((slogan) => (
            <div
              key={slogan}
              className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-900/50 transition-colors"
            >
              <p className="font-semibold text-zinc-200">&quot;{slogan}&quot;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Joke Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Joke Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jokeProducts.map((p) => (
            <div
              key={p.name}
              className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800"
            >
              <h3 className="font-bold text-zinc-200 mb-1">{p.name}</h3>
              <p className="text-sm text-zinc-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Signup */}
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
        {subscribed ? (
          <div>
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-1">You&apos;re on the list!</h3>
            <p className="text-zinc-400 text-sm">
              We&apos;ll let you know when the store opens.
            </p>
          </div>
        ) : (
          <div>
            <Mail className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-1">
              Get notified when the store launches
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              No spam. Just merch announcements.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing up...</>
                ) : (
                  "Notify Me"
                )}
              </button>
            </form>
            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
