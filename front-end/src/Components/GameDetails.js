import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "../CSS/GameDetails"
import "../CSS/GameDetails.css"

const API = process.env.REACT_APP_API_URL;

export default function GameDetails() {
    const [game, setGame] = useState([]);
    let { index } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/games/${index}`)
        .then((response) => {
            console.log(response.data);
            setGame(response.data);
        })
        .catch(() => {
            navigate('/not-found')
        });
    }, [index, navigate]);

    const handleDelete = () => {
        axios
        .delete(`${API}/games/${game.id}`)
        .then(() => {
         navigate('/games');  
         window.location.reload();
        })
        .catch((e) => console.log(e));
    };

    return (
        <article className="details">
         <div className="card"> 
              <div className="inner">
            <h3>{game.name}</h3>
            <div className="mark">
            <h5>
             {game.players} can play this game
            </h5>
            <h5 >  Game Category: {game.category}</h5>
            <h5 > 
                {game.cards_required}
                {game.cards_required ? (
                    <span>  This game requires cards</span>
                ) : (
                    <span> No cards are required to play this game.</span>
                )}
            </h5>
            <h5 >  Gaming Instructions: {game.instructions}</h5>
            <div className="showNav">
            </div>  
            </div>
            </div>
            </div>    
                <div>
                    <Link to={`/games/`}>
                        <button>Back</button>
                    </Link>
                </div>
                <div>
                    <Link to={`/games/${index}/edit`}>
                        <button>Edit</button>
                    </Link>
                </div>
                <div>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            
        </article>
    );
}