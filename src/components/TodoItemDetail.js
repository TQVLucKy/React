import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import LinkList from "./Link";

const TodoItemDetail = () => {
    const { categoryId, todoId } = useParams(); 
    const [todo, setTodo] = useState(null); 
    const [categoryName, setCategoryName] = useState(""); 

    useEffect(() => {
        const storeTodoList = localStorage.getItem('categories');
        
        if (storeTodoList) {
            try {
                const parsedTodoList = JSON.parse(storeTodoList);
                
                const category = parsedTodoList.find(item => item.id === Number(categoryId));
                
                if (category) {
                    setCategoryName(category.name); 
                    const todoItem = category.todos.find(todo => todo.id === Number(todoId));
                    
                    if (todoItem) {
                        setTodo(todoItem); 
                    } else {
                        console.error(`Todo with id: ${todoId} not found in category: ${categoryId}`);
                        setTodo(null); 
                    }
                } else {
                    console.error(`Category with id: ${categoryId} not found`);
                    setTodo(null);  
                }
            } catch (error) {
                console.error("Error reading data from localStorage: ", error);
                setTodo(null); 
            }
        } else {
            console.error("No data in localStorage");
            setTodo(null); 
        }
    }, [categoryId, todoId]);

    const getCompletedText = (completed) => {
        switch (completed) {
            case 0:
                return "Not started";
            case 1:
                return "In progress";
            case 2:
                return "Completed";
            default:
                return "Unknown";
        }
    };

    return (
        <Container maxWidth="md">
            <LinkList />
            <Paper sx={{ padding: 2, marginTop: 3 }}>
                {todo ? (
                    <>
                        <Typography variant="h4" gutterBottom>
                            {categoryName}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Text:</strong> {todo.text}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Status:</strong> {getCompletedText(todo.complited)}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                                Back to List
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No data available for this todo or an error occurred.
                    </Typography>
                )}
            </Paper>
        </Container>
    );
}

export default TodoItemDetail;
