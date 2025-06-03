"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/loading-button";

import { useTRPC } from "@/trpc/client";
import { useChangeStoreStatus } from "@/hooks/use-store";
import { STORE_STATUS } from "@/constant";
import { userStoreApplicationFilter } from "../../filter/use-store-filter";

const StatusSchema = z.object({
  status: z
    .nativeEnum(STORE_STATUS)
    .refine((data) => Object.values(STORE_STATUS).includes(data), {
      message: "required",
    }),
});

export type StatusSchemaType = z.infer<typeof StatusSchema>;

export const ChangeStoreStatusModal = () => {
  const { isOpen, storeId, status, onClose } = useChangeStoreStatus();
  const [filter] = userStoreApplicationFilter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  useEffect(() => {
    form.setValue("status", status as STORE_STATUS);
  }, []);

  const { mutate: updateStore, isPending } = useMutation(
    trpc.store.changeStatus.mutationOptions({
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success("Store updated");
        queryClient.invalidateQueries(
          trpc.store.applications.queryOptions({
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

  const form = useForm<StatusSchemaType>({
    resolver: zodResolver(StatusSchema),
    defaultValues: {
      status: status as STORE_STATUS,
    },
  });

  const onSubmit = (data: StatusSchemaType) => {
    if (data.status === STORE_STATUS.PENDING) {
      onClose();
      return;
    }
    updateStore({ id: storeId, status: data.status });
  };

  console.log(form.getValues("status"));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Store Status</DialogTitle>
          <DialogDescription>Change store status</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(STORE_STATUS).map((v, i) => (
                        <SelectItem
                          value={v}
                          key={i}
                          disabled={v === status || v === STORE_STATUS.PENDING}
                        >
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={isPending}
              title="Update"
              loadingTitle="Updating..."
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
