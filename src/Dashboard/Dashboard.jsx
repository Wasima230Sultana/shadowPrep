
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInterviews = async () => {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/api/interviews/${user.uid}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch interview history"
                    );
                }

                const data = await response.json();

                setInterviews(data);
            } catch (error) {
                console.error(
                    "Dashboard fetch error:",
                    error
                );

                setError(
                    "Failed to load your interview history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, [user]);

    // -----------------------------
    // Loading
    // -----------------------------

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // -----------------------------
    // Not logged in
    // -----------------------------

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-3">
                        Please login first
                    </h2>

                    <Link
                        to="/login"
                        className="btn btn-primary"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    // -----------------------------
    // Statistics
    // -----------------------------

    const totalInterviews = interviews.length;

    const averageScore =
        totalInterviews > 0
            ? Math.round(
                  interviews.reduce(
                      (sum, interview) =>
                          sum +
                          (interview.percentage || 0),
                      0
                  ) / totalInterviews
              )
            : 0;

    const bestScore =
        totalInterviews > 0
            ? Math.max(
                  ...interviews.map(
                      (interview) =>
                          interview.percentage || 0
                  )
              )
            : 0;

    const categoriesPracticed =
        new Set(
            interviews.map(
                (interview) =>
                    interview.categoryId
            )
        ).size;

    // -----------------------------
    // Format date
    // -----------------------------

    const formatDate = (date) => {
        if (!date) return "Unknown date";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 md:px-8 py-8">

            {/* Header */}

            <div className="max-w-7xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Interview Dashboard
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Track your interview practice and performance.
                    </p>

                </div>

                {/* Error */}

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                {/* Statistics */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

                    {/* Total Interviews */}

                    <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

                        <p className="text-slate-400 text-sm">
                            Total Interviews
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {totalInterviews}
                        </h2>

                    </div>

                    {/* Average Score */}

                    <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

                        <p className="text-slate-400 text-sm">
                            Average Score
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {averageScore}%
                        </h2>

                    </div>

                    {/* Best Score */}

                    <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

                        <p className="text-slate-400 text-sm">
                            Best Score
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {bestScore}%
                        </h2>

                    </div>

                    {/* Categories */}

                    <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

                        <p className="text-slate-400 text-sm">
                            Categories Practiced
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {categoriesPracticed}
                        </h2>

                    </div>

                </div>

                {/* Interview History */}

                <div className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">

                    <div className="p-6 border-b border-white/10">

                        <h2 className="text-2xl font-bold">
                            Interview History
                        </h2>

                        <p className="text-slate-400 text-sm mt-1">
                            Your previous interview attempts
                        </p>

                    </div>

                    {/* No interviews */}

                    {interviews.length === 0 ? (
                        <div className="p-10 text-center">

                            <h3 className="text-xl font-semibold mb-2">
                                No interviews yet
                            </h3>

                            <p className="text-slate-400 mb-5">
                                Start your first interview to see
                                your results here.
                            </p>

                            <Link
                                to="/topics"
                                className="btn btn-primary"
                            >
                                Start Interview
                            </Link>

                        </div>
                    ) : (

                        <div className="overflow-x-auto">

                            <table className="table w-full">

                                <thead>

                                    <tr className="text-slate-400">

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Score
                                        </th>

                                        <th>
                                            Questions
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {interviews.map(
                                        (interview, index) => {

                                            const score =
                                                interview.percentage ||
                                                0;

                                            return (
                                                <tr
                                                    key={
                                                        interview._id ||
                                                        interview.interviewId ||
                                                        index
                                                    }
                                                    className="hover:bg-white/5"
                                                >

                                                    <td>

                                                        <div>
                                                            <p className="font-semibold">
                                                                {
                                                                    interview.categoryName
                                                                }
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                Category ID:{" "}
                                                                {
                                                                    interview.categoryId
                                                                }
                                                            </p>
                                                        </div>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`font-bold ${
                                                                score >=
                                                                80
                                                                    ? "text-green-400"
                                                                    : score >=
                                                                      60
                                                                    ? "text-yellow-400"
                                                                    : "text-red-400"
                                                            }`}
                                                        >
                                                            {score}%
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span>
                                                            {
                                                                interview.answered ||
                                                                0
                                                            }
                                                            /
                                                            {
                                                                interview.totalQuestions ||
                                                                0
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="text-slate-400">

                                                        {formatDate(
                                                            interview.createdAt
                                                        )}

                                                    </td>

                                                    <td>

                                                        <Link
                                                            to={`/interview-result/${interview._id}`}
                                                            className="btn btn-sm btn-outline btn-primary"
                                                        >
                                                            View
                                                        </Link>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;

