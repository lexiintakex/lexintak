"use client";

import Banner from "@/components/Banner";
import ToastAlert from "@/components/ui/toast-alerts";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { ClientDashboardContent } from "./applications-dashboard/client-dashboard-content";

function Dashboard() {
  const [visible, setVisible] = useState(true);
  const { user } = useAuth();
  const type = user?.form_type;

  return (
    <div>
      <Banner
        buttonPath={
          type ? "/client/dashboard/files" : "/client/dashboard/select-visa"
        }
        appName="Lexintake"
        name={user?.full_name || "Client"}
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

      {/* Enhanced Client Dashboard Content */}
      <ClientDashboardContent user={user} />
    </div>
  );
}

export default Dashboard;
