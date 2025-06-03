"use client";

import { DeleteCategoryModal } from "@/modules/dashboard/category/ui/modal/delete-modal";
import { DeleteManyCategoriesModal } from "@/modules/dashboard/category/ui/modal/delete-many-modal";
import { DeleteBrandModal } from "@/modules/dashboard/brand/ui/modal/delete-modal";
import { DeleteManyBrandsModal } from "@/modules/dashboard/brand/ui/modal/delete-many-modal";
import { DeleteProductModal } from "@/modules/dashboard/product/ui/modal/delete-modal";
import { DeleteManyProductsModal } from "@/modules/dashboard/product/ui/modal/delete-many-modal";
import { DeleteStoreModal } from "@/modules/dashboard/store/ui/modal/delete-modal";
import { DeleteManyStoresModal } from "@/modules/dashboard/store/ui/modal/delete-many-modal";
import { VendorDeleteProductModal } from "@/modules/vendor/product/ui/modal/delete-modal";
import { VendorDeleteManyProductsModal } from "@/modules/vendor/product/ui/modal/delete-many-modal";
import { ChangeStoreStatusModal } from "@/modules/dashboard/store/ui/modal/status-modal";

export const ModalProvider = () => {
  return (
    <>
      <DeleteCategoryModal />
      <DeleteManyCategoriesModal />
      <DeleteBrandModal />
      <DeleteManyBrandsModal />
      <DeleteProductModal />
      <DeleteManyProductsModal />
      <DeleteStoreModal />
      <DeleteManyStoresModal />
      <VendorDeleteProductModal />
      <VendorDeleteManyProductsModal />
      <ChangeStoreStatusModal />
    </>
  );
};
