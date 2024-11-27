import { FC } from "react";
import { useStore } from "../store";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  cardId: number;
};

export const ExpandButton: FC<ButtonProps> = ({
  cardId,
  children,
  ...props
}) => {
  const toggleExpand = useStore((state) => state.toggleExpand);

  const handleExpansion = () => {
    toggleExpand(cardId);
  };
  return (
    <button
      onClick={handleExpansion}
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = ({
  cardId,
  ...props
}) => {
  const deleteCard = useStore((state) => state.deleteCard);

  const handleDeletion = () => {
    deleteCard(cardId);
  };
  return (
    <button
      onClick={handleDeletion}
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};
