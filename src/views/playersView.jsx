import { useState } from "react";
import { CircleX, CircleArrowRight, CirclePlus } from "lucide-react";

// Komponentin nimen on oltava isolla alkukirjaimella, jotta React tunnistaa sen (PlayersView)
function PlayersView({ players, addPlayer, removePlayer, nextStep }) {
  const [playerNameInput, setPlayerNameInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerNameInput.trim() === "") return;

    // Kutsutaan App.jsx:stä tullutta funktiota
    addPlayer(playerNameInput);
    setPlayerNameInput("");
  };

  return (
    <div className="grid gap-8 grid-cols-1">
      <h1 className=" text-2xl font-bold">Beer Pong Tournament</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={playerNameInput}
          onChange={(e) => setPlayerNameInput(e.target.value)}
          placeholder="Enter player name"
          className="px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 rounded font-medium transition flex justify-center items-center"
        >
          <CirclePlus />
        </button>
      </form>

      <div>
        <ul className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          {players.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between bg-slate-800 p-2 rounded"
            >
              <span>{p.name}</span>
              <CircleX
                onClick={() => removePlayer(p.id)}
                size={24}
                color="red"
                strokeWidth={2}
              />
            </li>
          ))}
        </ul>

        {players.length === 0 && (
          <p className="text-slate-500 text-center">No players added yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1">
        <button
          className="p-2 flex justify-between items-center gap-4 bg-blue-600 hover:bg-blue-700 px-4 rounded font-medium transition"
          onClick={nextStep}
          disabled={players.length < 2}
        >
          Team Generation
          <CircleArrowRight />
        </button>
      </div>
    </div>
  );
}

export default PlayersView;
