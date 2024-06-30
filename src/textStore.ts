import create from 'zustand';

type TextStore = {
  text: string;
  setText: (text: string) => void;
};

const useTextStore = create<TextStore>((set) => ({
  text: '',
  setText: (text) => set({ text }),
}));

export default useTextStore;