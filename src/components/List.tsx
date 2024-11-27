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
    <div className="border border-black px-2 py-1.5">
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
      {description && isCollapsed && <p className="text-sm">{description}</p>}
    </div>
  );
};
