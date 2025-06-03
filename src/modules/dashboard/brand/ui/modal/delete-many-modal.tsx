"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoadingButton } from "@/components/loading-button";

import { useDeleteManyBrand } from "@/hooks/use-brand";
import { useTRPC } from "@/trpc/client";
import { userBrandFilter } from "../../filter/use-brand-filter";

export const DeleteManyBrandsModal = () => {
  const { isOpen, ids, onClose } = useDeleteManyBrand();
  const [filter] = userBrandFilter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    trpc.brand.deleteMany.mutationOptions({
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success("Brands deleted");
        queryClient.invalidateQueries(
          trpc.brand.getMany.queryOptions({
            ...filter,
          })
        );
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleDelete = () => {
    mutate({ ids });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            brands and remove your data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <LoadingButton
            isLoading={isPending}
            title="Delete"
            loadingTitle="Deleting..."
            onClick={handleDelete}
            variant="destructive"
            type="button"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
