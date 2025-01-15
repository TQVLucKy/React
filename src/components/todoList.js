import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, addCategoryReducers } from "../features/todo/todoSlice";
import CategoryItem from "./CategoryItem";

const AddToList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.todos.categories);

    const [categoryName, setCategoryName] = useState('');
    const [error,setError] = useState('');
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('categories'));
        if (savedTodos) {
            dispatch(setTodos(savedTodos));
        }
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }, [categories]);

    const addCategory = () => {
        if (categoryName.trim()) {
            dispatch(addCategoryReducers(categoryName));
            setCategoryName('');
            setError('');
        }else{
            setError('Category name cannot be empty!')
        }
    };

    return (
        <Box sx={{ p: 5, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }} textAlign="center">
                Manage Your Categories
            </Typography>
            
            <Box display="flex" gap={2} mb={4}>
                <TextField
                    label="Category Name"
                    variant="outlined"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "#f5f5f5" }}
                    error={Boolean(error)}
                    helperText={error}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addCategory}
                    disabled={categoryName.trim() === ''}
                    sx={{ flex: '1 1 30%', height: '100%' }}
                >
                    Add Category
                </Button>
            </Box>

            {categories.length > 0 ? (
                categories.map(cat => (
                    <div key={cat.id} >
                        <CategoryItem category={cat} />
                    </div>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary" textAlign="center">
                    No categories available.
                </Typography>
            )}
        </Box>
    );
};

export default AddToList;
