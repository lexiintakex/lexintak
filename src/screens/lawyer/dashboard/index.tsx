import React from "react";
import { CardData, TableData } from "@/types/dashboard";
import StatsCard from "./Stats";
import AnalyticsChart from "./ActivityChart";
import DataTable from "./DataTable";

function Dashboard() {
  const data: CardData[] = [
    {
      label: "Active Clients",
      value: "5,452",
      icon: "/assets/dashboard/active-clients.svg",
      iconBgColor: "bg-[#FFEFFC]",
      change: 8.3,
      changePercent: "8.3%",
      percentColor: "text-[#DF0DB8]",
      changeText: "Up from yesterday",
      changeType: "up",
      bottomIcon: "/assets/dashboard/active-percent.svg",
    },
    {
      label: "Application Started",
      value: "2,512",
      icon: "/assets/dashboard/application-started.svg",
      iconBgColor: "bg-[#EBF2FF]",
      change: 6.5,
      changeText: "Up from yesterday",
      changeType: "up",
      changePercent: "6.5%",
      percentColor: "text-[#0E42DD]",
      bottomIcon: "/assets/dashboard/application-started-percent.svg",
    },
    {
      label: "Application Completed",
      value: "1,058",
      icon: "/assets/dashboard/application-completed.svg",
      iconBgColor: "bg-[#E3F9E5]",
      change: 3.2,
      changeText: "Up from yesterday",
      changeType: "up",
      changePercent: "3.2%",
      percentColor: "text-[#0FC254]",
      bottomIcon: "/assets/dashboard/application-complete-percent.svg",
    },
    {
      label: "Application Pending",
      value: "289",
      icon: "/assets/dashboard/application-pending.svg",
      iconBgColor: "bg-[#FFF6EB]",
      change: -4.5,
      changeText: "Down from yesterday",
      changePercent: "4.5%",
      percentColor: "text-[#EA860B]",
      changeType: "down",
      bottomIcon: "/assets/dashboard/application-pending-percent.svg",
    },
  ];
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

  const tableData: TableData[] = [
    {
      clientName: "Alana Williams",
      initiateDate: "08/12/2024",
      status: "Active",
      caseType: "Will Prep",
      assignedAttorney: "Michael White",
      lastActivity: "Updated 3:00",
    },
    {
      clientName: "Theresa Mills",
      initiateDate: "11/08/2024",
      status: "Active",
      caseType: "Will Prep",
      assignedAttorney: "Michael White",
      lastActivity: "Admin Passport",
    },
    {
      clientName: "Tom Wilson",
      initiateDate: "24/08/2024",
      status: "Active",
      caseType: "Will Prep",
      assignedAttorney: "Michael White",
      lastActivity: "Admin Message Sent",
    },
    {
      clientName: "Sarah Johnson",
      initiateDate: "15/07/2024",
      status: "Pending",
      caseType: "Estate Planning",
      assignedAttorney: "Jennifer Davis",
      lastActivity: "Updated 2:30",
    },
    {
      clientName: "Robert Brown",
      initiateDate: "03/09/2024",
      status: "Completed",
      caseType: "Trust Setup",
      assignedAttorney: "David Miller",
      lastActivity: "Completed 1:45",
    },
  ];

  return (
    <>
      <StatsCard data={data} />
      <AnalyticsChart chartData={chartData} />
      <DataTable tableData={tableData} />
    </>
  );
}

export default Dashboard;
