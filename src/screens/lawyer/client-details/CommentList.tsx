"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";

interface Comment {
  id: string;
  comment: string;
  created_by: string;
  role: string;
  created_at: string;
}

interface Props {
  type: "documents" | "personal_information";
}

export default function CommentsList({ type }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/comments", {
          params: { user_id: userId, type },
        });
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && type) {
      fetchComments();
    }
  }, [userId, type]);

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-1">
        <MessageCircle className="h-5 w-5" />
        Notes History
      </h3>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments found.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border border-gray-200 rounded-md p-3 bg-[#F9FAFB]"
            >
              <p className="text-sm text-gray-800">{comment.comment}</p>
              <p className="text-xs text-gray-500 mt-1">
                {comment.role} • {new Date(comment.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
