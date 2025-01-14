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
    <div>
      <header className="bg-blue-800 text-white text-center py-4">
        <h1>Välkommen till Team Divider</h1>
      </header>

      <main className="flex justify-center items-center bg-gray-100 py-12">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Logga in</h2>
          <form>
            <input
              type="text"
              placeholder="Användarnamn"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Lösenord"
              required
              className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Logga in
            </button>
          </form>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Table for Friends - Made by</p>
        <a href="https://smallbytes.se/" target="_blank">Small Bytes</a>
      </footer>
    </div>
  );
}
