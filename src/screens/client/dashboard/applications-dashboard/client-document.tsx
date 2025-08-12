"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Upload,
  Eye,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AddNotes } from "@/screens/lawyer/client-details/add-notes";
import ModernCommentsList from "@/screens/lawyer/client-details/CommentList";
import useAuth from "@/hooks/useAuth";

interface DocumentsProps {
  documents: any[];
  onDocumentUpdate: (updatedDocuments: any[]) => void;
}

export function ClientDocuments({
  documents,
  onDocumentUpdate,
}: DocumentsProps) {
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { user } = useAuth();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileId = Date.now() + Math.random();
      setUploadingFiles((prev) => [...prev, file.name]);

      // Simulate upload process
      setTimeout(() => {
        const newDocument = {
          id: fileId,
          name: file.name,
          type: file.type,
          status: "pending",
          uploadDate: new Date().toISOString().split("T")[0],
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        };

        onDocumentUpdate([...documents, newDocument]);
        setUploadingFiles((prev) => prev.filter((name) => name !== file.name));
      }, 2000);
    });
  };

  const handleDeleteDocument = (documentId: number) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== documentId);
    onDocumentUpdate(updatedDocuments);
  };

  const handleViewDocument = (document: any) => {
    window.open(document?.filePath, "_blank");
  };

  const handleDownloadDocument = (document: any) => {
    console.log("Downloading:", document.name);
  };

  const transformedDocuments = documents.flatMap((doc, docIndex) =>
    doc.file_paths.map((file: any, fileIndex: any) => ({
      id: `${docIndex}-${fileIndex}`,
      name: file.file_type.replace("_", " "),
      type: file.file_type,
      status: "pending",
      uploadDate: new Date(doc.created_at).toLocaleDateString(),
      size: null,
      filePath: file.file_path,
    }))
  );

  return (
    <div className="space-y-1">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Document Upload</span>
            </CardTitle>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              size="sm"
              className="bg-blue-primary text-white cursor-pointer border border-blue-primary hover:bg-transparent hover:text-blue-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>
        </CardHeader>
        {showUploadForm && (
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Upload Documents</p>
              <p className="text-gray-600 mb-4">
                Drag and drop files here, or click to select files
              </p>
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
              </p>
            </div>

            {uploadingFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-medium">Uploading files:</p>
                {uploadingFiles.map((fileName, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">{fileName}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>My Documents ({documents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No documents uploaded yet</p>
              <p className="text-sm text-gray-500">
                Upload your first document to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transformedDocuments?.map((document) => (
                <div key={document.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{document.name}</h4>
                        <p className="text-sm text-gray-600">
                          Uploaded: {document.uploadDate}
                          {document.size && ` • ${document.size}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* <div className="flex items-center space-x-1">
                        {getStatusIcon(document.status)}
                        <Badge className={getStatusColor(document.status)}>
                          {document.status}
                        </Badge>
                      </div> */}

                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDocument(document)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(document)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDocument(document.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {document.status === "rejected" && (
                    <Alert className="mt-3 border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        Document rejected: Please upload a clearer version or
                        contact support for assistance.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <span>Document Requirements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                All documents must be in PDF, DOC, or image format
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                Maximum file size: 10MB per document
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                Documents should be clear and legible
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                Ensure all information is visible and not cut off
              </span>
            </div>
          </div>
        </CardContent>
        <AddNotes type="documents" id={user?.user_id as string} />
        <ModernCommentsList userId={user?.user_id as string} type="documents" />
      </Card>
    </div>
  );
}
