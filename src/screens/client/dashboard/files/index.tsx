"use client";
import React, { useState } from "react";
import UploadDocuments from "./UploadFile";
import Banner from "@/components/Banner";
import ToastAlert from "@/components/ui/toast-alerts";

function ClientFileUpload() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {/* <Banner appName="Lexintake" name="Steve" /> */}
      <div className="mt-[20px]">
        {visible && (
          <ToastAlert
            message="Upload your Passport, Green Card, Marriage Certificates etc."
            variant="info"
            onClose={() => setVisible(false)}
          />
        )}
      </div>
      <UploadDocuments />
    </>
  );
}

export default ClientFileUpload;
