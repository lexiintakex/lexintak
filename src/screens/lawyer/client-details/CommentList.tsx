import { useState } from "react";
import { MessageCircle, Edit, Trash2, Check, X } from "lucide-react";
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
}

interface Props {
  type: "documents" | "personal_information";
  userId: string;
}

export default function CommentsList({ type, userId }: Props) {
  const { user } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null); // track comment to delete
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
      toast.warn;
      ("Comment cannot be empty.");
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
          setDeleteTarget(null); // close modal
        },
      }
    );
  };

  return (
    <div className="mt-6 space-y-4">
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
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-blue-500" />
        Notes History
      </h3>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments found.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment: any) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {comment.profile_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={comment.profile_image}
                      alt={comment.username}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 flex items-center justify-center font-semibold">
                      {comment.username?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {comment.username}
                    </p>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        comment.role === "admin"
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-green-50 text-green-600 border border-green-200"
                      )}
                    >
                      {comment.role}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {editingId === comment.id ? (
                <div className="mt-3 space-y-2">
                  <TiptapEditor value={editValue} onChange={setEditValue} />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      onClick={handleSave}
                      className="px-[20px] flex flex-row cursor-pointer text-base font-medium items-center gap-x-[10px] py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
                    >
                      <Check size={16} /> Save
                    </button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <X size={16} /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: comment.comment }}
                  className="mt-3 text-sm text-gray-700 leading-relaxed"
                />
              )}

              {/* Actions */}
              {editingId !== comment.id && (
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(comment)}
                    className="text-blue-500 cursor-pointer  hover:text-blue-700 flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-500 cursor-pointer  hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
