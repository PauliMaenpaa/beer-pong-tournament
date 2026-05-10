import { useState } from "react";

// Komponentin nimen on oltava isolla alkukirjaimella, jotta React tunnistaa sen (PlayersView)
function PlayersView({
  players,
  addPlayer,
  removePlayer,
  nextStep,
  previousStep,
}) {
  const [playerNameInput, setPlayerNameInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerNameInput.trim() === "") return;

    // Kutsutaan App.jsx:stä tullutta funktiota
    addPlayer(playerNameInput);
    setPlayerNameInput("");
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold mb-6">Beer Pong Tournament</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={playerNameInput}
          onChange={(e) => setPlayerNameInput(e.target.value)}
          placeholder="Enter player name"
          className="px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition"
        >
          Add Player
        </button>
      </form>

      <div className="w-full max-w-md">
        <ul className="space-y-3">
          {players.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center bg-slate-800 p-3 rounded shadow-sm"
            >
              <span>{p.name}</span>
              <button
                onClick={() => removePlayer(p.id)}
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

      <div className="w-full max-w-md flex justify-between">
        <button className="p-2 border" onClick={previousStep}>
          Previous step
        </button>
        <button
          className="p-2 border"
          onClick={nextStep}
          disabled={players.length < 2}
        >
          Next step
        </button>
      </div>
    </div>
  );
}

export default PlayersView;
