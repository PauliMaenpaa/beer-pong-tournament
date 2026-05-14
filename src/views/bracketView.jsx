import { CircleArrowRight } from "lucide-react";

function BracketView({ matches, updatePlayerStats, pickWinner }) {
  return (
    /* mx-auto ja max-w-4xl (tai pienempi) pitävät sisällön kasassa */
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 text-white animate-in fade-in duration-500 p-4">
      <h2 className="text-3xl font-bold text-center uppercase tracking-widest text-blue-500">
        Tournament Bracket
      </h2>

      {/* Grid-asettelu, joka pysyy maltillisena myös leveämmällä näytöllä */}
      <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
        {matches.map((match, index) => (
          <div
            key={match.id}
            className="flex flex-col w-full max-w-md mx-auto" /* Rajoitetaan yksittäisen matsin leveyttä */
          >
            {/* Ottelun tunniste */}
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center md:text-left">
              Match {index + 1}
            </div>

            <div className="space-y-6">
              {/* KOTIJOUKKUE */}
              <div className="flex flex-col ">
                <h3 className="border-b border-gray-600 pb-1 mb-3 text-lg font-bold tracking-wide text-blue-400">
                  {match.home.name}
                </h3>
                <div className="space-y-3">
                  {match.home.members.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#1a2233] flex items-center justify-between p-3 rounded-md shadow-sm"
                    >
                      <span className="font-medium text-sm">{p.name}</span>
                      <div className="flex items-center gap-4">
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
                      <span className="font-medium text-sm">{p.name}</span>
                      <div className="flex items-center gap-4 flex-row-reverse">
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

            {/* Voittajapainikkeet pienennettynä */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => pickWinner(match.id, match.home.id)}
                className="flex-1 py-2 text-[11px] font-black uppercase rounded border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition tracking-tighter"
              >
                {match.home.name} Win
              </button>
              <button
                onClick={() => pickWinner(match.id, match.home.id)}
                className={`flex-1 py-2 text-[11px] font-black uppercase rounded border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition tracking-tighter`}
              >
                {match.away.name} Win
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nappi seuraavalle kierrokselle */}
      <div>
        <button
          className="w-full p-4 flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={matches.some((m) => m.winnerId === null)}
        >
          Next round
          <CircleArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default BracketView;
