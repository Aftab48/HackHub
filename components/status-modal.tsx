"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newStatus: EventStatus) => void;
  currentStatus: EventStatus;
}

export function StatusModal({
  isOpen,
  onClose,
  onSave,
  currentStatus,
}: StatusModalProps) {
  const [status, setStatus] = useState(currentStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Event Status</DialogTitle>
        </DialogHeader>

        <Select value={status} onValueChange={(val) => setStatus(val as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="draft">
              Draft
            </SelectItem>
            <SelectItem className="cursor-pointer" value="active">
              Active
            </SelectItem>
            <SelectItem className="cursor-pointer" value="upcoming">
              Upcoming
            </SelectItem>
            <SelectItem className="cursor-pointer" value="completed">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(status)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
