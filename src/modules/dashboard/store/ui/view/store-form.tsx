"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { UploadButton } from "@/lib/uploadthing";
import { useTRPC } from "@/trpc/client";
import { STORE_STATUS } from "@/constant";
import { StoreSchema, StoreSchemaType } from "@/schema/store";
import { userStoreFilter } from "../../filter/use-store-filter";

export const StoreForm = () => {
  const [search, setSearch] = useState<string>("");

  const [filter] = userStoreFilter();
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    trpc.user.forSelect.queryOptions({
      search,
    })
  );

  const { mutate: createStore, isPending } = useMutation(
    trpc.store.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success("Store created");
        queryClient.invalidateQueries(
          trpc.store.getMany.queryOptions({
            ...filter,
          })
        );
        queryClient.invalidateQueries(
          trpc.store.forSelect.queryOptions({
            search: "",
          })
        );
        router.push("/dashboard/store");
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
      userId: "",
      status: undefined,
    },
  });

  const onSubmit = (data: StoreSchemaType) => {
    createStore(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Store</CardTitle>
        <CardDescription>Create a new store</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>User</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        >
                          {field.value
                            ? data?.find(
                                (category) => category.id === field.value
                              )?.name
                            : "Select user"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                      <Command className="space-y-4">
                        <Input
                          type="search"
                          placeholder="Search brand..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="m-3 max-w-[190px]"
                        />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
                          <CommandGroup>
                            {data?.map((user) => (
                              <CommandItem
                                value={user.id}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue("userId", user.id);
                                  form.trigger("userId");
                                }}
                              >
                                {user.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    user.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
              title="Save"
              loadingTitle="Saving"
              isLoading={isPending}
              icon={Save}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
