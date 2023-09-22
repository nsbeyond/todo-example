import { useCallback, useState } from "react";
import TodoItem from "./TodoItem";
import _ from "lodash";
interface ITodoItem {
  text: string;
  completed: boolean;
}

export default function TodoList(): JSX.Element {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [todoText, setTodoText] = useState<string>("");

  const addTodo = useCallback(() => {
    if (todoText.trim() !== "") {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText("");
    }
  }, [todoText, todos]);

  const removeTodo = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    },
    [todos]
  );

  const toggleComplete = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
    },
    [todos]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );

  return (
    <div className="flex flex-col">
      <div className="bg-[#0ecf00] text-black shadow-black shadow-sm rounded-lg p-5 mb-10">
        <h1 className=" text-2xl underline">To-Do List</h1>
      </div>
      <div className="container">
        <input
          type="text"
          className="input input-bordered input-primary w-full text-black mb-5"
          placeholder="Add a new task"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn w-full mb-5" onClick={addTodo}>
          Add new Todo
        </button>
        {!_.isEmpty(todos) && (
          <ul className="bg-white h-auto text-black shadow-black shadow-sm rounded-lg p-5 select-none">
            {_.map(todos, (todo, index) => (
              <TodoItem
                key={index}
                completed={todo.completed}
                text={todo.text}
                onRemove={() => removeTodo(index)}
                onToggle={() => toggleComplete(index)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
