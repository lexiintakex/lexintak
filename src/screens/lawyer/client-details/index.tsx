"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PersonalInformationTab } from "./client-tabs/personal-information";
import { DocumentsTab } from "./client-tabs/document-tabs";
import { ChatTranscriptTab } from "./client-tabs/chat-transcript-tab";
import { StatusHistoryTab } from "./client-tabs/status-history";
import { ApplicationManagement } from "./application-manage";
import { ArrowRight } from "lucide-react";
import { useApplicationByUserId } from "@/api/applications";
import Loader from "@/components/ui/loader";
import PDFSummaryTab from "./client-tabs/pdf-summary";

const validTabs = [
  "personal-information",
  "documents",
  "chat-transcript",
  "status-history",
];

export default function ClientDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const { data, isLoading, isError } = useApplicationByUserId(id as string);
  const tabParam = searchParams.get("selectTab");

  const initialTab = validTabs.includes(tabParam || "")
    ? tabParam!
    : "personal-information";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Update URL query when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("selectTab", tab);
    router.replace(`${window.location.pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  if (isLoading) return <Loader text="Application Loading..." />;
  if (isError || !data) return <p>Failed to load client data.</p>;

  return (
    <div className="min-h-screen w-full p-3">
      <Card className="mx-auto w-full max-w-full">
        <CardHeader className="flex justify-between w-full flex-row  items-center">
          <CardTitle className="text-2xl text-[#1F1F1F] font-semibold">
            Client Management
          </CardTitle>
          <div>
            <button className="bg-blue-primary text-white  px-[20px] py-[10px] rounded-md cursor-pointer hover:bg-blue-800">
              Generate Complete PDF
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 w-full">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 gap-2">
              <TabsTrigger value="personal-information">
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="chat-transcript">Chat Transcript</TabsTrigger>
              <TabsTrigger value="pdf-summary">PDF Summary</TabsTrigger>
              <TabsTrigger value="status-history">Status History</TabsTrigger>
            </TabsList>

            <TabsContent value="personal-information">
              <PersonalInformationTab
                responses={data.responses}
                user={data.user}
              />
            </TabsContent>
            <TabsContent value="documents">
              <DocumentsTab
                user={data.user}
                documents={
                  data.documents?.flatMap((doc) =>
                    doc.file_paths.map((file) => ({
                      name: `${file.file_type}.pdf`,
                      size: "Unknown", // or use actual size if available
                      url: file.file_url,
                    }))
                  ) ?? []
                }
              />
            </TabsContent>
            <TabsContent value="chat-transcript">
              <ChatTranscriptTab user_id={id as string} />
            </TabsContent>
            <TabsContent value="pdf-summary">
              <PDFSummaryTab
                client_id={id as string}
                is_completed_pdf={true}
                is_completed_pdf_url={
                  data.pdf_summary.is_completed_pdf_url || ""
                }
              />
            </TabsContent>
            <TabsContent value="status-history">
              <StatusHistoryTab />
            </TabsContent>
          </Tabs>

          {["personal-information", "documents"].includes(activeTab) && (
            <div className="space-y-6">
              <ApplicationManagement />

              {activeTab === "personal-information" && (
                <div className="md:col-span-2 flex justify-start mt-4">
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Sync to CRM
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
