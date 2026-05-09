import { useState } from "react";
import "./styles.css";

function App() {
  // Lista pelaajista
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState(""); // Input kentän tila
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault(); // Estetään sivun uudelleenlataus
    if (player.trim() === "") return; // Ei lisätä tyhjää nimeä

    // Jos nimi ei ole tyhjä, niin luodaan pelaajaobjekti
    const newPlayer = {
      id: Date.now(),
      name: player,
      score: 0,
      blocks: 0,
    };

    // Luodaan pelaajista uusi lista ja lisätään pelaaja listan loppuun
    setPlayers([...players, newPlayer]);
    // Asetetaan kenttä tyhjäksi
    setPlayer(""); // Tyhjennetään kenttä
  };

  const removePlayer = (idToRemove) => {
    setPlayers(players.filter((p) => p.id !== idToRemove));
  };

  const generateTeams = () => {
    // 1. Sekoitetaan pelaajat
    const shuffledTeams = [...players].sort(() => Math.random() - 0.5);

    // 2. Luodaan tyhjät joukkueet
    const teams = [];
    for (let i = 0; i < teamCount; i++) {
      teams.push({
        id: i,
        name: `Team ${String.fromCharCode(65 + i)}`, // A, B, C...
        members: [],
      });
    }

    // 3. Jaetaan pelaajat joukkueisiin
    shuffledTeams.forEach((player, index) => {
      const targetTeamIndex = index % teamCount;
      teams[targetTeamIndex].members.push(player);
    });

    return teams;
  };

  const testTeams = () => {
    const output = generateTeams();

    console.table(output);
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

      <div>
        <p className="text-center">Number of teams</p>
        <div>
          {[2, 4, 8].map((num) => (
            <button
              key={num}
              onClick={() => setTeamCount(num)}
              className="w-14 h-14 mx-4 my-4 rounded-full border-2"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button
          className="w-48 h-14 mx-4 my-4 border-2"
          onClick={() => testTeams()}
        >
          Test team generation
        </button>
      </div>
    </div>
  );
}

export default App;
