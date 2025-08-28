"use client";

import { useState } from "react";
import {
  MessageCircle,
  Edit,
  Trash2,
  Check,
  X,
  Scale,
  User,
} from "lucide-react";
import {
  useGetComments,
  useUpdateComment,
  useDeleteComment,
} from "@/api/comments";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Modal from "@/components/ui/modal";

const TiptapEditor = dynamic(() => import("./TipEditor"), { ssr: false });

interface Comment {
  id: string;
  comment: string;
  created_by: string;
  role: string;
  created_at: string;
  canEditOrDelete: boolean;
  profile_image?: string;
  username: string;
}

interface Props {
  type: "documents" | "personal_information";
  userId: string;
}

export default function ModernCommentsList({ type, userId }: Props) {
  const { user } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const current_user_id = user?.user_id || "";
  const {
    data: comments = [],
    isLoading: loading,
    refetch,
  } = useGetComments(userId, type, current_user_id);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { mutate: updateComment } = useUpdateComment(editingId || "");
  const { mutate: deleteComment } = useDeleteComment();

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditValue(comment.comment);
  };

  const handleSave = () => {
    if (!editValue || editValue.trim() === "" || editValue === "<p></p>") {
      toast.warn("Comment cannot be empty.");
      return;
    }
    if (editingId) {
      updateComment(
        { comment: editValue },
        {
          onSuccess: () => {
            setEditingId(null);
            setEditValue("");
          },
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteComment(
      { commentId: deleteTarget },
      {
        onSuccess: () => {
          refetch();
          setDeleteTarget(null);
        },
      }
    );
  };

  const isLawyer = (role: string) => role === "lawyer";

  return (
    <div className="mt-8 space-y-6">
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        confirmText="Delete"
        title="Delete Comment"
      >
        <p className="text-gray-700">
          Are you sure you want to delete this comment?
        </p>
      </Modal>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 shadow-sm">
        <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
          <div className="p-2 bg-blue-primary rounded-xl shadow-sm">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          Case Discussion
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Secure communication between lawyer and client
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-primary"></div>
          <p className="ml-3 text-gray-600">Loading discussion...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No discussion yet</p>
          <p className="text-sm text-gray-400">
            Start the conversation with your first note
          </p>
        </div>
      ) : (
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
          {comments.map((comment: Comment) => {
            const lawyer = isLawyer(comment.role);

            return (
              <div
                key={comment.id}
                className={cn(
                  "flex gap-4 group transition-all duration-200",
                  lawyer ? "justify-start" : "justify-end"
                )}
              >
                {lawyer && (
                  <div className="flex-shrink-0">
                    {comment.profile_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={comment.profile_image || "/placeholder.svg"}
                        alt={comment.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-primary text-white flex items-center justify-center font-bold text-lg shadow-sm hover:shadow-md transition-shadow">
                        <Scale className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl shadow-sm transition-all duration-200 group-hover:shadow-md hover:scale-[1.02]",
                    lawyer
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-white border border-gray-200"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-3 border-b rounded-t-2xl",
                      lawyer
                        ? "bg-blue-primary border-blue-300 text-white"
                        : "bg-gray-100 border-gray-200 text-gray-800"
                    )}
                  >
                    <div className="flex items-center justify-between w-[300px]">
                      <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center gap-2">
                          {lawyer ? (
                            <Scale className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">
                              {comment.username}
                            </span>
                            <p
                              className={cn(
                                "text-xs",
                                lawyer ? "text-white/90" : "text-gray-600"
                              )}
                            >
                              {new Date(comment.created_at).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "text-xs px-3 py-1 rounded-full font-medium shadow-sm",
                            lawyer
                              ? "bg-white text-blue-600"
                              : "bg-gray-800 text-white"
                          )}
                        >
                          {lawyer ? "Lawyer" : "Client"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="p-4">
                    {editingId === comment.id ? (
                      comment.canEditOrDelete && (
                        <div className="space-y-3">
                          <TiptapEditor
                            value={editValue}
                            onChange={setEditValue}
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              onClick={handleSave}
                              className={cn(
                                "px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-105",
                                lawyer
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-gray-800 hover:bg-gray-900"
                              )}
                            >
                              <Check size={16} /> Save
                            </button>
                            <Button
                              onClick={() => setEditingId(null)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                              <X size={16} /> Cancel
                            </Button>
                          </div>
                        </div>
                      )
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.comment }}
                        className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                      />
                    )}

                    {/* Actions */}
                    {editingId !== comment.id && comment.canEditOrDelete && (
                      <div className="mt-4 pt-3 border-t border-gray-200 flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(comment)}
                          className={cn(
                            "text-xs cursor-pointer font-medium transition-all duration-200 flex items-center gap-1 hover:scale-105",
                            lawyer
                              ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                          )}
                        >
                          <Edit size={14} /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-500 cursor-pointer hover:text-red-700 hover:bg-red-50 text-xs font-medium flex items-center gap-1 hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 size={14} /> Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client avatar on right */}
                {!lawyer && (
                  <div className="flex-shrink-0">
                    {comment.profile_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={comment.profile_image || "/placeholder.svg"}
                        alt={comment.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-lg shadow-sm hover:shadow-md transition-shadow">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
