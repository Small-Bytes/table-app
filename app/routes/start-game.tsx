import { Form, redirect, useActionData, useFetcher, useLoaderData } from "@remix-run/react"
import { AddPoints, players } from "../data/table";

export function clientLoader () {
  return Response.json(players);
};

export const clientAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const newGame = formData.get("newGame");

  if (intent == 'start-game')
  {
    return { gameNameIsSet: true }
  }

  const winner = formData.get("winner");
  const contestors = formData.getAll("contestor");

  const errors = {};

  if (winner == null) {
    errors.winner = "Invalid winner. No winner set";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors });
  }

if (winner !== -1) {
  AddPoints(Number(winner), 10);
} else {
  console.log('point 1 not found in the array');
}

return redirect('/');
}

export default function StartGame() {
    const loader = useLoaderData();
    const actionData = useActionData();
    const fetcher = useFetcher();

    var gameNameIsSet = fetcher?.data?.gameNameIsSet;

    return (
      <div className="max-w-2xl mx-auto p-4 rounded-md shadow-md">
        <fetcher.Form method="post" className="space-y-6" key='test'>
        <h1>Add results</h1>
        <div>
          <input
            type="text"
            name="newGame"
            id="newGame"
            placeholder="Name of the game"
            className="w-full rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
          <button
            type="submit"
            name="intent"
            value="start-game"
            className="inline-flex justify-center mt-2 rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >Start</button>
          </div>
          </fetcher.Form>
          <Form method="post">
            <div className="mt-2">
      {/* Headers */}
      {gameNameIsSet && players.length > 0 && (
      <div className="grid grid-cols-3 gap-4 font-bold text-lg mb-2">
        <div>Player</div>
        <div className="text-center">Winner</div>
        <div className="text-center">Contestor</div>
      </div>
      )}
      {gameNameIsSet && loader.length > 0 && (loader.map((player) => (
        <div key={player.id} className="grid grid-cols-3 gap-4 items-center mb-2 p-2 border-b border-gray-200">
        {/* Player Name */}
        <p className="font-medium">{player.name}</p>

        {/* Winner Radio */}
        <div className="flex justify-center">
          <input
            type="radio"
            name="winner"
            id={`${player.id}-win`}
            value={player.id}
            className="rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* Contestor Checkbox */}
        <div className="flex justify-center">
          <input
            type="checkbox"
            name="contestor"
            value={player.id}
            defaultChecked
            className="rounded-md border-gray-300 focus:ring-teal-600"
          />
        </div>
          </div>
      )))}
      <button
        type="submit"
        name="intent"
        value="complete"
        className="inline-flex justify-center rounded-md border mt-2 border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >Complete</button>
        {actionData?.errors?.winner ? (
          <p className="mt-2 italic text-red-500">{actionData?.errors.winner}</p>
        ) : null}
      </div>
        </Form>

        </div>
        
    )
}