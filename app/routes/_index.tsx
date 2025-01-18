import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { useState } from "react";
import Login from "~/components/login";
import SetupGameWithoutLogin from "~/components/SetupGameWithoutLogin";

export const meta: MetaFunction = () => {
  return [
    { title: "Table for Friends - Play and Compete!" },
    { name: "description", content: "Challenge your friends and climb the leaderboard!" },
  ];
};

export default function Index() {
  // const [gameComplete, setGameComplete] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // const handleCompleteGame = () => {
  //   setGameComplete(true);
  //   setTimeout(() => setGameComplete(false), 5000); // Meddelande visas i 5 sekunder
  // };

  // const handleExport = () => {
  //   const csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     "Position,Name,Score\n" +
  //     players.map((p, index) => `${index + 1},${p.name},${p.score}`).join("\n");

  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "leaderboard.csv");
  //   document.body.appendChild(link);
  //   link.click();
  // };

  return (
    <div className={`flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900`}>
      <header className="flex flex-col items-center gap-6 relative w-full px-6">
        <img
          src="ian-talmacs-hiqD508ZWV0-unsplash.jpg"
          alt="Playful board game and sports theme"
          className="w-64 h-40 rounded-md shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Table for Friends by Friends
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Gather points and compete with your friends! Then we display the result in a table you can share and show your friends.
        </p>
      </header>
      <main>
        <div className="mt-12 w-full px-4">
          <div className="text-center mt-6">
            <text>Either login to your account to manage your table or open a active table by an exported link</text>
          </div>
          <div className="mt-6">
            <Login />
          </div>
          <div className="mt-6">
            <SetupGameWithoutLogin />
          </div>
        </div>

      </main>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Table for Friends</p>
        <a href="https://smallbytes.se/" target="_blank">Made by - Small Bytes</a>
      </footer>
    </div>
  );
}