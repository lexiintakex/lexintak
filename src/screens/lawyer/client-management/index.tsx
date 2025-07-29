"use client";

import React from "react";
import DataTable from "../dashboard/DataTable";
import { generateMockClientData } from "./generateMockClientData";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClientStatusTable } from "@/api/auth";

function ClientManagement() {
  // const tableData = React.useMemo(() => generateMockClientData(15), []);
  const { push } = useRouter();

  const { data: tableData = [], isLoading: isTableLoading } = useClientStatusTable({
    page: 1,
    limit: 10,
  });

  return (
    <>
      <div className="flex justify-between w-full flex-row">
        <h2 className="text-2xl font-semibold text-gray-primary mb-[20px] mt-[20px]">
          Client Management
        </h2>
        <div className="md:col-span-2 flex justify-start mt-4">
          <button
            onClick={() => push("/lawyer/add-client")}
            className="inline-flex items-center mb-[20px]  px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus />
            Add New Client
          </button>
        </div>
      </div>
      <DataTable tableData={tableData} />
    </>
  );
}

export default ClientManagement;
