"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Minus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useMutation,
  useQueries,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
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
import { LoadingButton } from "@/components/loading-button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/color-picker";

import { UploadButton } from "@/lib/uploadthing";
import { useTRPC } from "@/trpc/client";
import { cn } from "@/lib/utils";
import { ProductSchema, ProductSchemaType } from "@/schema/product";
import { CATEGORY_STATUS } from "@/constant";
import { userProductFilter } from "@/modules/dashboard/product/filter/use-product-filter";

interface Props {
  id: string;
}

export const EditProductForm = ({ id }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchBrand, setSearchBrand] = useState<string>("");
  const [filter] = userProductFilter();

  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.product.getOne.queryOptions({
      id,
    })
  );

  const results = useQueries({
    queries: [
      {
        ...trpc.category.forSelect.queryOptions({
          search,
        }),
      },
      {
        ...trpc.brand.forSelect.queryOptions({
          search: searchBrand,
        }),
      },
    ],
  });

  const [categoryQuery, brandQuery] = results;

  const { mutate: updateProduct, isPending } = useMutation(
    trpc.product.vendorUpdate.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
        queryClient.invalidateQueries(
          trpc.product.getManyVendor.queryOptions({
            ...filter,
          })
        );
        queryClient.invalidateQueries(trpc.product.getOne.queryOptions({ id }));
        router.push("/vendor/product");
      },
    })
  );

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      categoryId: data?.categoryId || "",
      brandId: data?.brandId || "",
      variants: data?.variants.map((item) => ({
        name: item.name,
        price: item.price.toString(),
        discount: item.discount.toString(),
        stock: item.stock.toString(),
        size: item.size || "",
        color: item.color || "",
        imageUrl: item.imageUrl || [],
      })),
      status: (data?.status as CATEGORY_STATUS) || "Active",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = (data: ProductSchemaType) => {
    updateProduct({
      id,
      ...data,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Product</CardTitle>
        <CardDescription>Update product</CardDescription>
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
                    <Input
                      placeholder="Enter category name"
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
                      placeholder="Enter category description"
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
              name="brandId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Brand</FormLabel>
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
                            ? brandQuery.data?.find(
                                (category) => category.id === field.value
                              )?.name
                            : "Select brand"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                      <Command className="space-y-4">
                        <Input
                          type="search"
                          placeholder="Search brand..."
                          value={searchBrand}
                          onChange={(e) => setSearchBrand(e.target.value)}
                          className="m-3 max-w-[190px]"
                        />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
                          <CommandGroup>
                            {brandQuery.data?.map((category) => (
                              <CommandItem
                                value={category.id}
                                key={category.id}
                                onSelect={() => {
                                  form.setValue("brandId", category.id);
                                  form.trigger("brandId");
                                }}
                              >
                                {category.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category.id === field.value
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
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
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
                            ? categoryQuery.data?.find(
                                (category) => category.id === field.value
                              )?.name
                            : "Select category"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                      <Command className="space-y-4">
                        <Input
                          type="search"
                          placeholder="Search category..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="m-3 max-w-[190px]"
                        />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categoryQuery.data?.map((category) => (
                              <CommandItem
                                value={category.id}
                                key={category.id}
                                onSelect={() => {
                                  form.setValue("categoryId", category.id);
                                  form.trigger("categoryId");
                                }}
                              >
                                {category.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category.id === field.value
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

            <div className="border p-3 space-y-4">
              <h4 className="text-lg font-semibold">Variants</h4>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    className="flex gap-x-2 border border-muted p-2 rounded-sm"
                    key={index}
                  >
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline"
                      size="sm"
                      disabled={index === 0}
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </Button>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue={`item-${index}`}
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>
                          {form.watch(`variants.${index}.name`) ||
                            `Variant ${index + 1}`}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter variant name"
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
                            name={`variants.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter variant price"
                                    {...field}
                                    type="number"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.discount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discount</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter variant discount"
                                    {...field}
                                    type="number"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.stock`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter variant stock"
                                    {...field}
                                    type="number"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.size`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter variant size"
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
                            name={`variants.${index}.color`}
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-col gap-y-2">
                                  <FormLabel>Color</FormLabel>
                                  <ColorPicker
                                    value={field.value || "#FFFFFF"}
                                    onChange={(newColor) => {
                                      field.onChange(newColor);
                                    }}
                                    disabled={isPending}
                                  />
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.imageUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Images</FormLabel>
                                {form.watch(`variants.${index}.imageUrl`)
                                  .length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {form
                                      .watch(`variants.${index}.imageUrl`)
                                      .map((image: string, i: number) => (
                                        <div className="relative" key={i}>
                                          <Avatar className="size-12">
                                            <AvatarImage src={image} />
                                          </Avatar>
                                          <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={() =>
                                              field.onChange(
                                                form
                                                  .watch(
                                                    `variants.${index}.imageUrl`
                                                  )
                                                  .filter(
                                                    (img: string, i: number) =>
                                                      i !== i
                                                  )
                                              )
                                            }
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0"
                                          >
                                            <Trash2 className="w-5 h-5 text-rose-500" />
                                          </Button>
                                        </div>
                                      ))}
                                  </div>
                                ) : (
                                  <UploadButton
                                    disabled={isPending}
                                    endpoint="imagesUploader"
                                    onClientUploadComplete={(res) => {
                                      field.onChange(
                                        res.map((img) => img.ufsUrl)
                                      );
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
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
                <Button
                  type="button"
                  disabled={isPending}
                  variant="secondary"
                  onClick={() =>
                    append({
                      name: "",
                      price: "",
                      discount: "",
                      stock: "",
                      size: "",
                      color: "",
                      imageUrl: [],
                    })
                  }
                >
                  Add Variant
                </Button>
              </div>
            </div>

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
