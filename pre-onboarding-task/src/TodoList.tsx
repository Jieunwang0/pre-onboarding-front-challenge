import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "./App";

const TodoList = () => {
    const todoList = useContext(TodoStateContext);
    return (
        <div>
            {todoList.map((it) => (
                <TodoItem key={it.id} {...it} />
            ))}
        </div>
    );
};

TodoList.defaultProps = {
    todoList: [],
};

export default TodoList;
