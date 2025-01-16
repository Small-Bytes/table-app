import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { useState } from "react";

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

  return (
    <div>
      <header className="bg-blue-800 text-white text-center py-4">
        <h1>Welcome to Table for friends by friends</h1>
      </header>

      <main className="flex justify-center items-center bg-gray-100 py-12">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Login</h2>
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
            <Link
              to="/dashboard"
              className="w-full inline-block bg-blue-800 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </Link>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Table for Friends</p>
        <a href="https://smallbytes.se/" target="_blank">Made by Small Bytes</a>
      </footer>
    </div>
  );
}
