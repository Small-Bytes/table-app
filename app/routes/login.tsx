import { Form, useActionData, redirect } from 'react-router';
import { validateLogin } from '~/data/login.server';


// Action för att hantera inloggning
export let action = async ({ request }) => {
  let formData = await request.formData();
  let username = formData.get("username");
  let password = formData.get("password");

  try {
    // Kontrollera inloggningen
    let user = await validateLogin(username, password);

    if (!user) {
      // Skicka tillbaka felmeddelande
      return { error: "Invalid username or password" };
    }

    // Omdirigera användaren om inloggning lyckas (byt "/dashboard" till din destination)
    return redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again later." };
  }
};

// Login-komponenten
export default function Login() {
  let actionData = useActionData(); // För att få eventuella felmeddelanden från `action`

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md rounded-lg p-6 shadow-md bg-white">
        <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>
        {/* Felmeddelande */}
        {actionData?.error && (
          <p className="mb-4 text-red-600 text-center">{actionData.error}</p>
        )}
        <Form method="post">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="text mb-4 block w-full rounded-md border border-gray-300 p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="mb-4 block w-full rounded-md border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="inline-block w-full rounded-md bg-orange-800 px-4 py-2 text-center text-white transition-colors hover:bg-orange-600"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}