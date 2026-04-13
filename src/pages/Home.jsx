import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50">
      <h1 className="text-5xl font-bold text-indigo-600">UniConnect</h1>

      <p className="mt-4 text-gray-600 text-lg">
        A peer-learning platform for college students
      </p>

      <div className="mt-8 space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
