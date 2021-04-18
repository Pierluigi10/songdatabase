import React, { useState } from "react";
import "./App.css";
import initialiSongs from "./data/songs.json";

function App() {
  const [searchText, setSearchtext] = useState("");
  const [songs, setSongs] = useState(initialiSongs);

  const searchSongs = (userSearchText) => {
    setSearchtext(userSearchText);
  };

  const toggleDescription = (index) => {
    songs[index].showDescription = !songs[index].showDescription;
    setSongs([...songs]);
  };
  return (
    <div className="App">
      <h1>Song Database</h1>
      <div>
        <input type="text" onChange={(e) => searchSongs(e.target.value)} />
      </div>
      <p>
        There are {songs.length} songs and{" "}
        {songs.filter((song) => song.showDescription).length} are showing.
      </p>
      <ul>
        {songs.map((song, index) => {
          return (
            <>
              {(song.author.toLowerCase().includes(searchText.toLowerCase()) ||
                song.name.toLowerCase().includes(searchText.toLowerCase())) && (
                <li>
                  {index}.{" "}
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
    </div>
  );
}

export default App;
