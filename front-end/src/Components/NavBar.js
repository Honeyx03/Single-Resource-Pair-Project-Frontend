import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <h1>This is the NavBar</h1>
            <button>
                <Link to="/games/new">Log a New Game</Link>
            </button>
        </nav>
    )
}