import logo from "../src/";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

//COMPONENTS
import NavBar from './Components/NavBar';
import Games from './Components/Games';
import SearchBar from "./Components/SearchBar"; 

//PAGES
import Home from './Pages/Home';
import New from "./Pages/New";
import Index from "./Pages/Index";
import Show from './Pages/Show';
import Edit from './Pages/Edit';
import FourOFour from './Pages/FourOFour';

//BASE URL
const API = process.env.REACT_APP_API_URL;
console.log(API) //log to make sure it works>> it works it shows: http://localhost:3025


function App() {
  const [games, setGames] = useState([]);

  //this useEffect is to retrieve the game data from our backend (server)
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
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games games={games} />} />
          <Route path="/games/new" element={<New />} />
          <Route path='/games/:index' element={<Show />} />
          <Route path="/games/:index/edit" element={<Edit />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
