import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function GameNew() {
    let { index } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({
        name: "",
        players: "",
        category: "",
        cards_required: false,
        instructions: "",
    });

    const addGame = (newGame) => {
        axios
        .get(`${API}/games/${index}`)
        .then((response) => {
            setGame(response.data);
        })
        .catch((e) => console.error(e));
    }
    //instead of useEffect we are have the addGame fxn that will let the user make a POST request that will send the form data to our server(backend). once the request is complete, the page will navigate to the index page that will show their new game was added.

    const handleTextChange = (e) =>{
        setGame({ ...game, [e.target.id]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setGame({ ...game, cards_required: !game.cards_required });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addGame(game);
        //Call the addGame function with the game data and not "newGame" because the form data is stored in the "game" state variable, not "newGame." So, when we want to call the addGame function, we should pass the game data as an argument, not newGame.
    }

    return (
        <div className="New">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    value={game.name}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Name of game"
                    required
                />
                <label htmlFor="players">Players:</label>
                <input
                    id="players"
                    value={game.players}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Number of players?"
                    required
                />
                <label htmlFor="category">Category:</label>
                <input 
                    id="category"
                    value={game.category}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Game category"
                    required
                />
                <label htmlFor="cards">Cards Required?</label>
                <input 
                    id="cards"
                    value={game.cards_required}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={game.cards_required}
                    required
                />
                <label htmlFor="instructions">Instructions:</label>
                <textarea 
                    id="instructions"
                    value={game.instructions}
                    type="text"
                    placeholder="Instructions"
                    onChange={handleTextChange}
                    required
                />
                <br />

                <input type="submit" />
            </form>
        </div>
    );
}