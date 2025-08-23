"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { ClientDocuments } from "./client-document";
import { ClientApplicationStatus } from "./client-application-status";
import { ClientPersonalInfo } from "./client-personal-information";
import { ClientApplicationOverview } from "./client-application-overview";
import { ModernDashboardCards } from "./stats";
import { useGetClientDashboardData } from "@/api/dashboard";
import Link from "next/link";

interface ClientDashboardContentProps {
  user: any;
}

export function ClientDashboardContent({ user }: ClientDashboardContentProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [applicationData, setApplicationData] = useState<any>(null);

  const { data, isLoading } = useGetClientDashboardData();
  console.log("data", data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const applicationStatsData = data?.stats;
  const applicationOverviewData = data?.overview;

  const applicationFormData = data?.applicationData;
  const applicationDocuments = data?.documents;
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {Array.isArray(data?.applicationData) &&
      data.applicationData.length > 0 ? (
        <>
          <ModernDashboardCards applicationData={applicationStatsData} />
          <Card className="bg-white shadow-lg border ">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Application Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="status">Status & History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <ClientApplicationOverview
                    statsData={applicationStatsData}
                    applicationData={applicationOverviewData}
                  />
                </TabsContent>

                <TabsContent value="personal-info" className="mt-6">
                  <ClientPersonalInfo
                    personalInfo={applicationFormData}
                    onUpdate={(updatedInfo) => {
                      setApplicationData((prev: any) => ({
                        ...prev,
                        personalInfo: updatedInfo,
                      }));
                    }}
                  />
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <ClientDocuments
                    documents={applicationDocuments || []}
                    onDocumentUpdate={(updatedDocuments) => {
                      setApplicationData((prev: any) => ({
                        ...prev,
                        documents: updatedDocuments,
                      }));
                    }}
                  />
                </TabsContent>

                <TabsContent value="status" className="mt-6">
                  <ClientApplicationStatus
                    statusHistory={applicationData?.statusHistory || []}
                    currentStatus={applicationData?.status}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Application Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              You haven&apos;t started any application yet. Start your journey
              by creating a new application.
            </p>
          </div>
          <Link
            href="/client/dashboard/files"
            className="px-6 py-3 bg-blue-primary cursor-pointer text-white rounded-lg hover:bg-blue-8 00 transition-colors duration-200 font-medium"
          >
            Start New Application
          </Link>
        </div>
      )}
    </div>
  );
}
