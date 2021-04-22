import React, { useState } from "react";
import "./App.css";
import initialSongs from "./data/songs.json";
import { Switch, Route, Link } from "react-router-dom";
import About from "./components/about";
import { BsMusicNoteBeamed } from "react-icons/bs";

function App() {
  const [searchText, setSearchtext] = useState("");
  const [songs, setSongs] = useState(initialSongs);

  const searchSongs = (userSearchText) => {
    setSearchtext(userSearchText);
  };

  const toggleDescription = (index) => {
    songs[index].showDescription = !songs[index].showDescription;
    setSongs([...songs]);
  };
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <h1>
            <BsMusicNoteBeamed className="iconMusic" /> Song Database
          </h1>
          <div>
            <input type="text" onChange={(e) => searchSongs(e.target.value)} />
          </div>
          <p>
            There are {songs.length} songs and{" "}
            {songs.filter((song) => song.showDescription).length} are showing.
          </p>
          <ul className="list">
            {songs.map((song, index) => {
              return (
                <>
                  {(song.author
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                    song.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) && (
                    <li>
                      <span onClick={() => toggleDescription(index)}>
                        {song.author} - {song.name}
                      </span>
                      {song.showDescription && (
                        <ul>
                          <li>{song.description}</li>
                        </ul>
                      )}
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
