import { Form, redirect } from 'react-router';
import type { Route } from './+types/start-game';
import { AddGameAndWinner, getPlayersById } from '~/data/database.server';

export const loader = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const tableId = searchParams.get('table');
  return { tableId, players: await getPlayersById(tableId) };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const gameName = formData.get('gameName');
  const tableId = formData.get('tableId');

  const winner = formData.get('winner');
  const contestors = formData.getAll('contestor');

  const errors = {};

  if (!gameName || gameName == null) {
    errors.gameName = 'No game name was set';
  }

  if (winner == null) {
    errors.winner = 'Invalid winner. No winner set';
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors, fields: { gameName } });
  }

  var tableKey = '';
  if (winner !== -1) {
    tableKey = await AddGameAndWinner(Number(winner), gameName, tableId);
  } else {
    console.error('failed to find selected winner');
  }

  // var gameType = await getGameTypeByName(gameName);

  // if (!gameType)
  // {
  //   console.log("Save game type");
  //   await addGameType(gameName);
  // }

  return redirect('/table/' + tableKey);
};

export default function StartGame({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { tableId, players } = loaderData;

  return (
    <div
      className={`flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900`}
    >
      <div className="mx-auto max-w-2xl rounded-md p-4 shadow-md">
      <h1 className='text-2xl text-gray-800 dark:text-gray-100 mb-2'>Add results</h1>
        <Form
          method="post"
        >
          <div>
            <input type="hidden" name="tableId" value={tableId} />
            <input
              type="text"
              name="gameName"
              id="gameName"
              placeholder="Name of the game"
              defaultValue={actionData?.fields.gameName}
              className="w-full rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>

          <div className="mt-2">
            {/* Headers */}
            {players.length > 0 && (
              <div className="mb-2 grid grid-cols-3 gap-4 text-lg font-bold">
                <div>Player</div>
                <div className="text-center">Winner</div>
                <div className="text-center">Contestor</div>
              </div>
            )}
            {players.length > 0 &&
              players.map(player => (
                <div
                  key={player.id}
                  className="mb-2 grid grid-cols-3 items-center gap-4 border-b border-gray-200 p-2"
                >
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
              ))}
            <button
              type="submit"
              name="intent"
              value="complete"
              className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:hover:bg-gray-400"
            >
              Complete
            </button>
            {actionData?.errors?.gameName ? (
              <p className="mt-2 italic text-yellow-500">
                {actionData?.errors.gameName}
              </p>
            ) : null}
            {actionData?.errors?.winner ? (
              <p className="mt-2 italic text-red-500">
                {actionData?.errors.winner}
              </p>
            ) : null}
          </div>
        </Form>
      </div>
    </div>
  );
}
