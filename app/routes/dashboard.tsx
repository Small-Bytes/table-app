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
    <div className={`${darkMode ? "dark" : ""} flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900`}>
      <header className="flex flex-col items-center gap-6 relative w-full px-6">
        <h1>Welcome</h1>
      </header>
    </div>
  );
}
