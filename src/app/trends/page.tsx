"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BarChart3, Clock, MapPin, TrendingUp } from "lucide-react";

type TrendData = {
  totalReports: number;
  topCategories: { category: string; count: number }[];
  topCities: { city: string; count: number }[];
  topTimes: { time_of_day: string; count: number }[];
};

const TIME_LABELS: Record<string, string> = {
  morning_rush: "Morning Rush (6-9 AM)",
  midday: "Midday (9 AM - 3 PM)",
  evening_rush: "Evening Rush (3-7 PM)",
  evening: "Evening (7-10 PM)",
  late_night: "Late Night (10 PM - 6 AM)",
};

// Placeholder data for when the DB is empty or not connected
const PLACEHOLDER: TrendData = {
  totalReports: 0,
  topCategories: [
    { category: "Tailgating", count: 0 },
    { category: "No turn signal", count: 0 },
    { category: "Unsafe lane change", count: 0 },
    { category: "Distracted driving", count: 0 },
    { category: "Parking like a maniac", count: 0 },
  ],
  topCities: [],
  topTimes: [],
};

export default function TrendsPage() {
  const [data, setData] = useState<TrendData>(PLACEHOLDER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const { data: reports } = await supabase
          .from("reports")
          .select("category, city, time_of_day")
          .eq("status", "approved");

        if (!reports || reports.length === 0) {
          setData(PLACEHOLDER);
          setLoading(false);
          return;
        }

        // Aggregate categories
        const catMap: Record<string, number> = {};
        const cityMap: Record<string, number> = {};
        const timeMap: Record<string, number> = {};

        for (const r of reports) {
          catMap[r.category] = (catMap[r.category] || 0) + 1;
          if (r.city) cityMap[r.city] = (cityMap[r.city] || 0) + 1;
          if (r.time_of_day)
            timeMap[r.time_of_day] = (timeMap[r.time_of_day] || 0) + 1;
        }

        setData({
          totalReports: reports.length,
          topCategories: Object.entries(catMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([category, count]) => ({ category, count })),
          topCities: Object.entries(cityMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([city, count]) => ({ city, count })),
          topTimes: Object.entries(timeMap)
            .sort((a, b) => b[1] - a[1])
            .map(([time_of_day, count]) => ({ time_of_day, count })),
        });
      } catch {
        setData(PLACEHOLDER);
      } finally {
        setLoading(false);
      }
    }

    fetchTrends();
  }, []);

  const maxCatCount = Math.max(...data.topCategories.map((c) => c.count), 1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-3">Driving Trends</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Anonymous, aggregated data from real reports. No names, no plates —
          just patterns.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500">Loading trends...</div>
      ) : data.totalReports === 0 ? (
        <div className="text-center py-20">
          <TrendingUp className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-500 mb-2">
            No data yet
          </h2>
          <p className="text-zinc-600">
            Be the first to submit a report and start building the trends.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Total count */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-5xl font-black brand-gradient-text">
              {data.totalReports}
            </p>
            <p className="text-zinc-400 mt-2">Total approved reports</p>
          </div>

          {/* Top categories */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <h2 className="font-bold text-lg">Top Complaints</h2>
            </div>
            <div className="space-y-4">
              {data.topCategories.map((c) => (
                <div key={c.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-300">{c.category}</span>
                    <span className="text-zinc-500">{c.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{
                        width: `${(c.count / maxCatCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top cities */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-lg">Hotspot Cities</h2>
            </div>
            {data.topCities.length === 0 ? (
              <p className="text-zinc-600 text-sm">
                Location data coming soon...
              </p>
            ) : (
              <div className="space-y-3">
                {data.topCities.map((c, i) => (
                  <div
                    key={c.city}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-300">
                      <span className="text-zinc-600 mr-2">#{i + 1}</span>
                      {c.city}
                    </span>
                    <span className="text-zinc-500">
                      {c.count} report{c.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Worst times */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-yellow-500" />
              <h2 className="font-bold text-lg">Worst Times to Drive</h2>
            </div>
            {data.topTimes.length === 0 ? (
              <p className="text-zinc-600 text-sm">
                Time data coming soon...
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {data.topTimes.map((t) => (
                  <div
                    key={t.time_of_day}
                    className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
                  >
                    <p className="text-sm font-medium text-zinc-300">
                      {TIME_LABELS[t.time_of_day] || t.time_of_day}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {t.count} report{t.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
