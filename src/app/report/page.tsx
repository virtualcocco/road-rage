"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, getSupabase, CATEGORIES, STATES } from "@/lib/supabase";
import { ShieldAlert, CheckCircle, Loader2, MapPin, Camera, Clock } from "lucide-react";

export default function ReportPage() {
  const [form, setForm] = useState({
    plate_text: "",
    plate_state: "",
    category: "",
    description: "",
    city: "",
    state: "FL",
    time_of_day: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [timestamp, setTimestamp] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect location on mount
  useEffect(() => {
    detectLocation();
    // Set automatic timestamp
    const now = new Date();
    setTimestamp(now.toISOString());
    // Also auto-detect time of day
    const hour = now.getHours();
    let tod = "";
    if (hour >= 6 && hour < 9) tod = "morning_rush";
    else if (hour >= 9 && hour < 15) tod = "midday";
    else if (hour >= 15 && hour < 19) tod = "evening_rush";
    else if (hour >= 19 && hour < 22) tod = "evening";
    else tod = "late_night";
    setForm((prev) => ({ ...prev, time_of_day: tod }));
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get city/state
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { "User-Agent": "yousuckatdriving.net" } }
          );
          const data = await res.json();
          const addr = data.address || {};
          const city = addr.city || addr.town || addr.village || addr.county || "";
          const stateCode = getStateCode(addr.state || "");
          setForm((prev) => ({
            ...prev,
            city: city,
            state: stateCode || prev.state,
          }));
          setGeoStatus("done");
        } catch {
          setGeoStatus("error");
        }
      },
      () => {
        setGeoStatus("error");
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  // Convert full state name to abbreviation
  const getStateCode = (stateName: string): string => {
    const stateMap: Record<string, string> = {
      Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
      Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
      Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA",
      Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
      Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS", Missouri: "MO",
      Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
      "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
      Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI",
      "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX",
      Utah: "UT", Vermont: "VT", Virginia: "VA", Washington: "WA", "West Virginia": "WV",
      Wisconsin: "WI", Wyoming: "WY",
    };
    return stateMap[stateName] || "";
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "video/mp4", "video/quicktime", "video/webm"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a photo (JPG, PNG, WebP) or video (MP4, MOV, WebM).");
      return;
    }

    // Validate file size (50MB max for video, 10MB for images)
    const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(file.type.startsWith("video/") ? "Video must be under 50MB." : "Image must be under 10MB.");
      return;
    }

    setMediaFile(file);
    setError("");

    // Generate preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setMediaPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setMediaPreview("video");
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatTimestamp = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.category || !form.description) {
      setError("Please select why they suck and tell us about it.");
      return;
    }

    setSubmitting(true);
    try {
      let media_url: string | null = null;

      // Upload media file if present
      if (mediaFile) {
        const client = getSupabase();
        if (client) {
          const ext = mediaFile.name.split(".").pop() || "bin";
          const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { data: uploadData, error: uploadError } = await client
            .storage
            .from("report-media")
            .upload(fileName, mediaFile);

          if (uploadError) {
            console.warn("Media upload failed, submitting without media:", uploadError);
          } else if (uploadData) {
            media_url = fileName;
          }
        }
      }

      const { error: dbError } = await supabase.from("reports").insert({
        category: form.category,
        description: form.description,
        city: form.city,
        state: form.state,
        time_of_day: form.time_of_day,
        plate_text: form.plate_text || null,
        plate_state: form.plate_state || null,
        media_url,
        reported_at: timestamp || new Date().toISOString(),
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
        <h1 className="text-3xl font-bold mb-4">Sucky Driver Reported!</h1>
        <p className="text-zinc-400 mb-8">
          Your anonymous report has been filed. Our team will review it
          before it hits the public shame board.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setMediaFile(null);
            setMediaPreview(null);
            setTimestamp(new Date().toISOString());
            setForm({
              plate_text: "",
              plate_state: "",
              category: "",
              description: "",
              city: "",
              state: "FL",
              time_of_day: "",
            });
            detectLocation();
          }}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors"
        >
          Report Another Sucky Driver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Report a Sucky Driver</h1>
        <p className="text-zinc-400">
          Spotted someone who sucks at driving? Snitch anonymously. No identifying info is ever published.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. LICENSE PLATE + PLATE STATE — FIRST */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Sucky Driver&apos;s License Plate (optional, never published)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <input
                type="text"
                value={form.plate_text}
                onChange={(e) =>
                  setForm({ ...form, plate_text: e.target.value.toUpperCase() })
                }
                placeholder="ABC 1234"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors text-lg tracking-wider font-mono"
              />
              <p className="text-xs text-zinc-600 mt-1">
                Never displayed publicly.
              </p>
            </div>
            <div>
              <select
                value={form.plate_state}
                onChange={(e) => setForm({ ...form, plate_state: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="">State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <p className="text-xs text-zinc-600 mt-1">
                {form.plate_state === "OH"
                  ? "Ohio? Yeah, that tracks. 😂"
                  : "Let me guess... Ohio? 🤔"}
              </p>
            </div>
          </div>
        </div>

        {/* 2. WHAT HAPPENED — "Driving slow in the left lane" is first */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Why do they suck? *
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

        {/* 3. DESCRIPTION */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Tell us why they suck *
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            placeholder="This absolute menace in a white SUV cut across three lanes without signaling, nearly clipped my bumper, then had the audacity to honk at ME..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
          />
        </div>

        {/* 4. PHOTO / VIDEO UPLOAD — KEY for social media content */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            <Camera className="w-4 h-4 inline mr-1 -mt-0.5" />
            Upload Photo or Video
          </label>
          <p className="text-xs text-zinc-500 mb-3">
            Got the receipts? Photos and videos of sucky drivers make the best content. Faces and plates are blurred before any public use.
          </p>

          {!mediaPreview ? (
            <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-zinc-700 hover:border-red-500 bg-zinc-900/50 cursor-pointer transition-colors group">
              <Camera className="w-8 h-8 text-zinc-600 group-hover:text-red-500 mb-2 transition-colors" />
              <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
                Tap to upload photo or video
              </span>
              <span className="text-xs text-zinc-600 mt-1">
                JPG, PNG, WebP, MP4, MOV — max 50MB
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,video/mp4,video/quicktime,video/webm"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-zinc-700">
              {mediaPreview === "video" ? (
                <div className="flex items-center justify-center h-36 bg-zinc-900">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-zinc-300">{mediaFile?.name}</p>
                    <p className="text-xs text-zinc-500">
                      {((mediaFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={mediaPreview}
                  alt="Upload preview"
                  className="w-full h-48 object-cover"
                />
              )}
              <button
                type="button"
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* 5. LOCATION — Auto-detected city/state, NO intersection field */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1 -mt-0.5" />
            Location
            {geoStatus === "loading" && (
              <span className="text-xs text-zinc-500 ml-2">
                <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                Detecting...
              </span>
            )}
            {geoStatus === "done" && (
              <span className="text-xs text-green-500 ml-2">Auto-detected</span>
            )}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <div>
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
          {geoStatus === "error" && (
            <button
              type="button"
              onClick={detectLocation}
              className="text-xs text-red-400 hover:text-red-300 mt-2 underline"
            >
              Location detection failed — tap to retry
            </button>
          )}
        </div>

        {/* 6. AUTOMATIC TIMESTAMP */}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            <Clock className="w-4 h-4 inline mr-1 -mt-0.5" />
            When it happened
          </label>
          <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm flex items-center justify-between">
            <span>{timestamp ? formatTimestamp(timestamp) : "Just now"}</span>
            <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
              Auto-captured
            </span>
          </div>
          <p className="text-xs text-zinc-600 mt-1">
            Timestamp is recorded automatically when you open this form.
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
