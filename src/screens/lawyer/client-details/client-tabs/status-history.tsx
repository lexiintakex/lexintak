"use client";

import { useState } from "react";
import {
  useGetApplicationStatus,
  useCreateApplicationStatus,
  useUpdateApplicationStatus,
  type ApplicationStatus,
  useDeleteApplicationStatus,
} from "@/api/application-status";
import { Circle, Edit, Plus, Trash2 } from "lucide-react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { StatusModal } from "../status-modal";
import { useQueryClient } from "@tanstack/react-query";

export function StatusHistoryTab({ user_id }: { user_id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<ApplicationStatus | null>(
    null
  );

  const queryClient = useQueryClient();
  const { data: statusHistory, isLoading } = useGetApplicationStatus(user_id);
  console.log("statusHistory", statusHistory);
  const { mutateAsync: createMutation, isPending: isCreatePending } =
    useCreateApplicationStatus();
  const { mutateAsync: updateMutation, isPending: isUpdatePending } =
    useUpdateApplicationStatus();
  const { mutateAsync: deleteMutation, isPending: isDeletePending } =
    useDeleteApplicationStatus();

  if (isLoading) return <Loader text="Loading status history..." />;

  const handleAddStatus = () => {
    setEditingStatus(null);
    setIsModalOpen(true);
  };

  const handleEditStatus = (status: ApplicationStatus) => {
    setEditingStatus(status);
    setIsModalOpen(true);
  };

  const handleDeleteStatus = async (status: ApplicationStatus) => {
    console.log("status", status);
    if (status?.id) {
      try {
        await deleteMutation(status?.id || "");
        queryClient.invalidateQueries({
          queryKey: ["applicationStatus", user_id],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (status: string, message: string) => {
    try {
      if (editingStatus) {
        await updateMutation({
          id: editingStatus.id,
          status,
          message,
        } as any);
      } else {
        await createMutation({
          user_id,
          status,
          message,
        } as any);
      }

      queryClient.invalidateQueries({
        queryKey: ["applicationStatus", user_id],
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative px-[20px] py-[50px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Status History</h3>
        <Button onClick={handleAddStatus} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Status
        </Button>
      </div>

      {statusHistory && statusHistory.length > 0 ? (
        statusHistory?.map((item: ApplicationStatus) => (
          <div
            key={item.id}
            className="relative border-l-2 border-blue-primary pl-6 space-y-6"
          >
            <div className="relative pl-4 group">
              <div className="absolute left-[-31px] top-1.5">
                <Circle className="h-3 w-3 text-blue-primary" fill="#2563eb" />
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-blue-primary">
                    {item.status}
                  </h4>
                  <p className="text-base text-gray-600 font-normal">
                    {item.message}
                  </p>
                  <p className="text-base text-gray-500 font-normal mt-[3px]">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditStatus(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteStatus(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center flex flex-col items-center justify-center text-gray-600 space-y-4">
          <p>No status history found</p>
          <Button variant="outline" onClick={handleAddStatus}>
            Add First Status
          </Button>
        </div>
      )}

      {statusHistory && statusHistory.length > 0 && (
        <Button
          onClick={handleAddStatus}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isCreatePending || isDeletePending}
        existingStatus={editingStatus}
      />
    </div>
  );
}
