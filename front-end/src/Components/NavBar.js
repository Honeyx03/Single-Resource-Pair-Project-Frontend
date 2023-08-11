import { Link } from "react-router-dom";
import "../CSS/NavBar.css";

export default function NavBar() {
    return (
        <nav>
            <Link to="/games">
                <h1>Game Collection Catalog</h1>
            </Link>
            <button>
                <Link to="/games/new">Log a New Game</Link>
            </button>
        </nav>
    )
}