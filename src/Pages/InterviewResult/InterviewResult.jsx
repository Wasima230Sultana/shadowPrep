import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const InterviewResult = () => {
    const { id } = useParams();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/interviews/result/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch interview result"
                    );
                }

                const data = await response.json();

                setInterview(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Failed to load interview result."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error || !interview) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        {error || "Interview not found"}
                    </h2>

                    <Link
                        to="/dashboard"
                        className="btn btn-primary"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 md:px-8 py-8">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <Link
                        to="/dashboard"
                        className="text-primary hover:underline"
                    >
                        ← Back to Dashboard
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold mt-5">
                        {interview.categoryName}
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Interview Result
                    </p>

                </div>

                {/* Summary */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm">
                            Score
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {interview.totalScore}/
                            {interview.maxScore}
                        </h2>
                    </div>

                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm">
                            Percentage
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {interview.percentage}%
                        </h2>
                    </div>

                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm">
                            Answered
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {interview.answered}
                        </h2>
                    </div>

                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm">
                            Skipped
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {interview.skipped}
                        </h2>
                    </div>

                </div>

                {/* Questions */}

                <div className="space-y-6">

                    {interview.answers?.map(
                        (answer, index) => {

                            const score =
                                answer.score || 0;

                            const maxScore =
                                answer.maxScore || 0;

                            return (
                                <div
                                    key={
                                        answer.questionId ||
                                        index
                                    }
                                    className="bg-slate-900 border border-white/10 rounded-2xl p-6"
                                >

                                    {/* Question */}

                                    <div className="flex justify-between gap-4 mb-5">

                                        <h2 className="text-lg md:text-xl font-semibold">
                                            Q{index + 1}.{" "}
                                            {
                                                answer.question
                                            }
                                        </h2>

                                        <span
                                            className={`badge ${
                                                answer.status ===
                                                "Correct"
                                                    ? "badge-success"
                                                    : answer.status ===
                                                      "Partially Correct"
                                                    ? "badge-warning"
                                                    : "badge-error"
                                            }`}
                                        >
                                            {
                                                answer.status
                                            }
                                        </span>

                                    </div>

                                    {/* User Answer */}

                                    <div className="mb-5">

                                        <h3 className="text-sm text-slate-400 mb-2">
                                            Your Answer
                                        </h3>

                                        <div className="bg-slate-800 rounded-xl p-4">
                                            {answer.userAnswer ? (
                                                <p className="whitespace-pre-wrap">
                                                    {
                                                        answer.userAnswer
                                                    }
                                                </p>
                                            ) : (
                                                <p className="text-slate-500">
                                                    No answer
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    {/* Score */}

                                    <div className="mb-5">

                                        <h3 className="text-sm text-slate-400 mb-2">
                                            Score
                                        </h3>

                                        <p className="text-xl font-bold">
                                            {score}/
                                            {maxScore}
                                        </p>

                                    </div>

                                    {/* Feedback */}

                                    <div className="mb-5">

                                        <h3 className="text-sm text-slate-400 mb-2">
                                            AI Feedback
                                        </h3>

                                        <div className="bg-slate-800 rounded-xl p-4">
                                            {
                                                answer.feedback ||
                                                "No feedback available."
                                            }
                                        </div>

                                    </div>

                                    {/* Matched Topics */}

                                    {answer.matchedTopics
                                        ?.length >
                                        0 && (
                                        <div className="mb-4">

                                            <h3 className="text-sm text-slate-400 mb-2">
                                                Matched Topics
                                            </h3>

                                            <div className="flex flex-wrap gap-2">

                                                {answer.matchedTopics.map(
                                                    (
                                                        topic,
                                                        topicIndex
                                                    ) => (
                                                        <span
                                                            key={
                                                                topicIndex
                                                            }
                                                            className="badge badge-success badge-outline"
                                                        >
                                                            {
                                                                topic
                                                            }
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>
                                    )}

                                    {/* Missing Topics */}

                                    {answer.missingTopics
                                        ?.length >
                                        0 && (
                                        <div>

                                            <h3 className="text-sm text-slate-400 mb-2">
                                                Missing Topics
                                            </h3>

                                            <div className="flex flex-wrap gap-2">

                                                {answer.missingTopics.map(
                                                    (
                                                        topic,
                                                        topicIndex
                                                    ) => (
                                                        <span
                                                            key={
                                                                topicIndex
                                                            }
                                                            className="badge badge-error badge-outline"
                                                        >
                                                            {
                                                                topic
                                                            }
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>
                                    )}

                                </div>
                            );
                        }
                    )}

                </div>

            </div>

        </div>
    );
};

export default InterviewResult;

