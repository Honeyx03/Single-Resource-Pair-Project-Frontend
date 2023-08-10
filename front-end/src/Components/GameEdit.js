import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function GameEdit() {
    let { index } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({
        name: "",
        players: "",
        category: "",
        cards_required: false,
        instructions: "",
    });

    useEffect(() => {
        axios
        .get(`${API}/games/${index}`)
        .then((response) => {
            setGame(response.data);
        })
        .catch((e) => console.error(e));
    }, [index]);
    //everytime the index changes the useEffect will be triggered - it will fetch the games data from the api.

    const handleTextChange = (e) =>{
        setGame({ ...game, [e.target.id]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setGame({ ...game, cards_required: !game.cards_required });
    };

    const editGames = () => {
    //the code below adds the functionality to set a PUT request and update our API. It allows the user return to the show page of the item they updated.
        axios
        .put(`${API}/games/${index}`, game)
        .then((response) => {
            setGame(response.data);
            navigate(`/games/${index}`);
        })
        .catch((c) => console.warn("catch", c))
    }
    //editGames fxn doesn't need to take any parameters unlike addGames fxn b/c the editGames fxn is using the games state variable, which already holds data unlike the addGames fxn where the data is being created by the user. Thus, there is no data until the user adds it.

    //the PUT in axios.put is making a PUT request that represents data that will be sent to the server. game data will be sent to the server via the request body. 
    //the 2nd argument in the PUT request (games in this case) will be sent to the server when the user submits the edit form to update the game catalog

    const handleSubmit = (e) => {
        e.preventDefault();
        editGames();
    }

    return (
        <div className="Edit">
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
            <Link to={`/games/${index}`}>
                <button>Nevermind!</button>
            </Link>
        </div>
    );
}