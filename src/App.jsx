import { useState } from "react";
import "./styles.css";
import PlayersView from "./views/playersView.jsx"; // Korjattu nimi isolla alkukirjaimella
import TeamsView from "./views/teamsView.jsx";

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
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      {step === 1 && (
        <PlayersView
          players={players}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 2 && (
        <TeamsView
          players={players}
          teamCount={teamCount}
          teams={teams}
          nextStep={nextStep}
          previousStep={previousStep}
          generateTeams={generateTeams}
          testTeamNames={testTeamNames}
          setTeamCount={setTeamCount}
          updateTeamName={updateTeamName}
        />
      )}
    </div>
  );
}

export default App;
