import type { MetaFunction } from 'react-router';
import { useState } from 'react';
import Login from '~/components/login';
import SetupGameWithoutLogin from '~/components/SetupGameWithoutLogin';

export const meta: MetaFunction = () => {
  return [
    { title: 'Table for Friends - Play and Compete!' },
    {
      name: 'description',
      content: 'Challenge your friends and climb the leaderboard!',
    },
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
    <div
      className={`flex min-h-screen flex-col items-center justify-between overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900`}
    >
      <header className="relative flex w-full max-w-4xl flex-col items-center gap-6 pt-8">
        <img
          src="ian-talmacs-hiqD508ZWV0-unsplash.jpg"
          alt="Playful board game and sports theme"
          className="h-40 w-64 rounded-md shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Table for Friends by Friends
        </h1>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          Gather points and compete with your friends! <br />
          Then we display the result in a table you can share and show your
          friends.
        </p>
      </header>
      <main className="w-full max-w-4xl flex-grow">
        <div className="mt-8 w-full">
          <div className="text-center">
            <p>
              Either login to your account to manage your table or open a active
              table by an exported link
            </p>
          </div>
          <div className="mt-6">
            <Login />
          </div>
          <div className="mt-6">
            <SetupGameWithoutLogin />
          </div>
        </div>
      </main>
      <footer className="w-full max-w-4xl py-6 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Table for Friends</p>
        <a href="https://smallbytes.se/" rel="noreferrer" target="_blank">
          Made by - Small Bytes
        </a>
      </footer>
    </div>
  );
}
