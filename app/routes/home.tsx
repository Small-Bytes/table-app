import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { useState } from "react";
import { players } from "../data/table";

export const meta: MetaFunction = () => {
  return [
    { title: "Table for Friends - Play and Compete!" },
    { name: "description", content: "Challenge your friends and climb the leaderboard!" },
  ];
};

export default function Index() {
  const [gameComplete, setGameComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleCompleteGame = () => {
    setGameComplete(true);
    setTimeout(() => setGameComplete(false), 5000); // Meddelande visas i 5 sekunder
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Position,Name,Score\n" +
      players.map((p, index) => `${index + 1},${p.name},${p.score}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leaderboard.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filteredPlayers = players
    .map((player, index) => ({ ...player, originalPosition: index + 1 }))
    .filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const maxScore = Math.max(...players.map((p) => p.score));

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900`}>
      <header className="flex flex-col items-center gap-6 relative w-full px-6">
        {/* Uppdaterad bild */}
        <img
          src="https://via.placeholder.com/300x200?text=Board+Game+Fun"
          alt="Playful board game and sports theme"
          className="w-64 h-40 rounded-md shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Table for Friends by Friends
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Gather points and compete with your friends!
        </p>
        <Link
          to="/start-game"
          rel="norefer"
          className="px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500"
        >
          Add results
        </Link>
      </header>

      <div className="mt-12 w-full px-4">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Leaderboard
        </h2>
        <table className="table-auto border-collapse border border-gray-300 w-full max-w-3xl mx-auto text-center shadow-md rounded-lg overflow-hidden">
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
                      ? "bg-cyan-100 dark:bg-cyan-700 font-bold"
                      : player.originalPosition % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">{player.originalPosition}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="border border-gray-300 px-4 py-4 text-gray-500 dark:text-gray-400"
                >
                  No players available. Start a new game to see the leaderboard!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center mt-6">
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Export Leaderboard
          </button>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Table for Friends - Made by</p>
        <a href="https://smallbytes.se/" target="_blank">Small Bytes</a>
      </footer>
    </div>
  );
}
