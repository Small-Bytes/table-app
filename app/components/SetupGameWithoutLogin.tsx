import { Link } from "react-router";

export default function SetupGameWithoutLogin() {


    return (
    <div className="flex items-center justify-center">
        <div className="rounded-lg p-6 w-full max-w-md shadow-md">
        <h3 className="mb-2">Setup table without login</h3>
        <small>Start by setting up which players should join the competition and we will generare a uniqiue link for you that
            can be used to share to the other players. Everyone with the link will be able to add new results to the table. 

            For more control, use the login option
        </small>
        <div className="mt-2">
        <Link
        className="bg-orange-800 text-white text-center rounded-md hover:bg-orange-600"
        to='setup-table'
        >
            
      <svg className="w-6 h-6 bg-orange-800 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path>
</svg>
        </Link>
        </div>
        </div>
    </div>)
}