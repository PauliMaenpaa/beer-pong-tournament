import { CircleCheck } from "lucide-react";

function TeamsView({
  players,
  setTeamCount,
  teams,
  previousStep,
  nextStep,
  startTournament,
  generateTeams,
  updateTeamName,
  testTeamNames,
  teamCount, // Oletan että tämä tila on käytössä valitun numeron korottamiseen
}) {
  return (
    /* h-full ja overflow-hidden pitävät näkymän täysin yhden ruudun sisällä */
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between p-4 h-full overflow-hidden">
      {/* YLÄOSA: Otsikko, numerovalinnat ja arpointi pysyvät paikoillaan */}
      <div className="flex flex-col gap-4 shrink-0 mb-2">
        <h2 className="text-lg font-semibold text-gray-200">
          Select how many teams you want to generate. You can change team names
          after generation.
        </h2>

        <div className="flex justify-center gap-6 items-center">
          {[2, 4, 8].map((num) => (
            <button
              key={num}
              onClick={() => setTeamCount(num)}
              className={`w-14 h-14 rounded-full border-2 transition-all flex justify-center items-center text-lg font-semibold
              ${teamCount === num ? "border-blue-500 bg-blue-600" : "border-gray-500 hover:border-gray-300"}`}
            >
              {num}
            </button>
          ))}
          <button
            className="bg-blue-600 hover:bg-blue-700 w-14 h-14 rounded-full transition flex justify-center items-center shadow-lg shrink-0"
            onClick={() => generateTeams()}
          >
            <CircleCheck size={28} />
          </button>
        </div>
      </div>

      {/* KESKIOSA: Tiimikortit omassa skrollaavassa laatikossaan */}
      <div className="flex-1 overflow-y-auto pr-1 my-4 min-h-0">
        {teams.length === 0 ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-700 rounded-xl py-12">
            <p className="text-gray-500 italic">
              Click the check button to generate teams.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {teams.map((t) => (
              <div key={t.id} className="flex flex-col">
                {/* Tiimin nimi syötekenttänä */}
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-500 focus:border-blue-500 outline-none mb-4 pb-1 text-lg font-medium tracking-wide text-white"
                  value={t.name}
                  onChange={(e) => updateTeamName(t.id, e.target.value)}
                />

                {/* Jäsenlista kortteina */}
                <div className="space-y-3">
                  {t.members.map((p) => (
                    <div
                      className="bg-[#1a2233] flex items-center justify-between p-3 rounded-md shadow-sm"
                      key={p.id}
                    >
                      <div className="flex-1 font-medium truncate mr-2">
                        {p.name}
                      </div>
                      <div className="flex gap-8 px-4 text-gray-400 shrink-0 text-xs font-mono">
                        <span className="w-8 text-right">PTS: {p.score}</span>
                        <span className="w-8 text-right">BLK: {p.blocks}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALAOSA: Toiminnot ja navigointi aina lukittuna pohjalle */}
      <div className="space-y-4 shrink-0 pt-2 border-t border-slate-800">
        <button
          className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold uppercase tracking-wider transition shadow-md text-sm"
          onClick={testTeamNames}
        >
          Log team names (Test)
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold uppercase tracking-wider transition text-sm"
            onClick={previousStep}
          >
            Back
          </button>
          <button
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg"
            onClick={startTournament}
            disabled={teams.length === 0 || players.length < 2}
          >
            Start tournament
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamsView;
