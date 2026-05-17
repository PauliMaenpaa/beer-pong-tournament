import { CircleArrowRight } from "lucide-react";

function BracketView({
  matches,
  updatePlayerStats,
  pickWinner,
  advanceToNextRound,
  nextStep,
}) {
  return (
    /* h-full ja overflow-hidden estävät koko sivun ruman skrollauksen */
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between p-4 h-full overflow-hidden">
      {/* YLÄOSA: Otsikko pysyy paikallaan */}
      <div className="shrink-0 mb-4">
        <h2 className="text-3xl font-bold text-center uppercase tracking-widest text-blue-500">
          Tournament Bracket
        </h2>
      </div>

      {/* KESKIOSA: Ottelulista skrollaa itsenäisesti tarvittaessa */}
      <div className="flex-1 overflow-y-auto pr-1 my-2">
        <div
          className={`grid gap-x-12 gap-y-16 ${
            matches.length < 2 ? "md:grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          {matches.map((match, index) => (
            <div key={match.id} className="flex flex-col w-full mx-auto">
              {/* Ottelun tunniste */}
              <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center md:text-left">
                Match {index + 1}
              </div>

              <div className="space-y-6">
                {/* KOTIJOUKKUE */}
                <div className="flex flex-col">
                  <h3 className="border-b border-gray-600 pb-1 mb-3 text-lg font-bold tracking-wide text-blue-400">
                    {match.home.name}
                  </h3>
                  <div className="space-y-3">
                    {match.home.members.map((p) => (
                      <div
                        key={p.id}
                        className="bg-[#1a2233] flex items-center justify-between p-3 rounded-md shadow-sm"
                      >
                        <span className="font-medium text-sm truncate mr-2">
                          {p.name}
                        </span>
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 uppercase">
                              Pts
                            </span>
                            <span className="w-4 text-center font-bold">
                              {p.score}
                            </span>
                            <button
                              onClick={() =>
                                updatePlayerStats(match.home.id, p.id, "score")
                              }
                              className="bg-blue-600 hover:bg-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs transition"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-2 border-l border-gray-700 pl-3">
                            <span className="text-[10px] text-gray-500 uppercase">
                              Blk
                            </span>
                            <span className="w-4 text-center font-bold">
                              {p.blocks}
                            </span>
                            <button
                              onClick={() =>
                                updatePlayerStats(match.home.id, p.id, "blocks")
                              }
                              className="bg-blue-600 hover:bg-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VS-erotin */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-gray-800"></div>
                  <span className="flex-shrink mx-4 text-gray-700 font-black italic text-xs uppercase">
                    VS
                  </span>
                  <div className="flex-grow border-t border-gray-800"></div>
                </div>

                {/* VIERASJOUKKUE */}
                <div className="flex flex-col text-right">
                  <h3 className="border-b border-gray-600 pb-1 mb-3 text-lg font-bold tracking-wide text-red-500">
                    {match.away.name}
                  </h3>
                  <div className="space-y-3">
                    {match.away.members.map((p) => (
                      <div
                        key={p.id}
                        className="bg-[#1a2233] flex items-center justify-between p-3 rounded-md shadow-sm flex-row-reverse"
                      >
                        <span className="font-medium text-sm truncate ml-2">
                          {p.name}
                        </span>
                        <div className="flex items-center gap-4 flex-row-reverse shrink-0">
                          <div className="flex items-center gap-2 flex-row-reverse text-right">
                            <span className="text-[10px] text-gray-500 uppercase">
                              Pts
                            </span>
                            <span className="w-4 text-center font-bold">
                              {p.score}
                            </span>
                            <button
                              onClick={() =>
                                updatePlayerStats(match.away.id, p.id, "score")
                              }
                              className="bg-blue-600 hover:bg-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs transition"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-2 flex-row-reverse border-r border-gray-700 pr-3">
                            <span className="text-[10px] text-gray-500 uppercase">
                              Blk
                            </span>
                            <span className="w-4 text-center font-bold">
                              {p.blocks}
                            </span>
                            <button
                              onClick={() =>
                                updatePlayerStats(match.away.id, p.id, "blocks")
                              }
                              className="bg-blue-600 hover:bg-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Voittajapainikkeet */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => pickWinner(match.id, match.home.id)}
                  className={`flex-1 py-2 text-[11px] font-black uppercase rounded border transition tracking-tighter ${
                    match.winnerId === match.home.id
                      ? "bg-blue-600 text-white border-blue-400"
                      : "border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {match.home.name} Win
                </button>
                <button
                  onClick={() =>
                    pickWinner(match.id, match.away.id)
                  } /* Korjattu match.away.id */
                  className={`flex-1 py-2 text-[11px] font-black uppercase rounded border transition tracking-tighter ${
                    match.winnerId === match.away.id
                      ? "bg-red-600 text-white border-red-400"
                      : "border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  {match.away.name} Win
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALAOSA: Seuraavan kierroksen painike aina lukittuna pohjalle */}
      <div className="shrink-0 pt-2 border-t border-slate-800">
        <button
          onClick={() =>
            matches.length > 1 ? advanceToNextRound() : nextStep()
          }
          className="w-full p-4 flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={matches.some((m) => m.winnerId === null)}
        >
          {matches.length > 1 ? "Next round" : "Finish Tournament"}
          <CircleArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default BracketView;
