function BracketView({ matches, updatePlayerStats }) {
  return (
    <div className="w-full max-w-4xl animate-in fade-in duration-500">
      <h2 className="text-xl font-bold mb-8 text-center uppercase tracking-widest text-blue-400">
        Tournament Bracket - Round 1
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {matches.map((match, index) => (
          <div
            key={match.id}
            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl"
          >
            {/* Ottelun otsikko */}
            <div className="bg-slate-700 p-2 text-center text-xs font-bold uppercase tracking-tighter text-slate-300">
              Match {index + 1}
            </div>

            <div className="p-4 space-y-6">
              {/* KOTIJOUKKUE (Home) */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-blue-400 uppercase tracking-tight">
                  {match.home.name}
                </h3>
                {match.home.members.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg"
                  >
                    <span className="font-medium text-sm">{p.name}</span>
                    <div className="flex items-center gap-4">
                      {/* Pisteet */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">
                          PTS: {p.score}
                        </span>
                        <button
                          onClick={() =>
                            updatePlayerStats(match.home.id, p.id, "score")
                          }
                          className="bg-green-600 hover:bg-green-500 w-6 h-6 rounded flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                      {/* Torjunnat */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">
                          BLK: {p.blocks}
                        </span>
                        <button
                          onClick={() =>
                            updatePlayerStats(match.home.id, p.id, "blocks")
                          }
                          className="bg-blue-600 hover:bg-blue-500 w-6 h-6 rounded flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center py-2">
                <span className="text-slate-600 font-black italic text-xl">
                  VS
                </span>
              </div>

              {/* VIERASJOUKKUE (Away) */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-red-500 uppercase tracking-tight text-right">
                  {match.away.name}
                </h3>
                {match.away.members.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg flex-row-reverse"
                  >
                    <span className="font-medium text-sm text-right">
                      {p.name}
                    </span>
                    <div className="flex items-center gap-4 flex-row-reverse">
                      {/* Pisteet */}
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <span className="text-xs text-slate-400 text-right">
                          PTS: {p.score}
                        </span>
                        <button
                          onClick={() =>
                            updatePlayerStats(match.away.id, p.id, "score")
                          }
                          className="bg-green-600 hover:bg-green-500 w-6 h-6 rounded flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                      {/* Torjunnat */}
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <span className="text-xs text-slate-400 text-right">
                          BLK: {p.blocks}
                        </span>
                        <button
                          onClick={() =>
                            updatePlayerStats(match.away.id, p.id, "blocks")
                          }
                          className="bg-blue-600 hover:bg-blue-500 w-6 h-6 rounded flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voittajan valinta */}
            <div className="p-4 border-t border-slate-700 bg-slate-900/30 flex gap-2">
              <button className="flex-1 py-2 text-xs font-bold uppercase rounded border border-blue-500 hover:bg-blue-500 transition">
                {match.home.name} Won
              </button>
              <button className="flex-1 py-2 text-xs font-bold uppercase rounded border border-red-500 hover:bg-red-500 transition">
                {match.away.name} Won
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BracketView;
