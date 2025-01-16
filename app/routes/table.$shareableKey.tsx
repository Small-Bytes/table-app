import { useLoaderData } from 'react-router';
import { sql } from '~/db.server';

export const loader = async ({ params }) => {
  if (!params.shareableKey) {
    throw new Response("Not Found", { status: 404 });
  }
  const response = await sql`select * from tableResults`;
  return response[1].data.players;
};

export default function Page() {
  const data = useLoaderData();
  return <>{JSON.stringify(data, null, 2)}</>;
}
