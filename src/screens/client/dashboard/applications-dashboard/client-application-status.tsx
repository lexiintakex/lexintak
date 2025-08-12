"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Download,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApplicationStatusProps {
  statusHistory: any[];
  currentStatus: string;
}

export function ClientApplicationStatus({
  statusHistory,
  currentStatus,
}: ApplicationStatusProps) {
  const getStatusIcon = (status: string) => {
    if (
      status?.toLowerCase()?.includes("approved") ||
      status?.toLowerCase()?.includes("completed")
    ) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (
      status?.toLowerCase()?.includes("rejected") ||
      status?.toLowerCase()?.includes("denied")
    ) {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    } else {
      return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    if (
      status?.toLowerCase()?.includes("approved") ||
      status?.toLowerCase()?.includes("completed")
    ) {
      return "bg-green-100 text-green-800";
    } else if (
      status?.toLowerCase()?.includes("rejected") ||
      status?.toLowerCase()?.includes("denied")
    ) {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-yellow-100 text-yellow-800";
    }
  };

  const estimatedTimeline = [
    { stage: "Application Submitted", status: "completed", date: "2024-01-15" },
    { stage: "Initial Review", status: "completed", date: "2024-01-18" },
    { stage: "Document Verification", status: "current", date: "2024-01-20" },
    { stage: "Background Check", status: "pending", date: "Est. 2024-01-25" },
    { stage: "Final Decision", status: "pending", date: "Est. 2024-02-01" },
  ];

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Current Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(currentStatus)}
              <div>
                <h3 className="text-lg font-semibold">{currentStatus}</h3>
                <p className="text-gray-600">
                  Last updated: {statusHistory[0]?.date}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(currentStatus)}>
              {currentStatus}
            </Badge>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What&apos;s happening now:</strong>{" "}
              {statusHistory[0]?.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Processing Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {estimatedTimeline.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center space-x-4"
                >
                  <div
                    className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      item.status === "completed"
                        ? "bg-green-100 border-green-600"
                        : item.status === "current"
                        ? "bg-yellow-100 border-yellow-600"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : item.status === "current" ? (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${
                        item.status === "current"
                          ? "text-yellow-800"
                          : item.status === "completed"
                          ? "text-green-800"
                          : "text-gray-600"
                      }`}
                    >
                      {item.stage}
                    </h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Status History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusHistory.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-blue-800">{item.status}</h4>
                  <span className="text-sm text-gray-600">{item.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <span>What&lsquo;s Next?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Expected Next Steps:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Background verification process (3-5 business days)</li>
                <li>• Possible request for additional documentation</li>
                <li>• Final review and decision (1-2 business days)</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">
                What You Can Do:
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Keep your contact information updated</li>
                <li>
                  • Respond promptly to any requests for additional information
                </li>
                <li>• Check your email regularly for updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
