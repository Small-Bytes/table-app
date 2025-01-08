import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useState } from "react";
import { players } from "../data/table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Table for Friends - Play and Compete!" },
    { name: "description", content: "Challenge your friends and climb the leaderboard!" },
  ];
};

export default function Index() {
  const [gameComplete, setGameComplete] = useState(false);

  const handleCompleteGame = () => {
    setGameComplete(true);
    setTimeout(() => setGameComplete(false), 5000); // Meddelande visas i 5 sekunder
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <header className="flex flex-col items-center gap-6">
        <img
          src="https://via.placeholder.com/150x150?text=Game+Logo"
          alt="Game Logo"
          className="w-32 h-32 rounded-full"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Table for Friends by Friends
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Samla poäng och tävla mot dina vänner!
        </p>
        <Link
          to="/start-game"
          rel="norefer"
          className="px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500"
        >
          Start New Game
        </Link>
      </header>

      <div className="mt-12 w-full px-4">
        <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Leaderboard
        </h2>
        <table className="table-auto border-collapse border border-gray-300 w-full max-w-3xl mx-auto text-center shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {players && players.length > 0 ? (
              players.map((player, index) => (
                <tr
                  key={player.id}
                  className={`${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
                  } hover:bg-orange-100 dark:hover:bg-orange-600`}
                >
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
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
            onClick={handleCompleteGame}
            className="px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out bg-green-600 text-white hover:bg-green-700"
          >
            Complete Game
          </button>
        </div>

        {/* Visar meddelande vid spelets slut */}
        {gameComplete && (
          <div className="mt-6 text-center text-lg font-semibold text-green-700">
            Game Completed! 🎉
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Table for Friends - Made with ❤️</p>
      </footer>
    </div>
  );
}
