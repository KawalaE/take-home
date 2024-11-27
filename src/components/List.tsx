import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
  isCollapsed: ListItem["isCollapsed"];
};

export const Card: FC<CardProps> = ({
  id,
  title,
  description,
  isCollapsed,
}) => {
  return (
    <div className="border border-black p-5  dark:bg-white/10 rounded-xl maxw-80 animate-fadeIn">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>

        <div className="flex">
          {description && (
            <ExpandButton cardId={id}>
              {isCollapsed === true ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>
          )}

          {description && <DeleteButton cardId={id} />}
        </div>
      </div>
      {description && isCollapsed && (
        <p
          className={`text-sm text-gray-400 pt-3 w-5/5 ${
            isCollapsed === true
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
