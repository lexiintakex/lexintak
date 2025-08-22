import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, RefreshCw, AlertCircle } from "lucide-react";
import Modal from "@/components/ui/modal";
import axiosInstance from "@/lib/axios";

interface PDFSummaryTabProps {
  is_completed_pdf: boolean;
  is_completed_pdf_url: string;
  client_id: string;
}

function PDFSummaryTab({
  is_completed_pdf,
  is_completed_pdf_url,
  client_id,
}: PDFSummaryTabProps) {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post(`/pdf/generate/${client_id}`);
      console.log(response);

      setShowGenerateModal(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (is_completed_pdf_url) {
      const link = document.createElement("a");
      link.href = is_completed_pdf_url;
      link.download = `client-summary-${Date.now()}.pdf`;
      link.click();
    }
  };

  const renderPDFViewer = () => {
    if (!is_completed_pdf || !is_completed_pdf_url) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No PDF Available
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            The client&apos;s PDF summary hasn&apos;t been generated yet. Click
            the button below to create it.
          </p>
          <Button
            onClick={() => setShowGenerateModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* PDF Header */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-medium text-gray-900">Client Summary PDF</h3>
              <p className="text-sm text-gray-500">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="border-gray-300 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={() => setShowGenerateModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {pdfError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                PDF Loading Error
              </h3>
              <p className="text-gray-500 mb-4">{pdfError}</p>
              <Button onClick={() => setPdfError(null)} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <iframe
              src={`${is_completed_pdf_url}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-[600px] border-0"
              title="Client Summary PDF"
              onError={() => setPdfError("Failed to load PDF")}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">PDF Summary</h2>
        <p className="text-sm text-gray-500 mt-1">
          View and manage the client&apos;s completed PDF summary
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Client Summary Document</span>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderPDFViewer()}</CardContent>
      </Card>

      {/* Generate PDF Confirmation Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate PDF Summary"
        width="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">
                Review Required Before Generation
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Please ensure you have reviewed all client information before
                generating the PDF.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Checklist:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Personal information is complete and accurate</li>
              <li>✓ All required documents have been uploaded</li>
              <li>✓ Form responses have been reviewed</li>
              <li>✓ Client details are up to date</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowGenerateModal(false)}
              className="flex-1"
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleGeneratePDF}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PDFSummaryTab;
