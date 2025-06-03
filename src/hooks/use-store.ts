import { create } from "zustand";

import { STORE_STATUS } from "@/constant";

interface DeleteStoreState {
  isOpen: boolean;
  storeId: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteStore = create<DeleteStoreState>((set) => ({
  isOpen: false,
  storeId: "",
  onOpen: (id: string) => set({ isOpen: true, storeId: id }),
  onClose: () => set({ isOpen: false, storeId: "" }),
}));

interface DeleteManyStoreState {
  isOpen: boolean;
  ids: string[];
  onOpen: (ids: string[]) => void;
  onClose: () => void;
}

export const useDeleteManyStore = create<DeleteManyStoreState>((set) => ({
  isOpen: false,
  ids: [],
  onOpen: (ids: string[]) => set({ isOpen: true, ids }),
  onClose: () => set({ isOpen: false, ids: [] }),
}));

interface ChangeStoreStatusState {
  isOpen: boolean;
  storeId: string;
  status: STORE_STATUS;
  onOpen: (id: string, status: STORE_STATUS) => void;
  onClose: () => void;
}

export const useChangeStoreStatus = create<ChangeStoreStatusState>((set) => ({
  isOpen: false,
  storeId: "",
  status: STORE_STATUS.PENDING,
  onOpen: (id: string, status: STORE_STATUS) =>
    set({ isOpen: true, storeId: id, status }),
  onClose: () =>
    set({ isOpen: false, storeId: "", status: STORE_STATUS.PENDING }),
}));
