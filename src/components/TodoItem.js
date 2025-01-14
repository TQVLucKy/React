import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, TableCell, TableRow, TextField, Typography, Box } from '@mui/material';
import { Edit, Save, Delete, Info } from '@mui/icons-material';

const TodoItem = ({ item, categoryId, index, toggleComplited, toggleSelectedItem, deleteItem, edit, save }) => {
    const getComplitedText = () => {
        switch (item.complited) {
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

    const [newText, setNewText] = useState(item.text);

    return (
        <TableRow key={item.id}>
            <TableCell>
                <Checkbox
                    checked={item.selected}
                    onChange={() => toggleSelectedItem(item.id, categoryId)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                />
            </TableCell>
            <TableCell>
                {item.isEdit ? (
                    <TextField
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                ) : (
                    <Typography variant="body1" sx={{ fontSize: 16,
                                                      overflow:'hidden',
                                                      whiteSpace:'nowrap',
                                                      textOverflow:'ellipsis',
                                                      maxWidth:'250px'
                     }}>
                        {item.text}
                    </Typography>
                )}
            </TableCell>
            <TableCell>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => toggleComplited(index, categoryId)}
                    sx={{
                        textTransform: "none",
                        minWidth: "120px",
                        "&:hover": { backgroundColor: "#1976d2", color: "white" }
                    }}>
                    {getComplitedText()}
                </Button>
            </TableCell>
            <TableCell>
                <Box display="flex" gap={1} justifyContent="center" alignItems="center">
                    {item.isEdit ? (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => save(item.id, newText, categoryId)}
                            sx={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                "&:hover": { backgroundColor: "#388e3c" }
                            }}
                            disabled={newText.trim() === ''}
                        >
                            <Save />
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => edit(item.id, categoryId)}
                            sx={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                "&:hover": { backgroundColor: "#1976d2" }
                            }}
                        >
                            <Edit />
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteItem(item.id, categoryId)}
                        sx={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#d32f2f" }
                        }}
                    >
                        <Delete />
                    </Button>
                    <Link to={`/TodoList/${categoryId}/${item.id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="info" sx={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#0288d1" }
                        }}>
                            <Info />
                        </Button>
                    </Link>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default TodoItem;
