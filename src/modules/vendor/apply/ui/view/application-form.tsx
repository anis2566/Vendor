"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LoadingButton } from "@/components/loading-button";

import { StoreSchema, StoreSchemaType } from "@/schema/store";
import { UploadButton } from "@/lib/uploadthing";
import { STORE_STATUS } from "@/constant";
import { useTRPC } from "@/trpc/client";

interface Props {
  userId: string;
}

export const ApplicationForm = ({ userId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();

  const { mutate: createStore, isPending } = useMutation(
    trpc.store.create.mutationOptions({
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          router.refresh();
        } else {
          toast.error(data.message);
        }
      },
    })
  );

  const form = useForm<StoreSchemaType>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
      phone: "",
      description: "",
      address: "",
      image: "",
      userId,
      status: STORE_STATUS.PENDING,
    },
  });

  const onSubmit = (data: StoreSchemaType) => {
    createStore(data);
  };

  return (
    <div className="bg-background rounded-lg shadow-md border p-4 rounded-md overflow-hidden space-y-6">
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl text-white font-semibold">Store Information</h2>
        <p className="text-blue-100 text-sm">
          Fill in the details below to apply
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-x-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter store name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter store phone"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter store description"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter store address"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                {form.watch("image") ? (
                  <div className="relative">
                    <Avatar className="size-12">
                      <AvatarImage src={form.getValues("image")} />
                    </Avatar>
                    <Button
                      type="button"
                      onClick={() => form.setValue("image", "")}
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      disabled={isPending}
                    >
                      <Trash2 className="w-5 h-5 text-rose-500" />
                    </Button>
                  </div>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    disabled={isPending}
                    onClientUploadComplete={(res) => {
                      field.onChange(res[0].ufsUrl);
                      toast.success("Image uploaded");
                    }}
                    onUploadError={() => {
                      toast.error("Image upload failed");
                    }}
                    appearance={{
                      button: {
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        border: "none",
                        transition: "background-color 0.3s",
                        width: "150px",
                        margin: "0 auto",
                      },
                      container: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    }}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            title="Submit"
            loadingTitle="Submitting..."
            isLoading={isPending}
            icon={Send}
          />
        </form>
      </Form>
    </div>
  );
};
