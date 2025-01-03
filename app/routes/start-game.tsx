import { Form, redirect, useActionData, useFetcher, useLoaderData } from "@remix-run/react"

export function clientLoader () {
  return Response.json([
    { id: "1", name: "Seb" },
    { id: "2", name: "Robert" },
    { id: "3", name: "Kvist" },
  ]);
};

export const clientAction = async ({ request }) => {
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
  return redirect('/');
}

export default function StartGame() {
    const loader = useLoaderData();
    const action = useActionData();
    const fetcher = useFetcher();

    var game = { name: '', seb: 0, robert: 0, kvist: 0 };
    
    //var setPoints = action?.setPoints;
    var setPoints = fetcher?.data?.setPoints;

    console.log(action);
    console.log(fetcher);
    console.log("SetP " + setPoints);

    //console.log("loads addplayer " + addPlayer);

    return (
    <div>
        <fetcher.Form method="post" className="space-y-6" key='test'>

        <h1>{loader.header}</h1>
        <div>
        <label
            htmlFor="newGame"
            className="mb-1 block text-sm font-medium"
          >
            Start new game
          </label>
          <input
            type="text"
            name="newGame"
            id="newGame"
            className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
          <button
            type="submit"
            name="intent"
            value="start-game"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={(e) => {
              if (
                !confirm("Är du säker på namnet?")
              ) {
                e.preventDefault();
              }
            }}
          >Start</button>
      {setPoints && loader.length > 0 && (loader.map((ld) => (
        <div key={ld.id}>
          <p>{ld.name}</p>
          <input
          type="number"
          name={`${ld.id}point`}
          id={`${ld.id}point`}
          placeholder="0"
          min="0" max={loader.length}
          className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
          </div>
        // <div>Value</div>
        // <div>
        //   {/* <input
        //   type="text"
        //   name={`${ld.id}point`}
        //   id={`${ld.id}point`}
        //   className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
        //   /> */}
        //   abc
        //  </div>
      )))}
      <br/>
        <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >Complete competition</button>
        </div>
        </fetcher.Form>
    </div>)
}