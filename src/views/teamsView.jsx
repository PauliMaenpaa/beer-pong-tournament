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
    <div className="flex flex-col gap-8 text-white p-4">
      {/* Yläosan numerovalinnat */}
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
          className="bg-blue-600 hover:bg-blue-700 w-14 h-14 rounded-full transition flex justify-center items-center shadow-lg"
          onClick={() => generateTeams()}
        >
          <CircleCheck size={28} />
        </button>
      </div>

      {/* Tiimikortit eriteltynä omiin osioihinsa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {teams.map((t) => (
          <div key={t.id} className="flex flex-col">
            {/* Tiimin nimi syötekenttänä, tyylitelty kuvasi mukaan */}
            <input
              type="text"
              className="bg-transparent border-b border-gray-500 focus:border-blue-500 outline-none mb-4 pb-1 text-lg font-medium tracking-wide"
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
                  <div className="flex-1 font-medium">{p.name}</div>
                  <div className="flex gap-8 px-4 text-gray-300">
                    <span className="w-4 text-center">{p.score}</span>
                    <span className="w-4 text-center">{p.blocks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Alaosan painikkeet */}
      <div className="space-y-4 mt-4">
        <button
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition shadow-md"
          onClick={testTeamNames}
        >
          Lock in team names
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition"
            onClick={previousStep}
          >
            back
          </button>
          <button
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold uppercase tracking-wider transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={startTournament}
            disabled={players.length < 2}
          >
            Start tournament
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamsView;
