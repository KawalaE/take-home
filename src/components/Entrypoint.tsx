import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  //const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const listQuery = useGetListData();
  const { cards, setCards, deletedCards, revealDelated, isDelatedRevaled } =
    useStore();
  console.log(cards);
  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data) {
      setCards(listQuery.data);
      console.log(typeof listQuery.data[0].id);
    }

    //setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading, setCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List{" "}
          <span className="text-green-500 ml-3 ">{cards?.length}</span>
        </h1>
        <div className="flex flex-col gap-y-3 pt-5">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              isCollapsed={card.isCollapsed}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between ">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards{" "}
            <span className="text-green-500 ml-3 ">{deletedCards.length}</span>
          </h1>
          <button
            onClick={revealDelated}
            className="text-black text-sm transition-colors hover:bg-green-300  disabled:bg-black/75 bg-green-400 rounded px-3 py-1"
          >
            {isDelatedRevaled === true ? "Hide" : "Reveal"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3 pt-5">
          {isDelatedRevaled &&
            deletedCards.map((card) => (
              <Card key={card.id} id={card.id} title={card.title} />
            ))}
        </div>
      </div>
    </div>
  );
};
