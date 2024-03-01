import React, { useContext, useState } from "react";
import { TodoDispatchContext } from "../App";

const TodoEditor = () => {
    const { onCreate } = useContext(TodoDispatchContext);

    const [state, setState] = useState({
        content: "",
    });
    const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (state.content.length < 1) {
            alert("1자 이상 작성해주세요.");
            return;
        }
        onCreate(state.content);
        alert("추가하였습니다.");
        setState({
            content: "",
        });
    };

    return (
        <>
            <h1>todo List</h1>
            <div>
                <input
                    name="content"
                    type="text"
                    value={state.content}
                    onChange={handleChangeEvent}
                    placeholder="오늘 해야 할 일을 작성해보세요."
                />
                <button type="submit" onClick={handleSubmit}>
                    추가하기
                </button>
            </div>
        </>
    );
};

export default React.memo(TodoEditor);
