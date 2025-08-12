"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { ClientDocuments } from "./client-document";
import { ClientApplicationStatus } from "./client-application-status";
import { ClientPersonalInfo } from "./client-personal-information";
import { ClientApplicationOverview } from "./client-application-overview";
import { Badge } from "@/components/ui/badge";
import { ModernDashboardCards } from "./stats";
import { useGetClientDashboardData } from "@/api/dashboard";

interface ClientDashboardContentProps {
  user: any;
}

export function ClientDashboardContent({ user }: ClientDashboardContentProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [applicationData, setApplicationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading } = useGetClientDashboardData();
  console.log("data", data);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const mockData = {
          documents: [
            {
              id: 1,
              name: "Passport Copy",
              type: "passport",
              status: "approved",
              uploadDate: "2024-01-15",
            },
            {
              id: 2,
              name: "Birth Certificate",
              type: "birth_certificate",
              status: "pending",
              uploadDate: "2024-01-16",
            },
            {
              id: 3,
              name: "Employment Letter",
              type: "employment",
              status: "rejected",
              uploadDate: "2024-01-17",
            },
          ],
          personalInfo: {
            fullName: user?.full_name || "John Doe",
            email: user?.email || "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            dateOfBirth: "1990-05-15",
            nationality: "American",
            passportNumber: "US123456789",
          },
          statusHistory: [
            {
              date: "2024-01-20",
              status: "Under Review",
              description:
                "Application is being reviewed by immigration officer",
            },
            {
              date: "2024-01-18",
              status: "Documents Received",
              description: "All required documents have been received",
            },
            {
              date: "2024-01-15",
              status: "Application Submitted",
              description: "Initial application submitted successfully",
            },
          ],
        };
        setApplicationData(mockData);
      } catch (error) {
        console.error("Error fetching application data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [user]);

  if (loading) {
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
    </div>
  );
}
