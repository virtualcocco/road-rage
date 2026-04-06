"use client";

import { useState } from "react";
import { supabase, CATEGORIES, STATES } from "@/lib/supabase";
import { ShieldAlert, CheckCircle, Loader2 } from "lucide-react";

export default function ReportPage() {
  const [form, setForm] = useState({
    category: "",
    description: "",
    location: "",
    city: "",
    state: "FL",
    time_of_day: "",
    plate_text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.category || !form.description) {
      setError("Please select a category and describe what happened.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("reports").insert({
        category: form.category,
        description: form.description,
        location: form.location,
        city: form.city,
        state: form.state,
        time_of_day: form.time_of_day,
        plate_text: form.plate_text || null,
        status: "pending",
      });

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Report Submitted</h1>
        <p className="text-zinc-400 mb-8">
          Your anonymous report has been filed. It will be reviewed by our
          moderation team before contributing to public trends.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              category: "",
              description: "",
              location: "",
              city: "",
              state: "FL",
              time_of_day: "",
              plate_text: "",
            });
          }}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors"
        >
          File Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Report a Driver</h1>
        <p className="text-zinc-400">
          All reports are anonymous. No identifying info is ever published.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            What happened? *
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Tell us what happened *
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            placeholder="A white SUV cut across three lanes without signaling, nearly clipped my bumper, then had the audacity to honk at ME..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="St. Petersburg"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              State
            </label>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Intersection / road */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Intersection or road (optional)
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="I-275 near the Howard Frankland Bridge"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Time of day */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            When did it happen? (optional)
          </label>
          <select
            value={form.time_of_day}
            onChange={(e) =>
              setForm({ ...form, time_of_day: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
          >
            <option value="">Select a time range...</option>
            <option value="morning_rush">Morning Rush (6-9 AM)</option>
            <option value="midday">Midday (9 AM - 3 PM)</option>
            <option value="evening_rush">Evening Rush (3-7 PM)</option>
            <option value="evening">Evening (7-10 PM)</option>
            <option value="late_night">Late Night (10 PM - 6 AM)</option>
          </select>
        </div>

        {/* Plate — internal only */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            License plate (optional, never published)
          </label>
          <input
            type="text"
            value={form.plate_text}
            onChange={(e) =>
              setForm({ ...form, plate_text: e.target.value.toUpperCase() })
            }
            placeholder="ABC 1234"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
          />
          <p className="text-xs text-zinc-600 mt-1">
            Used only for internal pattern matching. Never displayed publicly.
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <ShieldAlert className="w-5 h-5" /> Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
}
