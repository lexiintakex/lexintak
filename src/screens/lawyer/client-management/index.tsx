"use client";

import React from "react";
import DataTable from "../dashboard/DataTable";
import { generateMockClientData } from "./generateMockClientData";

function ClientManagement() {
  const tableData = React.useMemo(() => generateMockClientData(15), []);

  return <DataTable tableData={tableData} />;
}

export default ClientManagement;
