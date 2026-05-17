import { Trophy } from "lucide-react";

function Overview({ matches, players, teams }) {
  const finalMatch = matches[matches.length - 1];
  const winnerTeam = teams.find((team) => team.id === finalMatch?.winnerId);

  // Kerätään kaikki pelaajat tiimeistä ja lasketaan tilastot
  const sortedPlayers = teams
    .flatMap((t) => t.members)
    .sort((a, b) => {
      const totalA = a.score + a.blocks;
      const totalB = b.score + b.blocks;
      return totalB - totalA;
    });

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between p-4 h-full overflow-hidden">
      {/* YLÄOSA: Otsikko */}
      <div className="shrink-0 text-center mb-4">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-blue-500">
          Tournament Summary
        </h2>
      </div>

      {/* KESKIOSA: Jaettu kahteen laatikkoon, joista oikea skrollaa */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 my-2">
        {/* VASEN LAATIKKO: Voittaja (pysyy staattisena) */}
        <div className="flex gap-2 flex-col items-center justify-center bg-[#1a2233] p-6 rounded-2xl border-2 border-gray-800 relative overflow-hidden h-full">
          <p className="text-yellow-500 uppercase tracking-widest text-l font-bold mb-2">
            Tournament Champion
          </p>
          <p className="text-lg font-black text-white text-center">
            {winnerTeam ? winnerTeam.name : "Finalizing..."}
          </p>
        </div>

        {/* OIKEA LAATIKKO: Pistepörssi omalla skrollauksellaan */}
        <div className="bg-[#1a2233]/50 p-6 rounded-2xl border border-gray-800 shadow-xl flex flex-col h-full min-h-0">
          <h3 className="text-xl font-bold uppercase tracking-wider text-blue-400 mb-4 border-b border-gray-700 pb-2 shrink-0">
            Top Performers
          </h3>

          {/* Vain tämä lista rullaa jos pelaajia on paljon */}
          <div className="flex-1 overflow-y-auto pr-1">
            <ul className="flex flex-col gap-3">
              {sortedPlayers?.map((p, index) => (
                <li
                  key={p.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    index === 0
                      ? "bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/5"
                      : "bg-[#1a2233] border-transparent hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4 truncate mr-2">
                    <span
                      className={`text-lg font-bold shrink-0 ${index === 0 ? "text-blue-400" : "text-gray-500"}`}
                    >
                      #{index + 1}
                    </span>
                    <span className="font-semibold text-gray-100 truncate">
                      {p.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase text-gray-500 font-bold tracking-tighter">
                        Total Score
                      </span>
                      <span
                        className={`font-mono font-bold ${index === 0 ? "text-blue-400 text-xl" : "text-lg text-white"}`}
                      >
                        {p.score + p.blocks}
                      </span>
                    </div>

                    <div className="hidden sm:flex flex-col text-[10px] text-gray-400 font-medium w-12 text-right">
                      <span>{p.score} PTS</span>
                      <span>{p.blocks} BLK</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ALAOSA: Uusi turnaus -nappi lukittuna pohjalle */}
      <div className="shrink-0 pt-4 border-t border-slate-800">
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-bold uppercase transition flex justify-center items-center shadow-lg tracking-wider"
        >
          Start New Tournament
        </button>
      </div>
    </div>
  );
}

export default Overview;
