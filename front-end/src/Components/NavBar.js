import { Link } from "react-router-dom";
import "../CSS/NavBar.css";
import logo from "../logo.svg";

export default function NavBar() {
    return (
        <nav>
            <img src={logo} alt="logo" />
            <Link to="/games">
                <h1 className="logo">Game Collection Catalog</h1>
            </Link>
            <button>
                <Link to="/games/new">Log a New Game</Link>
            </button>
        </nav>
    )
}