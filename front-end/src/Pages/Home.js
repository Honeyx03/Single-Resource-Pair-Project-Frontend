import { Link } from "react-router-dom";
import image1 from "../Images/image1.jpeg"
import image2 from "../Images/image2.jpeg"
import image3 from "../Images/image3.jpeg"
import image4 from "../Images/image4.jpeg"
import image5 from "../Images/image5.jpeg"
import image6 from "../Images/image6.jpg"
import image7 from "../Images/image7.jpeg";
import "../CSS/Home.css";

export default function Home() {
    return (
        <div className="Home">
            <div>
                <h1>This is a Game Catalog App</h1>
                <h4>View a list of popular games and add yours to the <Link to="/games">collection!</Link></h4>
            </div>
            <div className="image-slider">
                <img src={image1} alt="Connect 4" />
                <img src={image2} alt="Uno" />
                <img src={image3} alt="Monopoly" />
                <img src={image4} alt="Mancala" />
                <img src={image5} alt="Spades" />
                <img src={image6} alt="Chess" />
                <img src={image7} alt="Scrabble" />
            </div>
        </div> 
    );
}