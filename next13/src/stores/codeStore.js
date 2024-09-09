import { create } from 'zustand';

export const useCodeShowStore = create((set) => ({
  codeShow: { react: false, css: false },
  setCodeShow: (newState) =>
    set((state) => ({
      codeShow: { ...state.codeShow, ...newState },
    })),
  resetCodeShow: () => set({ codeShow: { react: false, css: false } }),
}));
