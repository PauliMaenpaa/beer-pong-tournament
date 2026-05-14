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
    <div className="flex flex-col items-center gap-10 text-white p-6 w-full max-w-4xl animate-in fade-in duration-500">
      {/* Otsikko */}
      <h2 className="text-3xl font-bold text-center uppercase tracking-widest text-blue-500">
        Tournament Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* VOITTAJA-OSIO */}
        <div className="flex flex-col items-center justify-center bg-[#1a2233] p-10 rounded-2xl border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(234,179,8,0.1)] relative overflow-hidden">
          {/* Koriste-elementti taustalla */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>

          <p className="text-yellow-500 uppercase tracking-widest text-sm font-bold mb-2">
            Tournament Champion
          </p>
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-black text-white text-center">
            {winnerTeam ? winnerTeam.name : "Finalizing..."}
          </h2>
        </div>

        {/* PISTEPÖRSSIN LISTAUS */}
        <div className="bg-[#1a2233]/50 p-6 rounded-2xl border border-gray-800 shadow-xl">
          <h3 className="text-xl font-bold uppercase tracking-wider text-blue-400 mb-6 border-b border-gray-700 pb-2">
            Top Performers
          </h3>

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
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-bold ${index === 0 ? "text-blue-400" : "text-gray-500"}`}
                  >
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-gray-100">{p.name}</span>
                </div>

                <div className="flex items-center gap-6">
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

                  {/* Pieni breakdown tilastoista */}
                  <div className="hidden sm:flex flex-col text-[10px] text-gray-400 font-medium">
                    <span>{p.score} PTS</span>
                    <span>{p.blocks} BLK</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alaosan painike (jos haluat palata alusta tms.) */}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-bold uppercase tracking-widest transition-all"
      >
        Start New Tournament
      </button>
    </div>
  );
}

export default Overview;
