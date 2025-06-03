"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useConfirm } from "@/hooks/use-confirm";
import { LoadingButton } from "./loading-button";

interface ConfirmModalProps {
  id: string;
  isPending: boolean;
  onDelete: (id: string) => void;
}

export const ConfirmModal = ({
  id,
  isPending,
  onDelete,
}: ConfirmModalProps) => {
  const isOpen = useConfirm((state) => state.isModalOpen(id));
  const modal = useConfirm((state) => state.getModalData(id));
  const confirm = useConfirm((state) => state.confirmModal);
  const cancel = useConfirm((state) => state.cancelModal);

  if (!isOpen || !modal) return null;

  const handleConfirm = () => {
    if (!modal.data) return;
    onDelete(modal.data.id);
    confirm(id);
  };

  return (
    <AlertDialog
      open={isOpen && !isPending}
      onOpenChange={() => (isPending ? () => {} : cancel(id))}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            type="submit"
            onClick={handleConfirm}
            title="Delete"
            loadingTitle="Deleting..."
            isLoading={isPending}
            variant="destructive"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
