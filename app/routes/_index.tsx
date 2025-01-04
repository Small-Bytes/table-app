import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { players } from "../data/table";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Table for friends by friends
          </h1>
          <Link 
          to='/start-game'
          rel='norefer'
          className="px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 bg-orange-600 text-white hover:bg-orange-700 focus:ring-teal-500"
          >Start new game</Link>
        </header>
        <div>
        <h2 className="text-center mb-4">Leaderboard</h2>
        <table className="table-auto border-collapse border border-gray-300 w-1/2 text-center shadow-md rounded-lg overflow-hidden">
        <thead className="bg-orange-400">
            <tr>
                <th className="border border-gray-300 px-4 py-2">Position</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
        </thead>
        <tbody>
        {players && players.length > 0 && (players.map((player) => (
                    <tr key={player.id} className="hover:bg-orange-100">
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{player.score}</td>
                  </tr>
        )))}
        </tbody>
    </table>
    </div>
      </div>
    </div>
  );
}