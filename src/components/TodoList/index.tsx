import { CheckedSVG, RemoveSVG } from "@/utils/SVG";
import { useState } from "react";
import _ from "lodash";

interface ITodoItem {
  text: string;
  completed: boolean;
}

export const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [todoText, setTodoText] = useState<string>("");

  const addTodo = () => {
    if (todoText.trim() !== "") {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText("");
    }
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#0ecf00] text-black shadow-black shadow-sm rounded-lg p-5 mb-10">
        <h1 className=" text-2xl underline">To-Do List</h1>
      </div>
      <div>
        <div>
          <input
            type="text"
            className="input input-bordered input-primary w-full text-black mb-5"
            placeholder="Add a new task"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className="btn w-full mb-5" onClick={addTodo}>
          Add new Todo
        </button>
        {!_.isEmpty(todos) && (
          <ul className="bg-white h-auto text-black shadow-black shadow-sm rounded-lg p-5 select-none">
            {todos.map((todo, index) => (
              <li key={index}>
                <div className="grid grid-cols-12">
                  <div className="col-span-1">
                    <button
                      onClick={() => toggleComplete(index)}
                      className="w-5 h-5"
                    >
                      <CheckedSVG checked={todo.completed} />
                    </button>
                  </div>
                  <div
                    className="col-span-10"
                    onClick={() => toggleComplete(index)}
                  >
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed ? "gray" : "inherit",
                        width: "100%",
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="w-5 h-5"
                      onClick={() => removeTodo(index)}
                    >
                      <RemoveSVG />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
