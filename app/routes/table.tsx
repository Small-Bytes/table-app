import type { Route } from "./+types/table";

export function clientLoader() : Route.ClientLoaderArgs {
  return { header: 'Resultat' }
}

export default function TableData({
  loaderData,
}: Route.ComponentProps) {

    return (
    <div>
        <h1>{loaderData.header}</h1>
        <p>Sist: Kvist har aldrig vunnit något</p>
    </div>)
}