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

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex flex-col items-center`}>
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
    </div>
  );
}
