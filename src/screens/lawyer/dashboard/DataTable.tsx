"use client";

import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { TableData } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Checkbox from "@radix-ui/react-checkbox";
import Image from "next/image";
import ExportDropdown from "@/components/ui/ExportDropDown";
import { useRouter } from "next/navigation";
import FiltersModal from "../client-management/Filters";

function StatusBadge({ status }: { status: TableData["status"] }) {
  const colors = {
    Active: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
  } as const;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default function DataTable({ tableData }: { tableData: TableData[] }) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const { push } = useRouter();
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const pageData = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return tableData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, tableData]);

  React.useEffect(() => setPage(1), [rowsPerPage]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-full sm:w-64 h-11 bg-white border border-gray-200 focus:outline-none text-sm placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="/assets/dashboard/filters.svg"
              alt="Filters"
              width={40}
              height={40}
              className="w-10 h-10 cursor-pointer"
              onClick={() => setIsFilterOpen(true)}
            />
            <ExportDropdown />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-gray-header">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox.Root className="h-4 w-4 rounded border border-gray-300 bg-white flex items-center justify-center">
                  <Checkbox.Indicator className="text-blue-600">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </th>
              {[
                "Client Name",
                "Initiate Date",
                "Status",
                "Case Type",
                "Assigned Attorney",
                "Last Activity",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {pageData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Checkbox.Root className="h-4 w-4 rounded border border-gray-300 bg-white flex items-center justify-center">
                    <Checkbox.Indicator className="text-blue-600">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {row.clientName}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {row.initiateDate}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {row.caseType}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {row.assignedAttorney}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {row.lastActivity}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 cursor-pointer hover:bg-blue-100"
                      onClick={() => push(`/lawyer/client-details/${row.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 cursor-pointer hover:bg-green-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 cursor-pointer hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-header px-4 py-3 border-t border-gray-200">
        <span className="text-sm text-gray-700">
          Total&nbsp;
          <span className="font-medium">{tableData.length}</span>
          &nbsp;entries
        </span>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <span>Rows:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border cursor-pointer border-gray-300 rounded-md text-sm py-1 px-2 outline-none focus:ring-1 focus:ring-blue-600 bg-white"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-2 cursor-pointer text-gray-600 disabled:text-gray-400 hover:bg-gray-200 rounded-md"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="mx-1 text-sm">
              {page} / {totalPages || 1}
            </span>

            <button
              className="p-2 cursor-pointer  text-gray-600 disabled:text-gray-400 hover:bg-gray-200 rounded-md"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <FiltersModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
