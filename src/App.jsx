import { useState } from "react";
import "./styles.css";
import PlayersView from "./views/playersView.jsx"; // Korjattu nimi isolla alkukirjaimella

function App() {
  // Pelaajien tila siirretty tänne, jotta generateTeams voi käyttää sitä
  const [players, setPlayers] = useState([]);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState([]);
  const [step, setStep] = useState(1);

  // Funktiot pelaajien hallintaan siirretty tänne
  const addPlayer = (playerName) => {
    const newPlayer = {
      id: Date.now(),
      name: playerName,
      score: 0,
      blocks: 0,
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (idToRemove) => {
    setPlayers(players.filter((p) => p.id !== idToRemove));
  };

  const generateTeams = () => {
    const shuffledTeams = [...players].sort(() => Math.random() - 0.5);
    const newTeams = []; // Muutettu nimi, jotta ei sekoitu tilaan

    for (let i = 0; i < teamCount; i++) {
      newTeams.push({
        id: i,
        name: `Team ${String.fromCharCode(65 + i)}`,
        members: [],
      });
    }

    shuffledTeams.forEach((player, index) => {
      const targetTeamIndex = index % teamCount;
      newTeams[targetTeamIndex].members.push(player);
    });

    setTeams(newTeams);
  };

  const updateTeamName = (id, newName) => {
    const updatedTeams = teams.map((t) =>
      t.id === id ? { ...t, name: newName } : t,
    );
    setTeams(updatedTeams);
  };

  const testTeamNames = () => {
    teams.map((t) => console.log(t.name));
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center ">
      {step === 1 && (
        <PlayersView
          players={players}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}
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
          onClick={() => generateTeams()}
        >
          Test team generation
        </button>

        <div>
          <ul className="space-y-3">
            {teams.map((t) => (
              <li className="p-2" key={t.id}>
                <input
                  type="text"
                  className="bg-transparent border-b mb-2"
                  value={t.name}
                  onChange={(e) => updateTeamName(t.id, e.target.value)}
                />
                <span>
                  {t.members.map((p) => (
                    <span
                      className=" bg-slate-800 flex justify-start my-2 p-2 rounded"
                      key={p.id}
                    >
                      <div className="flex-2">{p.name}</div>
                      <div className="flex-1 ml-4">{p.score}</div>
                      <div className="flex-1 ml-4">{p.blocks}</div>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button className="border-2 mt-4 p-2" onClick={testTeamNames}>
          Test team names
        </button>
      </div>
    </div>
  );
}

export default App;
