"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, CheckCircle, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ApplicationOverviewProps {
  applicationData: any;
  statsData: any;
}

export function ClientApplicationOverview({
  applicationData,
  statsData,
}: ApplicationOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-red-50 text-red-700 bforder-red-200";
      case "under review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const progressSteps = [
    { name: "Application Submitted", completed: true, current: false },
    { name: "Documents Uploaded", completed: true, current: false },
    { name: "Under Review", completed: false, current: true },
    { name: "Legal Review", completed: false, current: false },
    { name: "Decision", completed: false, current: false },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="w-full space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xl font-semibold">
                    Application Details
                  </span>
                </div>
                <Badge
                  className={`${getStatusColor(
                    applicationData?.status
                  )} border font-medium px-3 py-1`}
                >
                  {applicationData?.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      Submitted
                    </span>
                    <span className="text-slate-900">
                      {formatDate(applicationData?.submittedDate)}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      Last Updated
                    </span>
                    <span className="text-slate-900">
                      {formatDate(applicationData?.lastUpdated)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      Assigned Lawyer
                    </span>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-900">
                        {applicationData?.lawyerName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Clock className="h-5 w-5 text-cyan-600" />
                </div>
                <span className="text-xl font-semibold">
                  Application Progress
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-slate-700">
                      Overall Progress
                    </span>
                    <span className="font-bold text-blue-600">
                      {statsData?.progress}%
                    </span>
                  </div>
                  <Progress
                    value={applicationData?.progress || 65}
                    className="h-3 bg-slate-100"
                  />
                </div>

                <div className="space-y-4">
                  {applicationData?.applicationProgress?.map(
                    (step: any, index: any) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-emerald-100 text-emerald-600"
                              : step.current
                              ? "bg-blue-100 text-blue-600 ring-4 ring-blue-50"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : step.current ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              step.completed
                                ? "text-emerald-700"
                                : step.current
                                ? "text-blue-700"
                                : "text-slate-500"
                            }`}
                          >
                            {step.step}
                          </p>
                          {step.eta && (
                            <p className="text-sm text-blue-600 mt-1">
                              Currently in progress • Est. {step.eta}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
