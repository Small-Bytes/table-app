import { useState } from "react";
import { Form, redirect } from "react-router";
import { addNewTable } from "~/data/database.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const playerNames = formData.getAll("players");

  const errors = {};

  if (!playerNames || playerNames.length < 2) {
    errors.players = "Invalid no. of players. Need at least 2";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors });
  }

  var players = [];

  for (let index = 0; index < playerNames.length; index++) {
    const name = playerNames[index];
    players.push({ id: index+1, name: name, score: 0});
  }

  var sharableKey = await addNewTable({ players });
   console.log("sharablekey is " + sharableKey);
  //return redirect('/table/' + sharableKey);
  return redirect('/table/' + sharableKey);
}

export default function SetupTable ({
  actionData,
  loaderData
}) {
const [playersCount, setPlayersCount] = useState(1);

  return (
<div className="max-w-2xl mx-auto p-4 rounded-md shadow-md">
  <h2>Setup new game</h2>
  <Form method='post'>
  <h3>Add players</h3>
  <fieldset>
    <legend>Players</legend>
    {Array.from({ length: playersCount }, (_, i) => (
      <input
        key={i}
        type="text"
        name="players"
        placeholder='Name'
        className="w-full rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
        />
    ))}
      <button
        type="button"
        aria-label="Add new player"
        onClick={() =>
        setPlayersCount((count) => count + 1)
        }
        >
        +
      </button>
  </fieldset>
  <button type="submit">Begin</button>
  {actionData?.errors?.players ? (
          <p className="mt-2 italic text-red-500">{actionData?.errors.players}</p>
        ) : null}
  </Form>
</div>)
}