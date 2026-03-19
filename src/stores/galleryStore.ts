import { create } from "zustand";

interface GalleryState {
  activeProject: string | null;
  isEnquiryOpen: boolean;
  isOverlayOpen: boolean;
  nearbyProject: string | null;
  isLoaded: boolean;
  setActiveProject: (id: string | null) => void;
  setIsEnquiryOpen: (open: boolean) => void;
  setNearbyProject: (id: string | null) => void;
  setIsLoaded: (loaded: boolean) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  activeProject: null,
  isEnquiryOpen: false,
  isOverlayOpen: false,
  nearbyProject: null,
  isLoaded: false,
  setActiveProject: (id) =>
    set((state) => ({
      activeProject: id,
      isOverlayOpen: Boolean(id) || state.isEnquiryOpen,
    })),
  setIsEnquiryOpen: (open) =>
    set((state) => ({
      isEnquiryOpen: open,
      isOverlayOpen: open || Boolean(state.activeProject),
    })),
  setNearbyProject: (id) => set({ nearbyProject: id }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
