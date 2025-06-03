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

import { useVendorDeleteProduct } from "@/hooks/use-product";
import { useTRPC } from "@/trpc/client";
import { userProductFilter } from "@/modules/dashboard/product/filter/use-product-filter";

export const VendorDeleteProductModal = () => {
  const { isOpen, productId, onClose } = useVendorDeleteProduct();
  const [filter] = userProductFilter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    trpc.product.VendorDeleteOne.mutationOptions({
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success("Product deleted");
        queryClient.invalidateQueries(
          trpc.product.getManyVendor.queryOptions({
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
    mutate({ id: productId });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from servers.
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
