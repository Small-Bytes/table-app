import { Link, useLoaderData } from "react-router";
import { getTableBySharableKey } from "~/data/database.server";

export const loader = async ({ params }) => {
  if (!params.shareableKey) {
    throw new Response("Not Found", { status: 404 });
  }

  var table = await getTableBySharableKey(params.shareableKey);

  if (!table) throw new Response("Not Found", { status: 404 });

  return {
    key: table.id,
    players: table.data.players,
    history: table.data.history,
  };
};

export default function Page() {
  const { key, players, history } = useLoaderData();

  const filteredPlayers = players
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, originalPosition: index + 1 }));

  const maxScore = Math.max(...players.map((p) => p.score));

  return (
    <div className={`flex h-full flex-col items-center justify-center`}>
      <header className="flex flex-col items-center gap-6 px-6">
        <img
          src="./../ian-talmacs-hiqD508ZWV0-unsplash.jpg"
          alt="Playful board game and sports theme"
          className="h-40 w-64 rounded-md shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Table for Friends by Friends
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Welcome to your table with friends! Below you can see the leaderboard
          or add new score from a competition
        </p>
        <Link
          to={`/start-game?table=${key}`}
          className="transform rounded-md bg-orange-600 px-6 py-3 font-medium text-white shadow-md transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Add results
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="relative mt-12 flex w-full justify-center">
        {/* Leaderboard Section */}
        <div className="w-full max-w-3xl px-4">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Leaderboard
          </h2>
          <table className="w-full table-auto border-collapse overflow-hidden rounded-lg border border-gray-300 text-center shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers && filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr
                    key={player.id}
                    className={`${
                      player.score === maxScore
                        ? "bg-cyan-100 font-bold dark:bg-cyan-700"
                        : player.originalPosition % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {player.originalPosition}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="border border-gray-300 px-4 py-4 text-gray-500 dark:text-gray-400"
                  >
                    No players available. Start a new game to see the
                    leaderboard!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Sidebar Section */}
        <div className="absolute right-4 top-10 w-80 rounded-lg bg-gray-200 p-4 shadow-lg dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            History
          </h3>
          <ul>
            {history && history.length > 0 ? (
              history.map((h) => <li>{h}</li>)
            ) : (
              <li>No games played</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
