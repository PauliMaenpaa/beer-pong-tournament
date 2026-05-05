import { useState } from "react";
import "./styles.css"

function App() {
  const [players, setPlayers] = useState([]); // Lista pelaajista
  const [player, setPlayer] = useState(""); // Input kentän tila

  const addPlayer = (e) => {
    e.preventDefault(); // Estetään sivun uudelleenlataus
    if (player.trim() === "") return; // Ei lisätä tyhjää nimeä

    setPlayers([...players, player]);
    setPlayer(""); // Tyhjennetään kenttä
  };

  const removePlayer = (indexToRemove) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove));
    // ? mitä tuo alaviiva tekee?
  };

  return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center ">
        <h1 className=" text-2xl font-bold mb-6">Beer Pong Tournament</h1>

        {/* Lomake pelaajan lisäämiseen */}
        <form onSubmit={addPlayer} className="flex gap-2 mb-8">
          <input
              type="text"
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Enter player name"
              className="px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition"
          >
            Add Player
          </button>
        </form>

        {/* Pelaajalista */}
        <div className="w-full max-w-md">
          <ul className="space-y-3">
            {players.map((name, index) => (
                <li
                    key={index}
                    className="flex justify-between items-center bg-slate-800 p-3 rounded shadow-sm"
                >
                  <span>{name}</span>
                  <button
                      onClick={() => removePlayer(index)}
                      className="text-red-400 hover:text-red-600 text-sm font-semibold uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </li>
            ))}
          </ul>

          {players.length === 0 && (
              <p className="text-slate-500 text-center">No players added yet.</p>
          )}
        </div>
      </div>
  );
}

export default App;