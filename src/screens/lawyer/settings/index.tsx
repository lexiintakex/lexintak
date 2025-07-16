"use client";
import React from "react";
import LaywerDataTable from "./DataTable";
import { generateMockLawyerData } from "./generateLawyerMockData";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function LawyerSettings() {
  const { push } = useRouter();
  const tableData = React.useMemo(() => generateMockLawyerData(15), []);
  return (
    <>
      <div className="flex justify-between w-full flex-row">
        <h2 className="text-2xl font-semibold text-gray-primary mb-[20px] mt-[20px]">
          Settings
        </h2>
        <div className="md:col-span-2 flex justify-start mt-4">
          <button
            onClick={() => push("/lawyer/add-lawyer")}
            className="inline-flex items-center mb-[20px]  px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus />
            Add New Lawyer
          </button>
        </div>
      </div>
      <LaywerDataTable tableData={tableData} />
    </>
  );
}

export default LawyerSettings;
