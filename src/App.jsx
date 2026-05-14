import { useState } from "react";
import "./styles.css";
import PlayersView from "./views/playersView.jsx";
import TeamsView from "./views/teamsView.jsx";
import BracketView from "./views/bracketView.jsx";
import Overview from "./views/overview.jsx";

function App() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");
  const [matches, setMatches] = useState([]);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState([]);
  const [step, setStep] = useState(1);

  const advanceToNextRound = () => {
    // 1. Tarkistetaan että kaikki matsit pelattu
    const isAllMatchesFinished =
      matches.length > 0 && matches.every((m) => m.isFinished);

    // 2. Jos ei niin palataan
    if (!isAllMatchesFinished) return;

    // 3. Lista voittajajoukkueiden ID
    const winnerIds = matches.map((m) => m.winnerId);

    // 4.
    const teamsToAdvance = teams.filter((t) => winnerIds.includes(t.id));

    if (teamsToAdvance.length > 0) {
      createMatches(teamsToAdvance);
    }
  };

  const pickWinner = (matchId, teamId) => {
    const updatedMatches = matches.map((match) => {
      return match.id === matchId // 1. jos match.id vastaa annettua matchId
        ? { ...match, winnerId: teamId, isFinished: true } // TRUE: palautetaan uusi päivitetty olio
        : match; // FALSE: palautetaan alkuperäinen olio
    });
    setMatches(updatedMatches);
    console.log(updatedMatches);
  };

  const addPlayer = (playerName) => {
    const newPlayer = {
      id: Date.now(),
      name: playerName,
      score: 0,
      blocks: 0,
    };
    setPlayers([...players, newPlayer]);
  };

  const startTournament = () => {
    createMatches(teams);
    setStep(3);
  };

  // 1. Otetaan nykyiset tiimit
  // 2. Käydään tiimit läpi kaksi kerrallaan
  // 3. Tallennetaan objekti, jossa nämä kaksi tiimiä
  const createMatches = (currentTeams) => {
    const newMatches = [];
    for (let i = 0; i < currentTeams.length; i += 2) {
      if (currentTeams[i + 1]) {
        // Varmistetaan että on pari
        newMatches.push({
          id: Date.now() + i,
          home: currentTeams[i],
          away: currentTeams[i + 1],
          winnerId: null,
          isFinished: false,
        });
      }
    }
    // 4. Päivitetään tila
    setMatches(newMatches);
  };

  // 1. Päivitetään matches-tila
  // 2. Päivitetty tila pitää sisällään pelaajan uudet tilastot
  // 3. Käydään matsit läpi, ja jokaiselle matsille suoritetaan parametrina annettu funktio
  // 4. apufunktiolla päivitetään tiimin jäsenet
  // 5. Jos tiimin id ei ole teamId, niin palataan (ei ole siis päivityksen kohde)
  // 6. Palautetaan muuten sama tiimi, mutta käydään pelaajat läpi
  // 7. jos pelaajan id vastaa playerId, niin päivitetään score/block
  // 8. Palautetaan muuten sama matsi, mutta kusu
  const updatePlayerStats = (teamId, playerId, type) => {
    const updatedMatches = matches.map((match) => {
      // Apufunktio, joka päivittää tiimin jäsenet
      const updateTeam = (team) => {
        if (team.id !== teamId) return team;
        return {
          ...team,
          members: team.members.map((p) =>
            p.id === playerId ? { ...p, [type]: p[type] + 1 } : p,
          ),
        };
      };

      // 9. palautetaan päivitetyt tiimit
      return {
        ...match,
        home: updateTeam(match.home),
        away: updateTeam(match.away),
      };
    });

    // 10. Asetetaan päivitetty matsi tilanhallintaan
    setMatches(updatedMatches);

    // 11. Päivitetään myös teams-tila tilastoja varten. Eli päivitetään molemmat tilanhallinnat
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.map((p) =>
            p.id === playerId ? { ...p, [type]: p[type] + 1 } : p,
          ),
        };
      }
      return team;
    });

    // 12. Päivitetään tilanhallinta
    setTeams(updatedTeams);
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
          startTournament={startTournament}
        />
      )}

      {step === 3 && (
        <BracketView
          matches={matches}
          updatePlayerStats={updatePlayerStats}
          pickWinner={pickWinner}
          advanceToNextRound={advanceToNextRound}
        />
      )}

      <Overview />
    </div>
  );
}

export default App;
