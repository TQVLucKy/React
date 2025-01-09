import { Link } from "react-router-dom";

export default function LinkList(){
    return(
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/TodoList">To do List</Link></li>
            <li><Link to="/BookPage">BookPage</Link></li>
            <li><Link to="/ImagePage">ImagePage</Link></li>
            </ul>
        </nav>
    )
}