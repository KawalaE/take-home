import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { useStore } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const listQuery = useGetListData();

  const { cards, setCards, deletedCards, revealDelated, isDelatedRevaled } =
    useStore();
  const [deletedCards1, setDeletedCards1] = useState<ListItem[]>([]);
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }
    const deletedCardsIds = deletedCards.map((item) => item.id);

    if (deletedCardsIds && listQuery.data) {
      setDeletedCards1(
        listQuery.data?.filter((item) => deletedCardsIds.includes(item.id))
      );
      setVisibleCards(
        listQuery.data?.filter((item) => !deletedCardsIds.includes(item.id))
      );
    }

    if (listQuery.data) {
      setCards(listQuery?.data);
    }
  }, [listQuery.data, listQuery.isLoading, deletedCards, cards, setCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List{" "}
          <span className="text-green-500 ml-3 ">{visibleCards?.length}</span>
        </h1>
        <div className="flex flex-col gap-y-3 pt-5">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between ">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards{" "}
            <span className="text-green-500 ml-3 ">{deletedCards1.length}</span>
          </h1>
          <button
            disabled={!deletedCards1.length}
            onClick={revealDelated}
            className="text-black text-sm transition-colors hover:bg-green-300  disabled:bg-white/10 bg-green-400 rounded px-3 py-1"
          >
            {isDelatedRevaled === true ? "Hide" : "Reveal"}
          </button>
          <button
            onClick={() => listQuery.refetch()}
            className="text-black text-sm transition-colors hover:bg-green-300  disabled:bg-white/10 bg-green-400 rounded px-3 py-1"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3 pt-5">
          {isDelatedRevaled &&
            deletedCards1.map((card) => (
              <Card key={card.id} id={card.id} title={card.title} />
            ))}
        </div>
      </div>
    </div>
  );
};
