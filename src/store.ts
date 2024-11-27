import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";

type State = {
  cards: ListItem[];
  deletedCards: DeletedListItem[];
  isDelatedRevaled: boolean;
};

type Actions = {
  setCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleExpand: (id: number) => void;
  revealDelated: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  cards: [],
  deletedCards: [],
  isDelatedRevaled: false,

  setCards: (cards) => set({ cards }),

  deleteCard: (id) => {
    set((state) => {
      const cardToDelete = state.cards.find((card) => card.id === id);

      if (!cardToDelete) {
        return state;
      }
      return {
        cards: state.cards.filter((card) => card.id !== id),
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
    set((state) => {
      const updatedCards = state.cards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            isCollapsed: card.isCollapsed === true ? false : true,
          };
        }
        return card;
      });
      return { cards: updatedCards };
    });
  },
  revealDelated: () => {
    set((state) => {
      return {
        isDelatedRevaled: state.isDelatedRevaled === true ? false : true,
      };
    });
  },
}));
