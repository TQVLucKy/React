import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addTodo, deleteItemReducers, toggleSelectedItemReducers, toggleComplitedReducers, saveReducers, editReducers, sortIncTodoListReducers, sortDecsTodoListReducers, sortIncStatusTodoListReducers, sortDecsStatusTodoListReducers, deleteCategoryReducers, deleteSelectedItemsReducers } from "../features/todo/todoSlice";
import AddTodo from './Addtodo';
import TodoItem from './TodoItem';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Card } from '@mui/material';

const CategoryItem = ({ category }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const categories = useSelector(state => state.todos.categories);
    const selectedItem = useSelector(state => state.todos.selectedItem);


    useEffect(() => {
        if (categories.length > 0) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }, [categories]);

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        if (storedCategories.length > 0) {
            const currentCategories = categories.map(category => category.id);
            const newCategories = storedCategories.filter(storedCategory => !currentCategories.includes(storedCategory.id));

            if (newCategories.length > 0) {
                newCategories.forEach(category => {
                    dispatch(addTodo({ text: category.text, id: category.id }));
                });
            }
        }
    }, [dispatch, categories]);

    const categoryData = category || categories.find(category => category.id === parseInt(categoryId));

    const addtodo = (text, id) => {
        if (id && id !== '') {
            dispatch(addTodo({ text, id }));
        } else {
            alert('Error: Missing ID');
        }
    };

    const deleteItem = (id, categoryId) => {
        dispatch(deleteItemReducers({ id, categoryId }));
    };
    const deleteSelectedItems = () => {
        dispatch(deleteSelectedItemsReducers(categoryData.id));
    };
    const toggleSelectedItem = (id, categoryId) => {
        dispatch(toggleSelectedItemReducers({id, categoryId}));

    };

    const toggleComplited = (index, categoryId) => {
        dispatch(toggleComplitedReducers({ index, categoryId }));
    };

    const save = (id, newText, categoryId) => {
        dispatch(saveReducers({ id, newText, categoryId }));
    };

    const edit = (id, categoryId) => {
        dispatch(editReducers({ id, categoryId }));
    };

    const sortIncTodoList = (id) => {
        dispatch(sortIncTodoListReducers(id));
    };

    const sortDecsTodoList = (id) => {
        dispatch(sortDecsTodoListReducers(id));
    };

    const sortIncStatusTodoList = (id) => {
        dispatch(sortIncStatusTodoListReducers(id));
    };

    const sortDecsStatusTodoList = (id) => {
        dispatch(sortDecsStatusTodoListReducers(id));
    };

    const deleteCategory = (categoryId) => {
        dispatch(deleteCategoryReducers(categoryId));
        navigate('/TodoList');
    };

    return (
        <Card sx={{ padding: 2, margin: 2, borderRadius: 2 }}>
            <div key={categoryData?.id}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd"
                }}>
                    <Link to={`/TodoList/${categoryData?.id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="h5" sx={{
                            fontWeight: "bold",
                            color: "#1976d2",
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            maxWidth: '300px',
                            "&:hover": {
                                color: "#0d47a1",
                            }
                        }}>
                            {categoryData?.name}
                        </Typography>
                    </Link>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteCategory(categoryData?.id)}
                        sx={{
                            fontWeight: "bold",
                            padding: "6px 16px",
                            borderRadius: "8px",
                            '&:hover': {
                                backgroundColor: '#f44336',
                                color: 'white',
                            }
                        }}
                    >
                        Delete Category
                    </Button>
                </Box>

                <AddTodo addtodo={addtodo} id={categoryData?.id} />

                {categoryData?.todos?.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">No tasks available.</Typography>
                ) : (
                    <TableContainer sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Select</TableCell>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Typography variant="body1" sx={{ marginRight: 1 }}>Task</Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <Button onClick={() => sortIncTodoList(categoryData?.id)} sx={{ padding: 0 }}>
                                                    <Typography variant="body2">▲</Typography>
                                                </Button>
                                                <Button onClick={() => sortDecsTodoList(categoryData?.id)} sx={{ padding: 0 }}>
                                                    <Typography variant="body2">▼</Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Typography variant="body1" sx={{ marginRight: 1 }}>Status</Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <Button onClick={() => sortIncStatusTodoList(categoryData?.id)} sx={{ padding: 0 }}>
                                                    <Typography variant="body2">▲</Typography>
                                                </Button>
                                                <Button onClick={() => sortDecsStatusTodoList(categoryData?.id)} sx={{ padding: 0 }}>
                                                    <Typography variant="body2">▼</Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {categoryData?.todos?.map((item, index) => (
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        categoryId={categoryData?.id}
                                        index={index}
                                        toggleComplited={toggleComplited}
                                        toggleSelectedItem={toggleSelectedItem}
                                        deleteItem={deleteItem}
                                        save={save}
                                        edit={edit}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteSelectedItems}
                        disabled={selectedItem.length === 0 || !selectedItem.some(item => item.categoryId === categoryData.id)} 
                        sx={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                            }
                        }}
                    >
                        Delete Selected Items
                    </Button>
                </Box>

            </div>
        </Card>
    );
};

export default CategoryItem;
