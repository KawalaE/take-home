import { FC } from "react";
import { ListItem } from "../api/getListData";
import { useStore } from "../store";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
};

export const Card: FC<CardProps> = ({ id, title, description }) => {
  const { expandedIds } = useStore();
  return (
    <div className="border border-black p-5  dark:bg-white/10 rounded-xl maxw-80 animate-fadeIn">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>

        <div className="flex">
          {description && (
            <ExpandButton cardId={id}>
              {expandedIds.includes(id) === true ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </ExpandButton>
          )}

          {description && <DeleteButton cardId={id} />}
        </div>
      </div>
      {description && expandedIds.includes(id) && (
        <p
          className={`text-sm text-gray-600 pt-3 w-5/5 ${
            expandedIds.includes(id)
              ? "animate-fadeIn "
              : "animate-fadeOut delay-700"
          } `}
        >
          {description}
        </p>
      )}
    </div>
  );
};
