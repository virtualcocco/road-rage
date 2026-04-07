"use client";

import { useEffect, useState, useRef } from "react";
import { supabase, Report } from "@/lib/supabase";
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Play,
  Copy,
  Download,
  Image as ImageIcon,
  Video,
  Eye,
  ChevronDown,
  ChevronUp,
  Share2,
  MapPin,
  Calendar,
  Tag,
  Car,
  Lock,
  Loader2,
  ExternalLink,
} from "lucide-react";

const STORAGE_BASE =
  "https://coziheqifnyjchhwfdhy.supabase.co/storage/v1/object/public/report-media";

const STATUS_COLORS = {
  pending: "text-yellow-400 bg-yellow-400/10",
  approved: "text-green-400 bg-green-400/10",
  rejected: "text-red-400 bg-red-400/10",
};

function isVideo(url: string) {
  return /\.(mp4|mov|webm|avi|mkv)$/i.test(url);
}

function MediaPreview({
  mediaUrl,
  expanded,
}: {
  mediaUrl: string;
  expanded: boolean;
}) {
  const fullUrl = `${STORAGE_BASE}/${mediaUrl}`;
  const video = isVideo(mediaUrl);
  const [videoError, setVideoError] = useState(false);

  if (!expanded) {
    return (
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700">
        {video ? (
          <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center">
            <Play className="w-6 h-6 text-white" fill="white" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fullUrl}
            alt="Report media"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
      {video ? (
        <div>
          {videoError ? (
            <div className="w-full bg-zinc-900 p-8 text-center">
              <Video className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm mb-3">Video can&apos;t play inline — open it directly instead.</p>
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open Video
              </a>
            </div>
          ) : (
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[500px]"
              onError={() => setVideoError(true)}
            >
              <source src={fullUrl} type={
                mediaUrl.endsWith(".mp4") ? "video/mp4" :
                mediaUrl.endsWith(".webm") ? "video/webm" :
                mediaUrl.endsWith(".mov") ? "video/quicktime" :
                "video/mp4"
              } />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="flex gap-2 p-3 bg-zinc-900 border-t border-zinc-700">
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 text-xs transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Open in new tab
            </a>
            <a
              href={fullUrl}
              download={mediaUrl.split("/").pop() || "video"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 text-xs transition-colors"
            >
              <Download className="w-3 h-3" />
              Save video
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullUrl}
            alt="Report media"
            className="w-full max-h-[500px] object-contain"
          />
          <div className="flex gap-2 p-3 bg-zinc-900 border-t border-zinc-700">
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 text-xs transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Open full size
            </a>
            <a
              href={fullUrl}
              download={mediaUrl.split("/").pop() || "image"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 text-xs transition-colors"
            >
              <Download className="w-3 h-3" />
              Save image
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialCaption({ report }: { report: Report }) {
  const [copied, setCopied] = useState(false);

  const caption = [
    `🚗 ${report.category}`,
    report.description ? `"${report.description}"` : "",
    report.city && report.state
      ? `📍 ${report.city}, ${report.state}`
      : report.state
      ? `📍 ${report.state}`
      : "",
    "",
    "#yousuckatdriving #baddrivers #roadrage #driving",
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-orange-400" />
          Social Caption
        </h4>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="w-3 h-3 text-green-400" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy Caption
            </>
          )}
        </button>
      </div>
      <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-sans leading-relaxed">
        {caption}
      </pre>
    </div>
  );
}

function ReportCard({
  report,
  onStatusUpdate,
}: {
  report: Report;
  onStatusUpdate: (id: string, status: "approved" | "rejected") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMedia = !!report.media_url;
  const mediaUrl = report.media_url || "";
  const fullMediaUrl = hasMedia ? `${STORAGE_BASE}/${mediaUrl}` : "";
  const video = hasMedia && isVideo(mediaUrl);

  const handleDownload = async () => {
    if (!fullMediaUrl) return;
    try {
      const res = await fetch(fullMediaUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = mediaUrl.split("/").pop() || "media";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(fullMediaUrl, "_blank");
    }
  };

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors">
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                STATUS_COLORS[report.status]
              }`}
            >
              {report.status}
            </span>
            <span className="text-sm font-semibold text-orange-400 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {report.category}
            </span>
            {hasMedia && (
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                {video ? (
                  <Video className="w-3 h-3" />
                ) : (
                  <ImageIcon className="w-3 h-3" />
                )}
                {video ? "Video" : "Photo"}
              </span>
            )}
          </div>
          <span className="text-xs text-zinc-600 whitespace-nowrap flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(report.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Body — description + thumbnail */}
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-zinc-300 text-sm mb-3 leading-relaxed">
              {report.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
              {report.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {report.city}, {report.state}
                </span>
              )}
              {report.location && <span>{report.location}</span>}
              {report.time_of_day && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {report.time_of_day}
                </span>
              )}
              {report.plate_text && (
                <span className="text-yellow-600 font-mono flex items-center gap-1">
                  <Car className="w-3 h-3" />
                  {report.plate_text}
                  {report.plate_state ? ` (${report.plate_state})` : ""}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail */}
          {hasMedia && !expanded && (
            <button onClick={() => setExpanded(true)} title="Expand media">
              <MediaPreview mediaUrl={mediaUrl} expanded={false} />
            </button>
          )}
        </div>

        {/* Expanded media */}
        {hasMedia && expanded && (
          <MediaPreview mediaUrl={mediaUrl} expanded={true} />
        )}

        {/* Social caption (when expanded) */}
        {expanded && <SocialCaption report={report} />}

        {/* Action bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
          <div className="flex gap-2">
            {report.status === "pending" && (
              <>
                <button
                  onClick={() => onStatusUpdate(report.id, "approved")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600/10 text-green-400 hover:bg-green-600/20 text-sm font-medium transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => onStatusUpdate(report.id, "rejected")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 text-sm font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2">
            {hasMedia && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 text-sm transition-colors"
                title="Download media"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 text-sm transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Collapse
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" /> Expand
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("admin_authed", "1");
        onUnlock();
      } else {
        setError("Wrong password. Try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-2xl bg-zinc-900 border border-zinc-800"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-red-500" />
          <h1 className="text-xl font-bold">Admin Access</h1>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          autoFocus
        />
        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          disabled={checking || !password}
          className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors disabled:opacity-50"
        >
          {checking ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Unlock Dashboard"
          )}
        </button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "pending" | "approved" | "rejected" | "all" | "media"
  >("pending");
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, withMedia: 0, total: 0 });

  const fetchReports = async () => {
    setLoading(true);

    // Fetch all for stats
    const { data: allData } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    const all = (allData as Report[]) || [];

    setStats({
      pending: all.filter((r) => r.status === "pending").length,
      approved: all.filter((r) => r.status === "approved").length,
      rejected: all.filter((r) => r.status === "rejected").length,
      withMedia: all.filter((r) => r.media_url).length,
      total: all.length,
    });

    let filtered = all;
    if (filter === "media") {
      filtered = all.filter((r) => r.media_url);
    } else if (filter !== "all") {
      filtered = all.filter((r) => r.status === filter);
    }

    setReports(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    await supabase.from("reports").update({ status }).eq("id", id);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    setStats((prev) => ({
      ...prev,
      pending: prev.pending - 1,
      [status]: prev[status] + 1,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-red-500" />
            Admin Dashboard
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Review reports, preview media, and grab content for social.
          </p>
        </div>
        <button
          onClick={fetchReports}
          className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {[
          { label: "Total", value: stats.total, color: "text-zinc-300" },
          { label: "Pending", value: stats.pending, color: "text-yellow-400" },
          { label: "Approved", value: stats.approved, color: "text-green-400" },
          { label: "Rejected", value: stats.rejected, color: "text-red-400" },
          { label: "With Media", value: stats.withMedia, color: "text-blue-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(["pending", "approved", "rejected", "media", "all"] as const).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f === "media"
                ? "📷 With Media"
                : f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && stats.pending > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-yellow-400/20 text-yellow-400">
                  {stats.pending}
                </span>
              )}
            </button>
          )
        )}
      </div>

      {/* Reports */}
      {loading ? (
        <div className="text-center py-20 text-zinc-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-500 mb-2">
            No {filter === "all" ? "" : filter === "media" ? "media" : filter}{" "}
            reports
          </h2>
          <p className="text-zinc-600">
            {filter === "pending"
              ? "All caught up! No reports waiting for review."
              : filter === "media"
              ? "No reports with photos or videos yet."
              : "No reports match this filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onStatusUpdate={updateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return <PasswordGate onUnlock={() => setAuthed(true)} />;
  }

  return <AdminDashboard />;
}
