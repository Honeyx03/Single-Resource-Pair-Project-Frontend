import { useState, useEffect } from "react";
import { Link } from "react-router-dom";//if Link isn't working check the package.json to  make sure the "react-router-dom" is installed if not do npm install react-router-dom;
import axios from "axios";

//BASE URL
const API = process.env.REACT_APP_API_URL;
console.log(API) //log to make sure it works>> it works it shows: http://localhost:3025

export default function Games() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`${API}/games`)
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setGames(response.data);
        })
        .catch((e) => console.error("catch", e));
    }, []);

    return (
        <div className="Games">
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th># of Players</th>
                            <th>Category</th>
                            <th>Are Cards Required?</th>
                            <th>Game Instructions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/games/${index}`}>{game.name}</Link>
                                    </td>
                                    <td>{game.players}</td>
                                    <td>{game.category}</td>
                                    <td>{game.cards_required}</td>
                                    <td>{game.instructions}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}