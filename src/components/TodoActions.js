import { useDispatch } from "react-redux";
import { sortDecsStatusTodoListReducers, sortDecsTodoListReducers, sortIncStatusTodoListReducers, sortIncTodoListReducers } from "../features/todo/todoSlice";

const TodoActions = ({ deleteSelectedItems, selectedItem, categoryId }) => {

    const dispatch = useDispatch();


    const sortIncTodoList = () => {
        dispatch(sortIncTodoListReducers(categoryId));
    }

    const sortDecsTodoList = () => {
        dispatch(sortDecsTodoListReducers(categoryId));
    }
    const sortIncStatusTodoList = () => {
        dispatch(sortIncStatusTodoListReducers(categoryId));
    }
    const sortDecsStatusTodoList = () => {
        dispatch(sortDecsStatusTodoListReducers(categoryId));
    }
    return (
        <div className="action-buttons">
            <button onClick={deleteSelectedItems} disabled={selectedItem.length === 0}>
                Xóa mục đã chọn
            </button>
            <div>
                <button onClick={sortIncTodoList}>Tăng dần</button>
                <button onClick={sortDecsTodoList}>Giảm dần</button>
                <button onClick={sortIncStatusTodoList}>Tăng dần status</button>
                <button onClick={sortDecsStatusTodoList}>Giảm dần status</button>
            </div>
        </div>
    );
}
export default TodoActions;
