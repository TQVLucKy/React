import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function LinkList() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2, backgroundColor: "#00796b" }}>
            <Button component={Link} to="/" variant="text" color="inherit" sx={{ margin: 1 }}>
                Home
            </Button>
            <Button component={Link} to="/About" variant="text" color="inherit" sx={{ margin: 1 }}>
                About
            </Button>
            <Button component={Link} to="/TodoList" variant="text" color="inherit" sx={{ margin: 1 }}>
                To do List
            </Button>
            <Button component={Link} to="/BookPage" variant="text" color="inherit" sx={{ margin: 1 }}>
                BookPage
            </Button>
            <Button component={Link} to="/ImagePage" variant="text" color="inherit" sx={{ margin: 1 }}>
                ImagePage
            </Button>
        </Box>
    );
}
