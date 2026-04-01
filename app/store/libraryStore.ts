import { create } from 'zustand';

export type LibraryBook = {
  id: string;
  title: string;
  coverUrl: string;
  isbn?: string;
  description?: string;
  progress?: number;
};

type LibraryState = {
  lectures: LibraryBook[];
  wishlist: LibraryBook[];
  addLecture: (book: LibraryBook) => void;
  addWishlist: (book: LibraryBook) => void;
};

export const useLibraryStore = create<LibraryState>((set) => ({
  lectures: [],
  wishlist: [],
  addLecture: (book) =>
    set((state) => {
      const alreadyExists = state.lectures.some((b) => b.id === book.id);
      if (alreadyExists) return state;
      return { lectures: [book, ...state.lectures] };
    }),
  addWishlist: (book) =>
    set((state) => {
      const alreadyExists = state.wishlist.some((b) => b.id === book.id);
      if (alreadyExists) return state;
      return { wishlist: [book, ...state.wishlist] };
    }),
}));