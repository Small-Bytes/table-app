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




  return (
    <div className= 'flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <header className="flex flex-col items-center gap-6 relative w-full px-6">
        <h1>Welcome</h1>
      </header>
    </div>
  );
}
