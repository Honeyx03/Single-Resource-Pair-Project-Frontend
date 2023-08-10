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
                                        <Link to={`/games/${game.id}`}>{game.name}</Link>
                                    </td>
                                    <td>{game.players}</td>
                                    <td>{game.category}</td>
                                    <td>
                                    {game.cards_required ? (
                                        <span>cards are required</span>
                                    ): (
                                        <span>no cards required</span>
                                    )}
                                    </td>
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

/* Notes: I experienced a bug where my params were shifting. for example: when clicked on the first game link (in this case UNO). I was getting a "queryresulterror" because index was being mistaken for "id" #. There is no id =0. 

I realized this when I went to "/games/1" and found the UNO object there instead of the Dominos object, which is the 2nd array item at index 1... same for "/games/2" I saw the Dominos object instead of the Pictionary obj. and at "/games/3" I got "page not found error", which confirm that the issue was with the params and index vs id. After a bunch of trial and error I finally came to a resolution when I changed the:

<Link to={`/games/${index}`}> to <Link to={`/games/${game.id}`}>

this worked! Good to know for the future applications.
*/