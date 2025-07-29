"use client";
import React from "react";
import { CardData, TableData } from "@/types/dashboard";
import StatsCard from "./Stats";
import AnalyticsChart from "./ActivityChart";
import DataTable from "./DataTable";
import { useDashboardData } from "@/api/dashboard";
import Loader from "@/components/ui/loader";
import { useClientStatusTable } from "@/api/auth";

function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData();

  const getColor = (trend: "up" | "down") =>
    trend === "up" ? "text-green-500" : "text-red-500";

  const getChangeText = (trend: "up" | "down") =>
    trend === "up" ? "Up from yesterday" : "Down from yesterday";

  const data: CardData[] = dashboardData
    ? [
        {
          label: "Active Clients",
          value: dashboardData.activeClients.count.toLocaleString(),
          icon: "/assets/dashboard/active-clients.svg",
          iconBgColor: "bg-[#FFEFFC]",
          change: dashboardData.activeClients.change,
          changePercent: `${dashboardData.activeClients.change}%`,
          percentColor: getColor(dashboardData.activeClients.trend),
          changeText: getChangeText(dashboardData.activeClients.trend),
          changeType: dashboardData.activeClients.trend,
          bottomIcon: "/assets/dashboard/active-percent.svg",
        },
        {
          label: "Application Started",
          value: dashboardData.applicationStarted.count.toLocaleString(),
          icon: "/assets/dashboard/application-started.svg",
          iconBgColor: "bg-[#EBF2FF]",
          change: dashboardData.applicationStarted.change,
          changePercent: `${dashboardData.applicationStarted.change}%`,
          percentColor: getColor(dashboardData.applicationStarted.trend),
          changeText: getChangeText(dashboardData.applicationStarted.trend),
          changeType: dashboardData.applicationStarted.trend,
          bottomIcon: "/assets/dashboard/application-started-percent.svg",
        },
        {
          label: "Application Completed",
          value: dashboardData.applicationCompleted.count.toLocaleString(),
          icon: "/assets/dashboard/application-completed.svg",
          iconBgColor: "bg-[#E3F9E5]",
          change: dashboardData.applicationCompleted.change,
          changePercent: `${dashboardData.applicationCompleted.change}%`,
          percentColor: getColor(dashboardData.applicationCompleted.trend),
          changeText: getChangeText(dashboardData.applicationCompleted.trend),
          changeType: dashboardData.applicationCompleted.trend,
          bottomIcon: "/assets/dashboard/application-complete-percent.svg",
        },
        {
          label: "Application Pending",
          value: dashboardData.applicationPending.count.toLocaleString(),
          icon: "/assets/dashboard/application-pending.svg",
          iconBgColor: "bg-[#FFF6EB]",
          change: dashboardData.applicationPending.change,
          changePercent: `${dashboardData.applicationPending.change}%`,
          percentColor: getColor(dashboardData.applicationPending.trend),
          changeText: getChangeText(dashboardData.applicationPending.trend),
          changeType: dashboardData.applicationPending.trend,
          bottomIcon: "/assets/dashboard/application-pending-percent.svg",
        },
      ]
    : [];

  const chartData = [
    { month: "Jan", applications: 120, completed: 80, pending: 40 },
    { month: "Feb", applications: 150, completed: 100, pending: 50 },
    { month: "Mar", applications: 180, completed: 120, pending: 60 },
    { month: "Apr", applications: 200, completed: 140, pending: 60 },
    { month: "May", applications: 160, completed: 110, pending: 50 },
    { month: "Jun", applications: 190, completed: 130, pending: 60 },
    { month: "Jul", applications: 220, completed: 150, pending: 70 },
    { month: "Aug", applications: 180, completed: 120, pending: 60 },
    { month: "Sep", applications: 210, completed: 140, pending: 70 },
    { month: "Oct", applications: 240, completed: 160, pending: 80 },
    { month: "Nov", applications: 200, completed: 130, pending: 70 },
    { month: "Dec", applications: 230, completed: 150, pending: 80 },
  ];

  const { data: tableData = [], isLoading: isTableLoading } = useClientStatusTable({
  page: 1,
  limit: 10,
});

  return (
    <>
      {isLoading ? (
        <Loader text="Loading dashboard..."/>
      ) : (
        <>
          <StatsCard data={data} />
          <AnalyticsChart chartData={chartData} />
          <DataTable tableData={tableData} />
        </>
      )}
    </>
  );
}

export default Dashboard;
