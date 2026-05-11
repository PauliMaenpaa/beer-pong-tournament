import { useState } from "react";

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
    <div className="flex flex-col justify-start items-center gap-2">
      <div>
        <p className="text-center">Number of teams</p>
        {[2, 4, 8].map((num) => (
          <button
            key={num}
            onClick={() => setTeamCount(num)}
            className="w-14 h-14 mx-4 my-4 rounded-full border"
          >
            {num}
          </button>
        ))}
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition"
          onClick={() => generateTeams()}
        >
          Generate teams
        </button>
      </div>

      <div>
        <ul className="space-y-3 flex flex-wrap">
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
        <button className="border p-2 flex-1" onClick={testTeamNames}>
          Lock in team names
        </button>
      </div>

      <div className="w-full max-w-md flex justify-start gap-2">
        <button className="p-2 border flex-1" onClick={previousStep}>
          back
        </button>
        <button
          className="p-2 border flex-1"
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
