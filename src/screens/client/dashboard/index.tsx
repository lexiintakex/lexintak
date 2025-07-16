"use client";
import Banner from "@/components/Banner";
import ToastAlert from "@/components/ui/toast-alerts";
import React, { useState } from "react";

function Dashboard() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <Banner appName="Lexintake" name="Steve" isButton={true} />
      <div className="mt-[20px]">
        {visible && (
          <ToastAlert
            message="Your application is approved. Please see the details."
            variant="success"
            onClose={() => setVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
