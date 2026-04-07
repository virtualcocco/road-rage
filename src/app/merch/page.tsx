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
  ShoppingBag,
  Flame,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const AFFILIATE_TAG = "yousuckatdriv-20";

// ── Real Amazon affiliate products with verified ASINs ──
const dashCams = [
  {
    name: "Vantrue N4 Pro 3-Channel Dash Cam",
    desc: "Front, inside, and rear. 4K front. Night vision. The gold standard for catching sucky drivers in the act.",
    price: "$320",
    asin: "B0C3M7HPRT",
    badge: "Best Overall",
  },
  {
    name: "Garmin Dash Cam 67W",
    desc: "Compact, 180° field of view, voice control. Set it and forget it — until someone does something stupid.",
    price: "$195",
    asin: "B093244D1J",
    badge: "Most Popular",
  },
  {
    name: "VIOFO A129 Plus Duo",
    desc: "Front and rear 2K. Budget-friendly but still catches every lane-drifter in crispy HD.",
    price: "$158",
    asin: "B08DV51H2X",
    badge: "Best Value",
  },
  {
    name: "Nexar Beam GPS Dash Cam",
    desc: "Auto-uploads clips to the cloud. Evidence secured before they even finish running the red light.",
    price: "$120",
    asin: "B07ZPGSKLS",
    badge: null,
  },
];

const funnyAccessories = [
  {
    name: "\"Student Driver\" Magnet (3-Pack)",
    desc: "Slap it on the car of your friend who drives like they just discovered what a steering wheel is.",
    price: "$10",
    asin: "B0CLWMSC9J",
    badge: "Gag Gift",
  },
  {
    name: "\"Dash Cam Recording\" Sticker (4-Pack)",
    desc: "Let tailgaters know they're on camera. Surprisingly effective at making people act right.",
    price: "$6",
    asin: "B07CW6VW3N",
    badge: null,
  },
  {
    name: "\"Use Your Blinkers\" Vinyl Sticker",
    desc: "Because apparently some people need a reminder that blinkers are not a premium upgrade.",
    price: "$7",
    asin: "B01K2NBGA2",
    badge: "Fan Favorite",
  },
  {
    name: "\"If I Passed You on the Right\" Sticker",
    desc: "If I passed you on the right, you're in the wrong lane. End of discussion.",
    price: "$7",
    asin: "B0F1FYT227",
    badge: null,
  },
];

// ── Bonfire store base URL (update slug once store is created) ──
const BONFIRE_STORE = "https://www.bonfire.com/stay-out-of-the-fast-lane";

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
        <h1 className="text-4xl font-bold mb-3">Merch & Gear</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Gear up to catch sucky drivers. Rep the brand. Make a statement every time you get in the car.
        </p>
      </div>

      {/* ═══ OUR CUSTOM MERCH ═══ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold">YSAD Originals</h2>
        </div>
        <p className="text-zinc-400 text-sm mb-6">
          Our own shirts and hoodies. Designed for people who are fed up with bad drivers. More designs coming soon.
        </p>

        {/* Featured product: Stay Out of the Fast Lane */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-600/40 transition-all overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product mockups */}
            <div className="bg-zinc-950 flex items-center justify-center p-4 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/merch-styles.png"
                alt="Stay Out of the Fast Lane merch — Premium Tee, Classic Tee, Hoodie, and Crewneck Sweatshirt"
                className="w-full"
              />
            </div>

            {/* Product info */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full w-fit mb-3">
                <Flame className="w-3 h-3" /> First Drop
              </span>
              <h3 className="font-bold text-2xl text-zinc-100 mb-2">
                Stay Out of the Fast Lane!
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Featuring the classic &ldquo;Slower Traffic Keep Right&rdquo; sign.
                Because some people need a reminder. Available in 4 styles.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">Premium Tee — $27.99</span>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">Classic Tee — $24.99</span>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">Hoodie — $41.99</span>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">Crewneck — $39.99</span>
              </div>
              <a
                href={BONFIRE_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all hover:scale-105 w-fit"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy on Bonfire
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-xs text-zinc-600 mt-2">
                Printed &amp; shipped by Bonfire. Made to order.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ DASH CAMS ═══ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Dash Cams</h2>
        </div>
        <p className="text-zinc-400 text-sm mb-6">
          Can&apos;t report a sucky driver without proof. These are our top picks.{" "}
          <span className="text-zinc-600">(Affiliate links — helps keep the site running.)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashCams.map((item) => (
            <a
              key={item.asin}
              href={`https://www.amazon.com/dp/${item.asin}?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-600/50 transition-all flex flex-col"
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

      {/* ═══ FUNNY ACCESSORIES ═══ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Stickers & Accessories</h2>
        </div>
        <p className="text-zinc-400 text-sm mb-6">
          Slap these on your car, your friend&apos;s car, or the car of whoever parked like an idiot next to you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {funnyAccessories.map((item) => (
            <a
              key={item.asin}
              href={`https://www.amazon.com/dp/${item.asin}?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-600/50 transition-all flex flex-col"
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

      {/* ═══ EMAIL SIGNUP ═══ */}
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
        {subscribed ? (
          <div>
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-1">You&apos;re on the list!</h3>
            <p className="text-zinc-400 text-sm">
              We&apos;ll let you know when shirts and hoodies drop.
            </p>
          </div>
        ) : (
          <div>
            <Mail className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-1">
              Get notified when YSAD merch drops
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              Shirts, hoodies, and more. No spam — just merch announcements.
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
