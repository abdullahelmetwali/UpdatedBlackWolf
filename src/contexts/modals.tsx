import { create } from "zustand";

type UseModals = {
    modals: Map<string, boolean | any>,

    getItemInModal: (name: string) => any;
    openModal: (name: string, valueOfName?: any) => void,
    closeModal: (name: string) => void,
    isModalOpen: (name: string) => boolean,
    closeAllModals: () => void,
};

export const useModals = create<UseModals>((set, get) => ({
    modals: new Map(),

    getItemInModal: (name) => {
        const latestModals = get().modals;
        return latestModals[name];
    },
    openModal: (name, valueOfName) => {
        const latestModals = get().modals;
        latestModals.set(name, valueOfName || true);
        return set({ modals: latestModals });
    },
    closeModal: (name) => {
        const latestModals = get().modals;
        latestModals.delete(name);
        return set({ modals: latestModals });
    },
    isModalOpen: (name) => {
        const latestModals = get().modals;
        return Boolean(latestModals.get(name));
    },
    closeAllModals: () => {
        return set({ modals: new Map() });
    },
}));
