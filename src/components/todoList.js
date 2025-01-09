import { useEffect, useState } from "react";
import AddTodo from "./Addtodo";
import TodoActions from "./TodoActions";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

const AddToList = () => {
    // const [text, setText] = useState('');

    const [todoList, setTodoList] = useState([]);

    const [selectedItem, setSelectedItem] = useState(new Set());

    const navigate = useNavigate();
    useEffect(() => {
        const storedTodoList = localStorage.getItem('todoList');

        if (storedTodoList) {
            try {
                const parsedTodoList = JSON.parse(storedTodoList);
                console.log('Loaded todoList:', parsedTodoList);
                setTodoList(parsedTodoList);
            } catch (error) {
                console.error('Error in stored TodoList', error);
                setTodoList([]);
            }
        }
    }, []);

    useEffect(() => {

        console.log('Saving todoList:', todoList);
        if (todoList.length > 0) {
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
    }, [todoList]);

    const addTodo = (text)=>{
        const newTask= {id:Date.now(),text,complited:false,isEdit:false};
        setTodoList([newTask,...todoList])
        navigate(`/TodoList/${newTask.id}`); 

    }
    // const addtolist = () => {
    //     if (text.trim() !== '') {
    //         const newTask = { id: Date.now(), text: text, complited: false, isEdit:false };
    //         setTodoList([newTask, ...todoList]);
    //         setText('');
    //     }
    // }
    const deleteItem = (index) => {
        const newTodoList = setTodoList(todoList.filter((_, i) => i !== index));
        // localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }
    const deleteSelectedItems = () => {
        const newTodoList = todoList.filter((_, index) => !selectedItem.has(index));
        setSelectedItem(new Set());
        setTodoList(newTodoList);
    }
    const toggleSelectedItem = (index) => {
        setSelectedItem((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        })
    }

    const toggleComplited = (index) => {
        const newTodoList = todoList.map((item, i) => {
            if (i === index) {
                return { ...item, complited: !item.complited };
            }
            return item;
        });
        setTodoList(newTodoList);

    };
    const save = (id, newText)=>{
        const newTodoList= todoList.map((item)=>{
            if(item.id===id)
                return {...item, text:newText, isEdit:false}
            return item;
        })
        setTodoList(newTodoList);
    }
    const edit = (id,newText)=>{
        const newTodoList= todoList.map((item)=>{
            if(item.id===id)
                return {...item,text: newText,isEdit:true}
            return item;
        })
        setTodoList(newTodoList);
    }
    // const sortIncTodoList = () => {
    //     const sortedTodoList = [...todoList].sort((a, b) => a.text.localeCompare(b.text, 'vi', { sensitivity: 'base' }));
    //     setTodoList(sortedTodoList);
    // }
    // const sortDecsTodoList = () => {
    //     const sortedTodoList = [...todoList].sort((a, b) => b.text.localeCompare(a.text, 'vi', { sensitivity: 'base' }));
    //     setTodoList(sortedTodoList);
    // }
    return (
        <div className="container">
            <AddTodo addTodo={addTodo} />
            {todoList.length === 0 ? (
                <p>Danh sách công việc trống</p>
            ) : (
                <div>
                    <TodoActions deleteSelectedItems={deleteSelectedItems}
                                 selectedItem={selectedItem}
                                 todoList={todoList}
                                 setTodoList={setTodoList}
                                 edit={edit}
                                 save={save}
                    />
                    {/* <div className="action-buttons">
                        <button onClick={deleteSelectedItems} disabled={selectedItem.size === 0}>
                            Xóa mục đã chọn
                        </button>
                        <div>
                            <button onClick={sortIncTodoList}>Tăng dần</button>
                            <button onClick={sortDecsTodoList}>Giảm dần</button>
                        </div>
                    </div> */}
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Task</th>
                                <th>Complited</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todoList.map((item, index) => (
                                <TodoItem key={item.id} item={item} index={index} 
                                          toggleComplited={toggleComplited}
                                          toggleSelectedItem={toggleSelectedItem}
                                          deleteItem={deleteItem}
                                          save={save}
                                          edit={edit}
                                />  
                                // return (
                                //     <tr key={item.id}>
                                //         <td>
                                //             <input
                                //                 type="checkbox"
                                //                 checked={selectedItem.has(index)}
                                //                 onChange={() => toggleSelectedItem(index)}
                                //             />
                                //         </td>
                                //         {item.isEdit ? 
                                //         (<td><input type="text" value={item.text} 
                                //             onChange={(e) => {
                                //                 const newTodoList = todoList.map((t) => {
                                //                     if (t.id === item.id) {
                                //                         return { ...t, text: e.target.value };
                                //                     }
                                //                     return t;
                                //                 });
                                //                 setTodoList(newTodoList);
                                //             }}
                                //         /></td>
                                //     ):(<td>{item.text}</td>)
                                //         }
                                //         <td>
                                //             <input
                                //                 type="checkbox"
                                //                 checked={item.complited}
                                //                 onChange={() => toggleComplited(index)}
                                //             />
                                //         </td>
                                //         <td>
                                //             {item.isEdit ? (<button className="button-success" onClick={() => save(item.id, item.text )}>
                                //                 Save
                                //             </button>): ( <button className="button-success" onClick={() => edit(item.id)}>
                                //                 Edit
                                //             </button>)
                                //             }
                                           
                                //             <button className="button-delete" onClick={() => deleteItem(index)}>
                                //                 Delete
                                //             </button>
                                //             <Link to={`/TodoList/${item.id}`}>
                                //                 <button className="button-primary" >
                                //                     Details
                                //                 </button>
                                //             </Link>
                                //         </td>
                                //     </tr>
                                // );
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AddToList