"use client";

import React, { useState, useMemo } from "react";
import { Plus, Database, Link as LinkIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import LaywerDataTable from "./DataTable";
import { generateMockLawyerData } from "./generateLawyerMockData";
import { useGetLawyers } from "@/api/lawyer";

type CrmOption = "mycase" | "clio" | null;

export default function LawyerSettings() {
  const { push } = useRouter();
  const { data: lawyers, isLoading, refetch } = useGetLawyers(1, 10, "");

  const [selectedCrm, setSelectedCrm] = useState<CrmOption>(null);
  const [apiKey, setApiKey] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  const syncCrm = async () => {
    if (!apiKey.trim()) return;
    setSyncing(true);
    setSyncMsg(null);
    try {
      // TODO: call your backend API:
      // await axiosInstance.post("/integrations/sync", { crm: selectedCrm, apiKey });
      await new Promise((r) => setTimeout(r, 1500)); // demo delay
      setSyncMsg("✅ Data synced successfully!");
    } catch (err) {
      console.log("🚀 ~ syncCrm ~ err:", err);
      setSyncMsg("❌ Sync failed. Check your API key.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-primary">
          Manage Lawyers
        </h2>
        <button
          onClick={() => push("/lawyer/add-lawyer")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white bg-blue-primary hover:bg-blue-800 shadow"
        >
          <Plus className="w-4 h-4" />
          Add New Lawyer
        </button>
      </div>

      <div className="mb-10 bg-white border border-blue-primary rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Integrate your CRM
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              id: "mycase",
              label: "MyCase",
              desc: "Connect your MyCase account",
            },
            {
              id: "clio",
              label: "Clio",
              desc: "Connect your Clio Grow/Manage",
            },
          ].map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                setSelectedCrm(opt.id as CrmOption);
                setSyncMsg(null);
              }}
              className={`cursor-pointer rounded-md border p-4 flex gap-3 items-center transition ${
                selectedCrm === opt.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <Database className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium">{opt.label}</p>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedCrm && (
          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium">
              {selectedCrm === "mycase" ? "MyCase" : "Clio"} API Key
            </label>
            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter secret API key"
              className="w-full p-3 border border-blue-primary outline-none rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={syncCrm}
              disabled={syncing || !apiKey.trim()}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-blue-primary hover:bg-blue-800 text-white disabled:bg-blue-200"
            >
              {syncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
              {syncing ? "Syncing…" : "Sync Data"}
            </button>

            {syncMsg && <p className="text-sm mt-2">{syncMsg}</p>}
          </div>
        )}
      </div>

      <LaywerDataTable tableData={lawyers ?? []} refetch={refetch} />
    </>
  );
}
