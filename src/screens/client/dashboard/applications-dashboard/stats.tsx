import { FileText, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ApplicationData {
  status: string;
  progress: number;
  totalDocuments?: number;
  totalResponses?: number;
}

interface ModernDashboardCardsProps {
  applicationData: ApplicationData | undefined;
}

export function ModernDashboardCards({
  applicationData,
}: ModernDashboardCardsProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "in review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Status Card */}
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />
        <CardContent className="relative p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-orange-200 to-transparent" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-3">Status</p>
              <Badge
                className={`${getStatusColor(
                  applicationData?.status as string
                )} font-medium px-3 py-1 text-xs`}
              >
                {applicationData?.status || "Unknown"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5" />
        <CardContent className="relative p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-emerald-200 to-transparent" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-2">
                Progress
              </p>
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-slate-900">
                  {applicationData?.progress || 0}%
                </p>
              </div>
              <div className="mt-3">
                <Progress
                  value={applicationData?.progress || 0}
                  className="h-2 bg-slate-200"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Card */}
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5" />
        <CardContent className="relative p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-purple-200 to-transparent" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Documents
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-slate-900">
                  {applicationData?.totalDocuments || 0}
                </p>
                <p className="text-sm text-slate-500">uploaded</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
