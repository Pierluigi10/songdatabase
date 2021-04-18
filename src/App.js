import React, { useState } from "react";
import "./App.css";
import songs from "./data/songs.json";

function App() {
  const [searchText, setSearchtext] = useState("");

  const searchSongs = (userSearchText) => {
    setSearchtext(userSearchText);
  };

  const toggleDescription = (song) => {
    console.log(`You clicked ${song.name}`);  //Apostrofi non virgolette!!
  }
  return (
    <div className="App">
      <h1>Song Database</h1>
      <div>
        <input type="text" onChange={((e) => searchSongs(e.target.value))} />
      </div>
      <p>There are {songs.length} songs.</p>
      <ul>
        {songs.map((song) => {

          return (
            <>
              {(song.author.toLowerCase().includes(searchText.toLowerCase()) ||
                song.name.toLowerCase().includes(searchText.toLowerCase())) && (
                <li><span
                  onClick={() => toggleDescription(song)}>{song.author} - {song.name}</span>

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
    </div>
  );
}

export default App;
