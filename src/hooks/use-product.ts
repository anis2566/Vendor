import { create } from "zustand";

interface DeleteProductState {
  isOpen: boolean;
  productId: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteProduct = create<DeleteProductState>((set) => ({
  isOpen: false,
  productId: "",
  onOpen: (id: string) => set({ isOpen: true, productId: id }),
  onClose: () => set({ isOpen: false, productId: "" }),
}));

interface DeleteManyProductState {
  isOpen: boolean;
  ids: string[];
  onOpen: (ids: string[]) => void;
  onClose: () => void;
}

export const useDeleteManyProduct = create<DeleteManyProductState>((set) => ({
  isOpen: false,
  ids: [],
  onOpen: (ids: string[]) => set({ isOpen: true, ids }),
  onClose: () => set({ isOpen: false, ids: [] }),
}));

interface VendorDeleteProductState {
  isOpen: boolean;
  productId: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useVendorDeleteProduct = create<VendorDeleteProductState>(
  (set) => ({
    isOpen: false,
    productId: "",
    onOpen: (id: string) => set({ isOpen: true, productId: id }),
    onClose: () => set({ isOpen: false, productId: "" }),
  })
);

interface VendorDeleteManyProductState {
  isOpen: boolean;
  ids: string[];
  onOpen: (ids: string[]) => void;
  onClose: () => void;
}

export const useVendorDeleteManyProduct = create<VendorDeleteManyProductState>(
  (set) => ({
    isOpen: false,
    ids: [],
    onOpen: (ids: string[]) => set({ isOpen: true, ids }),
    onClose: () => set({ isOpen: false, ids: [] }),
  })
);
