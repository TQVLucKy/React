import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: JSON.parse(localStorage.getItem('categories')) || [],
    todoList: [],
    selectedItem: [],
}

export const TodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // categories
        addCategoryReducers: (state, action) => {
            state.categories.push({ id: Date.now(), name: action.payload, todos: [] });
        },

        addTodo: (state, action) => {
            const { id, text } = action.payload;

            const category = state.categories.find(cat => cat.id === id);

            if (category) {
                category.todos.push({
                    id: Date.now(),
                    text,
                    complited: 0,
                    isEdit: false
                });
            } else {
                alert('Category not found for ID:', id);
            }
        },
        deleteCategoryReducers: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
            localStorage.setItem('categories', JSON.stringify(state.categories));
        },
        deleteItemReducers: (state, action) => {
            const { id, categoryId } = action.payload;
            state.categories = state.categories.map(category => {
                if (category.id === categoryId) {
                    category.todos = category.todos.filter(item => item.id !== id);
                }
                return category;
            })
        },
        deleteSelectedItemsReducers: (state, action) => {
            state.categories.forEach(category => {
                if (category.id === action.payload) {
                    category.todos = category.todos.filter(todo => {
                        return !state.selectedItem.some(selectedItem =>
                            selectedItem.id === todo.id && selectedItem.categoryId === category.id
                        );
                    });
                }
            });
        },
        
        toggleComplitedReducers: (state, action) => {
            const { index, categoryId } = action.payload;
            state.categories = state.categories.map(category => {
                if (category.id === categoryId) {
                    if (category.todos[index])
                        category.todos[index].complited = (category.todos[index].complited + 1) % 3;
                }
                return category;
            })

        },
        toggleSelectedItemReducers: (state, action) => {
            const { id, categoryId } = action.payload;
            state.selectedItem = [...state.selectedItem, { id:id,categoryId:categoryId }];
        },

        setTodos: (state, action) => {
            state.categories = action.payload
        },
        saveReducers: (state, action) => {
            const { id, newText, categoryId } = action.payload;
            state.categories = state.categories.map(category => {
                if (category.id === categoryId) {
                    category.todos = category.todos.map(todo => {
                        if (todo.id === id) {
                            todo.text = newText;
                            todo.isEdit = !todo.isEdit;
                        }
                        return todo;
                    })
                }
                return category;
            })
        },
        editReducers: (state, action) => {
            const { id, categoryId } = action.payload;
            state.categories = state.categories.map(category => {
                if (category.id === categoryId) {
                    category.todos = category.todos.map(todo => {
                        if (todo.id === id) {
                            todo.isEdit = !todo.isEdit
                        }
                        return todo;
                    });
                }
                return category;
            })
        },
        sortIncTodoListReducers: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload) {
                    category.todos = [...category.todos].sort((a, b) => a.text.localeCompare(b.text, 'vi', { sensitivity: 'base' }));
                }
                return category;
            })
        },
        sortDecsTodoListReducers: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload) {
                    category.todos = [...category.todos].sort((a, b) => b.text.localeCompare(a.text, 'vi', { sensitivity: 'base' }))
                }
                return category;
            })
        },
        sortIncStatusTodoListReducers: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload) {
                    category.todos = [...category.todos].sort((a, b) => a.complited - b.complited)
                }
                return category;
            })
        },
        sortDecsStatusTodoListReducers: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload) {
                    category.todos = [...category.todos].sort((a, b) => b.complited - a.complited)
                }
                return category;
            })
        }
    }
});

export const {
    addCategoryReducers,
    addTodo,
    deleteCategoryReducers,
    deleteItemReducers,
    deleteSelectedItemsReducers,
    saveReducers,
    editReducers,
    setTodos,
    toggleComplitedReducers,
    toggleSelectedItemReducers,
    sortIncTodoListReducers,
    sortDecsTodoListReducers,
    sortIncStatusTodoListReducers,
    sortDecsStatusTodoListReducers
} = TodoSlice.actions;

export default TodoSlice.reducer;