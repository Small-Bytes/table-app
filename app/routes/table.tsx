import { useLoaderData } from "@remix-run/react"

export function clientLoader() {
  return { header: 'Resultat' }
}

export default function TableData() {
    const loader = useLoaderData();

    return (
    <div>
        <h1>{loader.header}</h1>
        <p>Sist: Kvist har aldrig vunnit något</p>
    </div>)
}