import { CheckedSVG, RemoveSVG } from "@/utils/SVG";
import React from "react";

interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  onToggle,
  onRemove,
}) => {
  return (
    <li>
      <div className="grid grid-cols-12">
        <div className="col-span-1 max-lg:col-span-2">
          <button onClick={onToggle} className="w-5 h-5">
            <CheckedSVG checked={completed} />
          </button>
        </div>
        <div className="col-span-10 max-lg:col-span-8" onClick={onToggle}>
          <span
            style={{
              textDecoration: completed ? "line-through" : "none",
              color: completed ? "gray" : "inherit",
              width: "100%",
            }}
          >
            {text}
          </span>
        </div>
        <div className="col-span-1 max-lg:col-span-2">
          <button className="w-5 h-5" onClick={onRemove}>
            <RemoveSVG />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
