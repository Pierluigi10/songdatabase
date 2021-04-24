import React, { useState } from "react";
import "./App.css";
import initialSongs from "./data/songs.json";
import { Switch, Route, Link } from "react-router-dom";
import About from "./components/about";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { SiDiscogs } from "react-icons/si";

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
          <h1 className="title">
            <BsMusicNoteBeamed className="iconMusic" /> Song Database
          </h1>
          <div>
            <input
              type="text"
              className="inputBox"
              onChange={(e) => searchSongs(e.target.value)}
            />
          </div>
          <p>
            There are {songs.length} songs and{" "}
            {songs.filter((song) => song.showDescription).length} are showing.
          </p>
          <div className="list">
            {songs.map((song, index) => {
              return (
                <>
                  {(song.author
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                    song.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) && (
                    <div className="wrapper">
                      <div className="iconRecord">
                        <SiDiscogs className="discogs" />
                      </div>
                      <div onClick={() => toggleDescription(index)}>
                        {song.author} - {song.name}
                        {song.showDescription && <div>{song.description}</div>}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
