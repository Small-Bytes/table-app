import { Link } from "react-router";

export default function SetupGameWithoutLogin() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-6 shadow-md">
        <h3 className="mb-2">Setup table without login</h3>
        <small>
          Start by setting up which players should join the competition and we
          will generare a uniqiue link for you that can be used to share to the
          other players. Everyone with the link will be able to add new results
          to the table. For more control, use the login option
        </small>
        <div className="mt-2">
          <Link
            className="flex items-center gap-2 py-2 text-gray-300 hover:text-gray-100"
            to="setup-table"
          >
            <span>Continue without login</span>
            <svg
              className="h-4 w-4 text-orange-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
