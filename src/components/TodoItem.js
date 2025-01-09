import { useState } from "react";
import { Link } from "react-router-dom";

const TodoItem=({item, index,toggleComplited,toggleSelectedItem,deleteItem,edit,save})=>{

    const [isEdit,setIsEdit] = useState(item.isEdit);
    const [newText,setNewText] = useState(item.text);


    return (
        <tr key={item.id}>
            <td>
                <input
                    type="checkbox"
                    onChange={() => toggleSelectedItem(index)}
                />
            </td>
            {item.isEdit ? 
            (<td><input type="text" value={newText} 
                // onChange={(e) => {
                //     const newTodoList = todoList.map((t) => {
                //         if (t.id === item.id) {
                //             return { ...t, text: e.target.value };
                //         }
                //         return t;
                //     });
                //     setTodoList(newTodoList);
                // }}
                onChange={(e)=> setNewText(e.target.value)}
            /></td>
        ):(<td>{item.text}</td>)
            }
            <td>
                <input
                    type="checkbox"
                    checked={item.complited}
                    onChange={() => toggleComplited(index)}
                />
            </td>
            <td>
                {item.isEdit ? (<button className="button-success" onClick={() => save(item.id, newText )}>
                    Save
                </button>): ( <button className="button-success" onClick={() => edit(item.id)}>
                    Edit
                </button>)
                }
               
                <button className="button-delete" onClick={() => deleteItem(index)}>
                    Delete
                </button>
                <Link to={`/TodoList/${item.id}`}>
                    <button className="button-primary" >
                        Details
                    </button>
                </Link>
            </td>
        </tr>
    );
}
export default TodoItem