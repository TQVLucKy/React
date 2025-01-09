
const TodoActions = ({ deleteSelectedItems,selectedItem,todoList,setTodoList }) => {

    const sortIncTodoList=()=>{
        const sortedTodoList = [...todoList].sort((a, b) => a.text.localeCompare(b.text, 'vi', { sensitivity: 'base' }));
        setTodoList(sortedTodoList);
    }
    const sortDecsTodoList = () => {
        const sortedTodoList = [...todoList].sort((a, b) => b.text.localeCompare(a.text, 'vi', { sensitivity: 'base' }));
        setTodoList(sortedTodoList);
    }
    return (
        <div className="action-buttons">
            <button onClick={deleteSelectedItems} disabled={selectedItem.size === 0}>
                Xóa mục đã chọn
            </button>
            <div>
                <button onClick={sortIncTodoList}>Tăng dần</button>
                <button onClick={sortDecsTodoList}>Giảm dần</button>
            </div>
        </div>
    );
}
export default TodoActions;