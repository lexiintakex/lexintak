"use client";

import LegendDropdown from "@/components/ui/legend-dropdown";
import { ChartData } from "@/types/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsChart({
  chartData,
}: {
  chartData?: ChartData[];
}) {
  return (
    <div className="bg-white rounded-xl  my-6 border border-gray-100 shadow-sm">
      <div className="flex flex-col py-[30px] px-[20px]  bg-[#F4F9FF] lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Analytics Summary
        </h2>

        <LegendDropdown label="Select " />
      </div>

      <div className="h-80  py-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
            <Bar
              dataKey="applications"
              fill="#3b82f6"
              name="Applications"
              radius={[2, 2, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="completed"
              fill="#10b981"
              name="Completed"
              radius={[2, 2, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="pending"
              fill="#f59e0b"
              name="Pending"
              radius={[2, 2, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
