import { create } from "zustand";

interface GalleryState {
  activeProject: string | null;
  isOverlayOpen: boolean;
  nearbyProject: string | null;
  isLoaded: boolean;
  setActiveProject: (id: string | null) => void;
  setNearbyProject: (id: string | null) => void;
  setIsLoaded: (loaded: boolean) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  activeProject: null,
  isOverlayOpen: false,
  nearbyProject: null,
  isLoaded: false,
  setActiveProject: (id) =>
    set({
      activeProject: id,
      isOverlayOpen: Boolean(id),
    }),
  setNearbyProject: (id) => set({ nearbyProject: id }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
