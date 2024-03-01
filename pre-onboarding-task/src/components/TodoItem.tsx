import React, { useContext } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, content }) => {
    const { onDelete } = useContext(TodoDispatchContext);

    const handleRemove = () => {
        if (window.confirm(`투두리스트에서 지우시겠습니까?`)) {
            onDelete(id);
        }
    };

    return (
        <>
            <p>{content}</p>
            <button onClick={handleRemove}>지우기</button>
        </>
    );
};

export default React.memo(TodoItem);
