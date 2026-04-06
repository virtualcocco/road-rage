"use client";

import { useEffect, useState } from "react";
import { supabase, Report } from "@/lib/supabase";
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

const STATUS_COLORS = {
  pending: "text-yellow-400 bg-yellow-400/10",
  approved: "text-green-400 bg-green-400/10",
  rejected: "text-red-400 bg-red-400/10",
};

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  const fetchReports = async () => {
    setLoading(true);
    let query = supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setReports((data as Report[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("reports").update({ status }).eq("id", id);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-red-500" />
            Moderation Queue
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Review, approve, or reject submitted reports.
          </p>
        </div>
        <button
          onClick={fetchReports}
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-zinc-700 text-white"
                : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500">
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-500 mb-2">
            No {filter === "all" ? "" : filter} reports
          </h2>
          <p className="text-zinc-600">
            {filter === "pending"
              ? "All caught up! No reports waiting for review."
              : "No reports match this filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      STATUS_COLORS[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                  <span className="text-sm font-semibold text-orange-400">
                    {report.category}
                  </span>
                </div>
                <span className="text-xs text-zinc-600">
                  {new Date(report.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-zinc-300 text-sm mb-3">
                {report.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mb-4">
                {report.city && (
                  <span>
                    {report.city}, {report.state}
                  </span>
                )}
                {report.location && <span>{report.location}</span>}
                {report.time_of_day && <span>{report.time_of_day}</span>}
                {report.plate_text && (
                  <span className="text-yellow-600 font-mono">
                    [Plate: {report.plate_text}]
                  </span>
                )}
              </div>

              {report.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(report.id, "approved")}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600/10 text-green-400 hover:bg-green-600/20 text-sm font-medium transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(report.id, "rejected")}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 text-sm font-medium transition-colors"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
