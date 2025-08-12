"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useCreateComment } from "@/api/comments";
import { toast } from "react-toastify";

const TiptapEditor = dynamic(() => import("./TipEditor"), { ssr: false });

export function AddNotes({ type, id }: { type: string; id: string }) {
  const [hydrated, setHydrated] = useState(false);
  const { mutateAsync: createComment } = useCreateComment();
  const { user } = useAuth();
  const created_by = user?.user_id ?? "";
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSubmit = async () => {
    const plainText = note.replace(/<[^>]+>/g, "").trim();

    if (!plainText) {
      toast.warn("Cannot submit empty comment");
      return;
    }
    setIsSubmitting(true);
    try {
      await createComment({
        user_id: id as string,
        created_by: created_by,
        comment: note.trim(),
        type: type,
        role: user?.role,
      });

      setNote("");
    } catch (err) {
      console.error("Error while submitting comment:", err);
    } finally {
      setNote("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 border border-gray-100 shadow">
      <p className="font-semibold px-4 rounded-md bg-[#F4F9FF] py-[15px] text-xl text-gray-primary">
        Add Notes
      </p>
      <Card className="p-4">
        {hydrated ? (
          <TiptapEditor value={note} onChange={setNote} />
        ) : (
          <p className="text-muted-foreground text-sm">Loading editor...</p>
        )}
      </Card>
      <div className="px-[20px] mb-[10px]">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-[25px] rounded-md py-[10px] bg-blue-primary font-medium text-base text-[#fff] cursor-pointer hover:bg-transparent hover:text-blue-primary border border-blue-primary transition-colors hover:border-blue-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Add"}
        </button>
      </div>
    </div>
  );
}
