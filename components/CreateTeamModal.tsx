"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { createTeam } from "@/lib/actions/participants.actions";
import { useAuth } from "@/lib/auth-context";

interface CreateTeamDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTeamDialog({
  open,
  onClose,
}: CreateTeamDialogProps) {
  const { user } = useAuth();
  const userId = user?.id;
  const [teamName, setTeamName] = React.useState("");
  const [eventId, setEventId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!teamName || !eventId || !userId)
      return alert("All fields are required");

    setLoading(true);
    try {
      await createTeam({ teamName, eventId, userId });
      alert("Team created successfully!");
      onClose();
      setTeamName("");
      setEventId("");
    } catch (err) {
      console.error(err);
      alert("Failed to create team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a New Team</DialogTitle>
          <DialogDescription>
            Enter your team details below to create a new team.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <Input
            placeholder="Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
