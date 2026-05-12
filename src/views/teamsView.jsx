import { useState } from "react";
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
}) {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="flex justify-center gap-8 items-center">
        {[2, 4, 8].map((num) => (
          <button
            key={num}
            onClick={() => setTeamCount(num)}
            className="w-12 h-12 rounded-full border"
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-8 items-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition flex justify-center items-center"
          onClick={() => generateTeams()}
        >
          <CircleCheck />
        </button>
      </div>
      <div>
        <ul className="grid xl:grid-cols-2 md:grid-cols-4 gap-4">
          {teams.map((t) => (
            <li className="p-2 basis-1/4" key={t.id}>
              <input
                type="text"
                className="bg-transparent border-b mb-2"
                value={t.name}
                onChange={(e) => updateTeamName(t.id, e.target.value)}
              />
              <span>
                {t.members.map((p) => (
                  <span
                    className=" bg-slate-800 flex justify-start my-2 p-2 rounded"
                    key={p.id}
                  >
                    <div className="flex-2">{p.name}</div>
                    <div className="flex-1 ml-4">{p.score}</div>
                    <div className="flex-1 ml-4">{p.blocks}</div>
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-md flex justify-start">
        <button
          className="p-2 flex-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded font-medium transition"
          onClick={testTeamNames}
        >
          Lock in team names
        </button>
      </div>

      <div className="w-full max-w-md flex justify-start gap-2">
        <button
          className="p-2 border flex-1 p-2 flex-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded font-medium transition"
          onClick={previousStep}
        >
          back
        </button>
        <button
          className="p-2 border flex-1 p-2 flex-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded font-medium transition"
          onClick={startTournament}
          disabled={players.length < 2}
        >
          Start tournament
        </button>
      </div>
    </div>
  );
}

export default TeamsView;
