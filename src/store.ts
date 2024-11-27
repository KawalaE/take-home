import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";
type State = {
  cards: ListItem[];
  expandedIds: number[];
  deletedCards: DeletedListItem[];
  isDelatedRevaled: boolean;
};

type Actions = {
  setCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleExpand: (id: number) => void;
  revealDelated: () => void;
};

export const useStore = create<State & Actions>()((set) => ({
  cards: [],
  deletedCards: [],
  expandedIds: [],
  isDelatedRevaled: false,

  setCards: (cards) => set({ cards }),

  deleteCard: (id) => {
    set((state) => {
      const cardToDelete = state.cards.find((card) => card.id === id);

      if (!cardToDelete) {
        return state;
      }
      const updatedCards = state.cards.filter((card) => card.id !== id);

      return {
        cards: updatedCards,
        deletedCards: [
          ...state.deletedCards,
          {
            id: cardToDelete.id,
            title: cardToDelete.title,
            isVisible: cardToDelete.isVisible,
          },
        ],
      };
    });
  },

  toggleExpand: (id) => {
    set((state) => ({
      expandedIds: state.expandedIds.includes(id)
        ? state.expandedIds.filter((expandedId) => expandedId !== id)
        : [...state.expandedIds, id],
    }));
  },

  revealDelated: () => {
    set((state) => ({
      isDelatedRevaled: !state.isDelatedRevaled,
    }));
  },
}));
