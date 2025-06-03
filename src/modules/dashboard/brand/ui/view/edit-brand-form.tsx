"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LoadingButton } from "@/components/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UploadButton } from "@/lib/uploadthing";
import { useTRPC } from "@/trpc/client";
import { userBrandFilter } from "../../filter/use-brand-filter";
import { CATEGORY_STATUS } from "@/constant";
import { BrandSchema, BrandSchemaType } from "@/schema/brand";

interface Props {
  id: string;
}

export const EditBrandForm = ({ id }: Props) => {
  const [filter] = userBrandFilter();

  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.brand.getOne.queryOptions({
      id,
    })
  );

  const { mutate: updateCategory, isPending } = useMutation(
    trpc.brand.updateOne.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success("Brand updated");
        queryClient.invalidateQueries(
          trpc.brand.getMany.queryOptions({
            ...filter,
          })
        );
        queryClient.invalidateQueries(trpc.brand.getOne.queryOptions({ id }));
        router.push("/dashboard/brand");
      },
    })
  );

  const form = useForm<BrandSchemaType>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      image: data?.image || "",
      status: (data?.status as CATEGORY_STATUS) || "Active",
    },
  });

  const onSubmit = (data: BrandSchemaType) => {
    updateCategory({
      id,
      ...data,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Brand</CardTitle>
        <CardDescription>Update brand</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter brand description"
                      {...field}
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
                      >
                        <Trash2 className="w-5 h-5 text-rose-500" />
                      </Button>
                    </div>
                  ) : (
                    <UploadButton
                      endpoint="imageUploader"
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

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CATEGORY_STATUS).map((v, i) => (
                        <SelectItem value={v} key={i}>
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
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              title="Update"
              loadingTitle="Updating..."
              isLoading={isPending}
              icon={Save}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
