import { useState } from "react";
import "./styles.css";

function App() {
  const [players, setPlayers] = useState([]); // Lista pelaajista
  const [player, setPlayer] = useState(""); // Input kentän tila

  const addPlayer = (e) => {
    setPlayers([...players, player]); // Spread operaattorit
    setPlayer("");
  };

  // Palautetaan uusi taulukko, joka sisällä poistettavan indeksin paikall
  // olevaa alkiota, ts. poistetaan haluttu alkio
  const removePlayer = (indexToRemove) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white p-6">
        {/* Tänne luodaan lomake, pelaajalista ja nappi seuraavaan vaiheeseen  */}
      </div>
    </>
  );
}

export default App;
