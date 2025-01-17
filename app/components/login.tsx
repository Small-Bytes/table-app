import { Link } from "react-router";

export default function Login() {
    return (
<div className="flex items-center justify-center">
  <div className="rounded-lg p-6 w-full max-w-md shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form>
              <input
                type="text"
                placeholder="Användarnamn"
                required
                className="block w-full p-2 mb-4 border border-gray-300 rounded-md text"
              />
              <input
                type="password"
                placeholder="Lösenord"
                required
                className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <Link
                to="/dashboard"
                className="w-full inline-block bg-orange-800 text-white text-center py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Login
              </Link>
            </form>
            <div className="text-center mt-4">
              <a href="#" className="hover:underline">Forgot password?</a>
            </div>
          </div>
      </div>
    );
  }