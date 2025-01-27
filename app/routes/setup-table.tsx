import { useState } from 'react';
import { Form, redirect } from 'react-router';
import { addNewTable } from '~/data/database.server';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const playerNames = formData.getAll('players');

  const errors = {};

  if (!playerNames || playerNames.length < 2) {
    errors.players = 'Invalid no. of players. Need at least 2';
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors });
  }

  const players = [];

  for (let index = 0; index < playerNames.length; index++) {
    const name = playerNames[index];
    players.push({ id: index + 1, name: name, score: 0 });
  }

  const sharableKey = await addNewTable({ players });

  return redirect('/table/' + sharableKey);
};

export default function SetupTable({ actionData, loaderData }) {
  const [playersCount, setPlayersCount] = useState(1);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="container mx-auto max-w-2xl space-y-8 rounded-md p-4 shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Setup new game
        </h1>
        <Form method="post" className="space-y-4">
          <div className="flex items-center">
            <h2 className="text-2xl text-gray-800 dark:text-gray-100">
              Add players
            </h2>
            <button
              type="button"
              aria-label="Add new player"
              className="ms-4 rounded-md bg-orange-800 px-2 py-0.5 text-white hover:bg-orange-600"
              onClick={() => setPlayersCount(count => count + 1)}
            >
              +
            </button>
          </div>

          {Array.from({ length: playersCount }, (_, i) => (
            <input
              key={i}
              type="text"
              name="players"
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          ))}

          <button
            type="submit"
            className="inline-block w-full rounded-md bg-orange-800 px-4 py-2 text-center text-white hover:bg-orange-600"
          >
            Begin
          </button>
          {actionData?.errors?.players ? (
            <p className="mt-2 italic text-red-500">
              {actionData?.errors.players}
            </p>
          ) : null}
        </Form>
      </div>
    </div>
  );
}
