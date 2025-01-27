import { Link, Form, useLoaderData } from "react-router";
import { getRecentGames, getAllResults, getFavoriteGames } from "../data/dashboard.server";
// import { Bar } from "react-chartjs-2";

// Laddar data för dashboard
export const loader = async ({ request }) => {
  const user = { username: "Robert" }; // Mockad användare
  const recentGames = await getRecentGames(user.username);
  const results = await getAllResults();
  const favoriteGames = await getFavoriteGames(user.username);
  return { user, recentGames, results, favoriteGames };
};

export default function Dashboard() {
  const { user, recentGames, results, favoriteGames } = useLoaderData();

  // Data för grafer
  const chartData = {
    labels: results.map((player) => player.nickname),
    datasets: [
      {
        label: "Total Wins",
        data: results.map((player) => player.totalWins),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Total Games",
        data: results.map((player) => player.totalGames),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-orange-800 text-white shadow-md">
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
        <nav className="flex gap-4">
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/games" className="hover:underline">
            Games
          </Link>
          <Form method="post" action="/logout">
            <button type="submit" className="hover:underline">
              Log Out
            </button>
          </Form>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow p-6">
        {/* Senaste matcher */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Recent Games</h2>
          <div className="flex flex-col gap-4 overflow-y-scroll max-h-48">
            {recentGames.length > 0 ? (
              recentGames.map((game, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                  <p>
                    <strong>Game:</strong> {game.gameName} ({game.typeOfGame})
                  </p>
                  <p>
                    <strong>Opponent:</strong> {game.opponentNickname}
                  </p>
                  <p>
                    <strong>Result:</strong>{" "}
                    {game.isWinner ? "You won! 🎉" : "You lost 😞"}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(game.playedAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No recent games found.</p>
            )}
          </div>
        </section>

        {/* Grafer för statistik */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Your Statistics</h2>
          <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            {/* <Bar data={chartData} /> */}
          </div>
        </section>

        {/* Favoritspel */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Favorite Games</h2>
          <div className="flex flex-wrap gap-4">
            {favoriteGames.length > 0 ? (
              favoriteGames.map((game, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                  <p>
                    <strong>Game:</strong> {game.gameName} ({game.typeOfGame})
                  </p>
                  <p>
                    <strong>Total Played:</strong> {game.totalPlayed}
                  </p>
                </div>
              ))
            ) : (
              <p>No favorite games found.</p>
            )}
          </div>
        </section>

        {/* Resultattabell */}
        <section>
          <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border px-4 py-2">Player</th>
                  <th className="border px-4 py-2">Games Played</th>
                  <th className="border px-4 py-2">Wins</th>
                  <th className="border px-4 py-2">Win Percentage</th>
                </tr>
              </thead>
              <tbody>
                {results.map((player, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } dark:bg-gray-800 dark:text-white`}
                  >
                    <td className="border px-4 py-2">{player.nickname}</td>
                    <td className="border px-4 py-2 text-center">
                      {player.totalGames}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {player.totalWins}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {player.winPercentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
