"use client";

import Banner from "@/components/Banner";
import ToastAlert from "@/components/ui/toast-alerts";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";

function Dashboard() {
  const [visible, setVisible] = useState(true);
  const { user } = useAuth();
  console.log("🚀 ~ Dashboard ~ user:", user);
  const type = user?.form_type;
  return (
    <div>
      <Banner
        buttonPath={
          type
            ? "/client/dashboard/select-bot"
            : "/client/dashboard/select-visa"
        }
        appName="Lexintake"
        name="Steve"
        isButton={true}
      />
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
