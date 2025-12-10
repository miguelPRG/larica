import { create } from "zustand";
import { devtools } from "zustand/middleware";

type LocationState = {
  lat: number | null;
  log: number | null;
  place: string | null;
  setLocation: (lat: number, log: number, place: string) => void;
  clearLocation: () => void;
};

export const useLocationStore = create<LocationState>()(
  devtools(
    (set) => ({
      lat: null,
      log: null,
      place: null,
      setLocation: (lat, log, place) => set({ lat, log, place }),
      clearLocation: () => set({ lat: null, log: null, place: null }),
    }),
    { name: "LocationStore" },
  ),
);
