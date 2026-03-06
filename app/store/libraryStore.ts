import { create } from 'zustand';

export type LibraryBook = {
  id: string;
  title: string;
  coverUrl: string;
  isbn?: string;
};

type State = {
  lectures: LibraryBook[];
  wishlist: LibraryBook[];
  addLecture: (b: LibraryBook) => void;
  addWishlist: (b: LibraryBook) => void;
};

export const useLibraryStore = create<State>((set) => ({
  lectures: [],
  wishlist: [],
  addLecture: (b) =>
    set((s) => ({
      lectures: [{ ...b }, ...s.lectures],
    })),
  addWishlist: (b) =>
    set((s) => ({
      wishlist: [{ ...b }, ...s.wishlist],
    })),
}));