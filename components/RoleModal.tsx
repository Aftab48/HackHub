// components/RoleWarningModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RoleWarningModalProps {
  open: boolean;
  onClose: () => void;
}

export function RoleWarningModal({ open, onClose }: RoleWarningModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Access Denied</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Only organizers can create events. Please contact admin if you think
          this is a mistake.
        </p>
      </DialogContent>
    </Dialog>
  );
}
