import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkList from "./Link";

  
  const TodoItemDetail=()=>{
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    
    useEffect(()=>{
    const storeTodoList = localStorage.getItem('todoList');

    if(storeTodoList){
        try {
            const parsedTodoList= JSON.parse(storeTodoList);

            const todoItem = parsedTodoList.find(item => item.id ===Number(id));

            if(todoItem){
                setTodo(todoItem);
            }else{
                console.error("lỗi không có id đấy rồi, xem lại đê!");
            }
        } catch (error) {
            console.error("lỗi không có dữ liệu gì trong localStorage rồi , xem lại đê!");
        }
    }
    },[id])

    return(
    <>
        <LinkList/>
        <div>
            {
                todo? (
                    <>
                        <h1>Task Details</h1>
                        <p>Text:{todo.text}</p>
                        <p>Status: {todo.complited ? "Completed" : "Not completed"}</p>
                    </>
                ):(
                    <p>Không có dữ liệu á</p>
                )
            }
        </div>
        </>
    );
  }
  export default TodoItemDetail