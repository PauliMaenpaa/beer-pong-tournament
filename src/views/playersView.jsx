import { useState } from "react";
import { CircleX, CircleArrowRight, CirclePlus } from "lucide-react";

function PlayersView({ players, addPlayer, removePlayer, nextStep }) {
  const [playerNameInput, setPlayerNameInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerNameInput.trim() === "") return;
    addPlayer(playerNameInput);
    setPlayerNameInput("");
  };

  return (
    // h-full ja max-w-4xl pitävät näkymän ryhdikkäänä ja keskellä ruutua
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between p-4 h-full overflow-hidden">
      {/* YLÄOSA: Otsikko ja lomake pysyvät visusti paikoillaan */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-200">
          Start by picking up the tournament contestants, and generating teams
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4"
        >
          <input
            type="text"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
            placeholder="Enter player name"
            className="px-4 py-3 rounded-lg bg-[#1a2233] border border-gray-600 focus:outline-none focus:border-blue-500 text-white text-lg transition"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold uppercase transition flex justify-center items-center shadow-lg"
          >
            <CirclePlus size={24} className="mr-2" />
            Add
          </button>
        </form>
      </div>

      {/* KESKIOSA: Pelaajalista täyttää vapaan tilan, mutta ei laajene yli rajojen */}
      <div className="flex-1 my-6 flex flex-col min-h-0">
        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2 tracking-widest">
          Players ({players.length})
        </h3>

        {/* overflow-y-auto ja min-h-0 hoitavat sen, että skrollaus tapahtuu vain tämän laatikon sisällä */}
        <div className="flex-1 overflow-y-auto pr-1">
          {players.length === 0 ? (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-700 rounded-xl py-12">
              <p className="text-gray-500 italic">No players added yet.</p>
            </div>
          ) : (
            <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {players.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between bg-[#1a2233] p-4 rounded-md shadow-sm border border-transparent hover:border-gray-700 transition"
                >
                  <span className="text-lg font-medium truncate mr-2">
                    {p.name}
                  </span>
                  <button
                    onClick={() => removePlayer(p.id)}
                    className="hover:scale-110 transition-transform p-1 shrink-0"
                  >
                    <CircleX
                      size={24}
                      className="text-red-500 opacity-80 hover:opacity-100"
                      strokeWidth={2}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ALAOSA: Navigointi lukittuna pohjalle */}
      <div className="shrink-0 pt-2 border-t border-slate-800">
        <button
          className="w-full p-4 flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={nextStep}
          disabled={players.length < 2}
        >
          Team Generation
          <CircleArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default PlayersView;
