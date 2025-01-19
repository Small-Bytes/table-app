import { Link } from "react-router";

export default function Login() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            required
            className="text mb-4 block w-full rounded-md border border-gray-300 p-2"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="mb-4 block w-full rounded-md border border-gray-300 p-2"
          />
          <Link
            to="/dashboard"
            className="inline-block w-full rounded-md bg-orange-800 px-4 py-2 text-center text-white transition-colors hover:bg-orange-600"
          >
            Login
          </Link>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
