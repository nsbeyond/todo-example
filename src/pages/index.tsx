import { TodoList } from "@/components/TodoList";

export default function index(): JSX.Element {
  return (
    <div className="todo-container">
      <TodoList />
    </div>
  );
}
