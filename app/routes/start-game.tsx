import { Form, redirect, useFetcher } from "react-router"
import { AddPoints, players } from "../data/table";
import type { Route } from "./+types/start-game";

export function clientLoader () : Route.ClientLoaderArgs {
  return Response.json(players);
}

export const clientAction = async ({ request }) : Route.ActionArgs => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const newGame = formData.get("newGame");

  console.log("Intent " + intent);
  console.log("NewGame " + newGame);
  if (intent == 'start-game')
  {
    console.log("returns add player");
    return { setPoints: true }
  }

  console.log("returns null");
  const point = formData.getAll("point");
  const contestors = formData.getAll("contestor");
  console.log("point " + point);
  console.log("contestors " + contestors);

  const index = point.findIndex(item => item === '1');

if (index !== -1) {
  // Step 2: Retrieve value from onepoint using the found index
  const value = contestors[index];
  AddPoints(index + 1, 10);
} else {
  console.log('point 1 not found in the array');
}

return redirect('/');
}

export default function StartGame({
  actionData,
  loaderData
}: Route.ComponentProps) {
    const fetcher = useFetcher();

    const setPoints = fetcher?.data?.setPoints;

    return (
    <div>
        <fetcher.Form method="post" className="space-y-6" key='test'>
        <h1>Start new game</h1>
        <div>
        <label
            htmlFor="newGame"
            className="mb-1 block text-sm font-medium"
          >
            Name of the game
          </label>
          <input
            type="text"
            name="newGame"
            id="newGame"
            className="w-full rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
          <button
            type="submit"
            name="intent"
            value="start-game"
            className="inline-flex justify-center mt-2 rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={(e) => {
              if (
                !confirm("Är du säker på namnet?")
              ) {
                e.preventDefault();
              }
            }}
          >Start</button>
          </div>
          </fetcher.Form>
          <Form method="post">
            <div className="mt-2">
      {setPoints && loaderData.length > 0 && (loaderData.map((ld) => (
        <div key={ld.id}>
          <p>{ld.name}</p>

          <input
          type="number"
          name={`point`}
          id={`${ld.id}point`}
          placeholder="0"
          min="0" max={loaderData.length}
          className="rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />

          <input 
          type="checkbox" 
          className="ml-4"
          name="contestor"
          value={ld.id}
          defaultChecked
          />
          </div>
      )))}
      <button
        type="submit"
        name="intent"
        value="complete"
        className="inline-flex justify-center rounded-md border mt-2 border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >Complete</button>
      </div>
        </Form>

        </div>
        
    )
}