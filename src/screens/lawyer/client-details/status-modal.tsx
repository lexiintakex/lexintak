"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ApplicationStatus } from "@/api/application-status";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: string, message: string) => void;
  isLoading?: boolean;
  existingStatus?: ApplicationStatus | null;
}

export function StatusModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  existingStatus = null,
}: StatusModalProps) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const isEditing = !!existingStatus;

  useEffect(() => {
    if (existingStatus) {
      setStatus(existingStatus.status);
      setMessage(existingStatus.message);
    } else {
      setStatus("");
      setMessage("");
    }
  }, [existingStatus, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status.trim() && message.trim()) {
      onSubmit(status.trim(), message.trim());
    }
  };

  const handleClose = () => {
    setStatus("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Update Status" : "Add New Status"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Enter status (e.g., In Review, Approved)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter status message or description"
              rows={3}
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !status.trim() || !message.trim()}
            >
              {isLoading ? "Saving..." : isEditing ? "Update" : "Add Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
