import React, { useCallback, useMemo, useReducer, useRef } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoEditor from "./TodoEditor";

interface ListItem {
    id: number;
    content: string;
}
type TodoAction =
    | { type: "CREATE"; data: ListItem }
    | { type: "DELETE"; targetId: number };
    
const reducer = (state: ListItem[], action: TodoAction) => {
    switch (action.type) {
        case "CREATE": {
            const newItem = {
                ...action.data,
            };
            return [newItem, ...state];
        }
        case "DELETE":
            return state.filter((it) => it.id !== action.targetId);
        default:
            return state;
    }
};

export const TodoStateContext = React.createContext<ListItem[]>([]);
export const TodoDispatchContext = React.createContext();

const App = () => {
    const [list, dispatch] = useReducer(reducer, []);
    // const [inputText, setInputText] = useState("");
    // const [list, setList] = useState<ListItem[]>([]);
    const listId = useRef<number>(0);



    const onCreate = useCallback((content:string) => {
        dispatch({
            type: "CREATE",
            data: {
                content,
                id: listId.current,
            },
        });
        listId.current += 1;
    }, []);


    const onDelete = useCallback((targetId: number) => {
         dispatch({ type: "DELETE", targetId });
    }, []);

 const memoizedDispatches = useMemo(() => {
     return { onCreate, onDelete };
 }, []);
 
    return (
        <TodoStateContext.Provider value={list}>
            <TodoDispatchContext.Provider value={memoizedDispatches}>
                <TodoEditor />
                <TodoList />
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
};

export default App;
