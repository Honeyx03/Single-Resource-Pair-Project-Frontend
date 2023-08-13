import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/GameNew.css";

const API = process.env.REACT_APP_API_URL;

export default function GameNew() {
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
      .post(`${API}/games`, newGame)
      .then((response) => {
        setGame(response.data);
        navigate("/games");
        window.location.reload();
      })
      .catch((e) => console.error(e));
  };
  //instead of useEffect we are have the addGame fxn that will let the user make a POST request that will send the form data to our server(backend). once the request is complete, the page will navigate to the index page that will show their new game was added.

  const handleTextChange = (e) => {
    setGame({ ...game, [e.target.id]: e.target.value });
    console.log(e.target.value);
  };

  const handleCheckboxChange = () => {
    setGame({ ...game, cards_required: !game.cards_required });
    console.log(game);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(game);
    addGame(game);
    //Call the addGame function with the game data and not "newGame" because the form data is stored in the "game" state variable, not "newGame." So, when we want to call the addGame function, we should pass the game data as an argument, not newGame.
  };

  return (
    <div className="NewAll">
      <h1> Add New Add </h1>
      <form onSubmit={handleSubmit}>
        <div className="form_items">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={game.name}
            type="text"
            onChange={handleTextChange}
            placeholder="Name of game"
            required
          />
        </div>
        <div className="form_items">
          <label htmlFor="players">Players:</label>
          <input
            id="players"
            value={game.players}
            type="text"
            onChange={handleTextChange}
            placeholder="Number of players?"
            required
          />
        </div>
        <div className="form_items">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            value={game.category}
            type="text"
            onChange={handleTextChange}
            placeholder="Game category"
            required
          />
        </div>
        <div className="form_items">
          <label htmlFor="cards_required">Cards Required?</label>
          <input
            id="cards_required"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={game.cards_required}
          />
        </div>
        <div className="form_items">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={game.instructions}
            type="text"
            placeholder="Instructions"
            onChange={handleTextChange}
            required
          />
        </div>
        <br />
        <div className="form_items buttons" >
          <input className="submit" type="submit" />
       
        <button className="new">
          <Link to="/games">Nevermind!</Link>
        </button>
        </div>
      </form>
    </div>
  );
}
