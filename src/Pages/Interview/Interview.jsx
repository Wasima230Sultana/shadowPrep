import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import VoiceRecorder from "../../VoiceRecorder/VoiceRecorder";
import { AuthContext } from "../../Context/AuthContext";
// import categories from "../../../public/categories.json";
const Interview = () => {
    const { user } = useContext(AuthContext)
    const questions = useLoaderData();

    const QUESTION_TIME = 120;

    const options = [5, 10, 15, 20];

    const [submitted, setSubmitted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedCount, setSelectedCount] = useState(10);
    const [started, setStarted] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [categories, setCategories] = useState([]);
    // Stores the evaluation result of every question
    const [evaluationResults, setEvaluationResults] = useState({});

    useEffect(() => {
        if (!started) return;

        setTimeLeft(QUESTION_TIME);
    }, [currentQuestion, started]);

        useEffect(() => {
    fetch("/categories.json")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((error) => {
            console.error("Category loading error:", error);
        });
}, []);

    if (!questions?.length) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }



    const interviewQuestions = questions.slice(0, selectedCount);
    const question = interviewQuestions[currentQuestion] || {};
     const categoryId = interviewQuestions[0]?.categoryId;

    const category = categories.find(
        (cat) => cat.id === categoryId
    );
    
    // Text-to-speech
    useEffect(() => {
        if (!started || !question?.question) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(question.question);

        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        const timer = setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 150);

        return () => {
            clearTimeout(timer);
            window.speechSynthesis.cancel();
        };
    }, [question?.id, started]);

    const progress =
        ((currentQuestion + 1) / interviewQuestions.length) * 100;

    const answeredCount = Object.values(answers).filter(
        (answer) => answer.trim() !== ""
    ).length;

    const skippedCount = skippedQuestions.length;

    const remainingCount = interviewQuestions.filter((q) => {
        return (
            !answers[q.id]?.trim() &&
            !skippedQuestions.includes(q.id)
        );
    }).length;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = String(timeLeft % 60).padStart(2, "0");

    const totalQuestions = interviewQuestions.length;

    // ---------------------------------------------------------
    // ANSWER CHECKING
    // ---------------------------------------------------------

    

const evaluateAnswerWithAI = async (question, userAnswer) => {
  const response = await fetch(
    "https://shadowprep-server.onrender.com/api/evaluate-answer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.question,
        expectedTopics: question.expectedTopics || [],
        userAnswer,
        maxScore: question.score,
      }),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("AI evaluation failed:", {
      status: response.status,
      response: data,
    });

    throw new Error(
      data.message ||
      data.error ||
      `Evaluation failed with status ${response.status}`
    );
  }

  return data;
};




    // Calculate final score based on actual answer quality
    const calculateFinalScore = (results) => {
        let obtainedScore = 0;
        let maximumScore = 0;

        interviewQuestions.forEach((q) => {
            const result = results[q.id];

            if (result) {
                obtainedScore += result.score;
                maximumScore += result.maxScore;
            }
        });

        if (maximumScore === 0) {
            return 0;
        }

        return Math.round(
            (obtainedScore / maximumScore) * 100
        );
    };

    // ---------------------------------------------------------
    // FINAL SCORE
    // ---------------------------------------------------------

    const finalScore = calculateFinalScore(evaluationResults);

    // ---------------------------------------------------------
    // NAVIGATION
    // ---------------------------------------------------------

    const handleNext = () => {
        window.speechSynthesis.cancel();

        if (currentQuestion < interviewQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        window.speechSynthesis.cancel();

        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    // ---------------------------------------------------------
    // SUBMIT
    // ---------------------------------------------------------

    const handleSubmit = async () => {
        window.speechSynthesis.cancel();

        try {
            const results = {};

            // Evaluate every question using Gemini
            for (const q of interviewQuestions) {
                const userAnswer = answers[q.id] || "";

                if (!userAnswer.trim()) {
                    results[q.id] = {
                        questionId: q.id,
                        score: 0,
                        maxScore: q.score,
                        percentage: 0,
                        status: "Not Answered",
                        feedback: "No answer was provided.",
                        matchedTopics: [],
                        missingTopics: q.expectedTopics || [],
                    };

                    continue;
                }

                const result = await evaluateAnswerWithAI(
                    q,
                    userAnswer
                );

                results[q.id] = {
                    questionId: q.id,
                    question: q.question,
                    userAnswer,
                    ...result,
                };
            }

            // Calculate total score
            let totalScore = 0;
            let maxScore = 0;

            interviewQuestions.forEach((q) => {
                const result = results[q.id];

                totalScore += result.score || 0;
                maxScore += result.maxScore || q.score || 0;
            });

            const percentage =
                maxScore > 0
                    ? Math.round(
                        (totalScore / maxScore) * 100
                    )
                    : 0;

            // Convert results object into array
            const answerResults =
                interviewQuestions.map((q) => ({
                    questionId: q.id,
                    question: q.question,
                    userAnswer: answers[q.id] || "",

                    score: results[q.id]?.score || 0,

                    maxScore:
                        results[q.id]?.maxScore ||
                        q.score ||
                        0,

                    percentage:
                        results[q.id]?.percentage || 0,

                    status:
                        results[q.id]?.status ||
                        "Not Answered",

                    feedback:
                        results[q.id]?.feedback ||
                        "No answer was provided.",

                    matchedTopics:
                        results[q.id]?.matchedTopics || [],

                    missingTopics:
                        results[q.id]?.missingTopics || [],
                }));

            // Save COMPLETE interview to MongoDB
            const saveResponse = await fetch(
                "https://shadowprep-server.onrender.com/api/interviews",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        userId: user.uid,

                        categoryId: category?.id,

                        categoryName: category?.title,

                        totalQuestions:
                            interviewQuestions.length,

                        answered: answeredCount,

                        skipped: skippedCount,

                        totalScore,

                        maxScore,

                        percentage,

                        answers: answerResults,
                    }),
                }
            );

            if (!saveResponse.ok) {
                throw new Error(
                    "Failed to save interview"
                );
            }

            const savedInterview =
                await saveResponse.json();

            console.log(
                "Interview saved:",
                savedInterview
            );

            // Store results for result page
            setEvaluationResults(results);

            setSubmitted(true);

        } catch (error) {
            console.error(
                "Interview submission error:",
                error
            );

            alert(
                "Something went wrong while submitting the interview."
            );
        }
    };

    // ---------------------------------------------------------
    // SKIP
    // ---------------------------------------------------------

    const handleSkip = () => {
        window.speechSynthesis.cancel();

        const id = question.id;

        if (!skippedQuestions.includes(id)) {
            setSkippedQuestions((prev) => [...prev, id]);
        }

        if (currentQuestion < interviewQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    // ---------------------------------------------------------
    // TIMER
    // ---------------------------------------------------------

    useEffect(() => {
        if (!started) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);

                    setTimeout(() => {
                        handleSkip();
                    }, 0);

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, started]);

    // ---------------------------------------------------------
    // CLEANUP SPEECH
    // ---------------------------------------------------------

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // ---------------------------------------------------------
    // QUESTION STATUS
    // ---------------------------------------------------------

    const getQuestionStatus = (q, index) => {
        if (currentQuestion === index) {
            return "current";
        }

        if (answers[q.id]?.trim()) {
            return "answered";
        }

        if (skippedQuestions.includes(q.id)) {
            return "skipped";
        }

        return "unvisited";
    };

    // =========================================================
    // START INTERVIEW
    // =========================================================

    if (!started) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">

                        <h2 className="text-2xl font-bold">
                            Start Interview
                        </h2>

                        <select
                            className="select select-bordered mt-5"
                            value={selectedCount}
                            onChange={(e) =>
                                setSelectedCount(Number(e.target.value))
                            }
                        >
                            {options.map((count) => (
                                <option
                                    key={count}
                                    value={count}
                                    disabled={count > questions.length}
                                >
                                    {count > questions.length
                                        ? `${count} Questions (Not Available)`
                                        : `${count} Questions`}
                                </option>
                            ))}
                        </select>

                        <button
                            className="btn btn-primary mt-6"
                            onClick={() => {
                                window.speechSynthesis.cancel();

                                setCurrentQuestion(0);
                                setAnswers({});
                                setSkippedQuestions([]);
                                setEvaluationResults({});
                                setTimeLeft(QUESTION_TIME);
                                setSubmitted(false);
                                setStarted(true);
                            }}
                        >
                            Start Interview
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    // =========================================================
    // RESULT PAGE
    // =========================================================

    if (submitted) {
        return (
            <div className="min-h-screen bg-base-200 py-10 px-4">

                <div className="max-w-5xl mx-auto">

                    <div className="card bg-base-100 shadow-2xl">

                        <div className="card-body">

                            <div className="text-center text-6xl mb-4">
                                🏆
                            </div>

                            <h1 className="text-4xl font-bold text-center">
                                Interview Completed
                            </h1>

                            {/* SUMMARY */}
                            <div className="stats stats-vertical lg:stats-horizontal shadow mt-8">

                                <div className="stat">
                                    <div className="stat-title">
                                        Answered
                                    </div>

                                    <div className="stat-value text-success">
                                        {answeredCount}
                                    </div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">
                                        Skipped
                                    </div>

                                    <div className="stat-value text-warning">
                                        {skippedCount}
                                    </div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">
                                        Total
                                    </div>

                                    <div className="stat-value">
                                        {interviewQuestions.length}
                                    </div>
                                </div>

                            </div>

                            {/* FINAL SCORE */}
                            <div className="text-center mt-10">

                                <h2 className="text-6xl font-bold text-primary">
                                    {finalScore}%
                                </h2>

                                <p className="text-lg mt-2">
                                    Answer Quality Score
                                </p>

                            </div>

                            <div className="flex justify-center mt-6">

                                <div
                                    className={`badge badge-lg ${finalScore >= 80
                                        ? "badge-success"
                                        : finalScore >= 50
                                            ? "badge-warning"
                                            : "badge-error"
                                        }`}
                                >
                                    {finalScore >= 80
                                        ? "Excellent"
                                        : finalScore >= 50
                                            ? "Good"
                                            : "Needs Improvement"}
                                </div>

                            </div>

                            {/* QUESTION RESULTS */}
                            <div className="mt-10">

                                <h2 className="text-2xl font-bold mb-5">
                                    Answer Evaluation
                                </h2>

                                <div className="space-y-5">

                                    {interviewQuestions.map((q, index) => {

                                        const result =
                                            evaluationResults[q.id];

                                        const userAnswer =
                                            answers[q.id] || "";

                                        return (
                                            <div
                                                key={q.id}
                                                className="card bg-base-200 shadow"
                                            >

                                                <div className="card-body">

                                                    <div className="flex justify-between gap-4">

                                                        <h3 className="font-bold">
                                                            Question {index + 1}
                                                        </h3>

                                                        {result && (
                                                            <div
                                                                className={`badge ${result.status === "Correct"
                                                                    ? "badge-success"
                                                                    : result.status === "Partially Correct"
                                                                        ? "badge-warning"
                                                                        : "badge-error"
                                                                    }`}
                                                            >
                                                                {result.status}
                                                            </div>
                                                        )}

                                                    </div>

                                                    <p className="font-medium mt-2">
                                                        {q.question}
                                                    </p>

                                                    {/* USER ANSWER */}
                                                    <div className="mt-4">

                                                        <p className="font-semibold">
                                                            Your Answer:
                                                        </p>

                                                        <p className="text-base-content/80 mt-1">
                                                            {userAnswer ||
                                                                "No answer provided."}
                                                        </p>

                                                    </div>

                                                    {/* SCORE */}
                                                    {result && (
                                                        <>
                                                            <div className="mt-4">

                                                                <div className="flex justify-between">

                                                                    <span className="font-semibold">
                                                                        Score
                                                                    </span>

                                                                    <span className="font-bold">
                                                                        {result.score}/
                                                                        {result.maxScore}
                                                                    </span>

                                                                </div>

                                                                <progress
                                                                    className={`progress w-full mt-2 ${result.percentage >= 80
                                                                        ? "progress-success"
                                                                        : result.percentage >= 50
                                                                            ? "progress-warning"
                                                                            : "progress-error"
                                                                        }`}
                                                                    value={result.percentage}
                                                                    max="100"
                                                                />

                                                            </div>

                                                            {/* FEEDBACK */}
                                                            <div className="mt-4">

                                                                <p className="font-semibold">
                                                                    Feedback:
                                                                </p>

                                                                <p className="text-base-content/80 mt-1">
                                                                    {result.feedback}
                                                                </p>

                                                            </div>

                                                            {/* MATCHED TOPICS */}
                                                            {result.matchedTopics.length > 0 && (
                                                                <div className="mt-4">

                                                                    <p className="font-semibold">
                                                                        Covered Topics:
                                                                    </p>

                                                                    <div className="flex flex-wrap gap-2 mt-2">

                                                                        {result.matchedTopics.map(
                                                                            (topic) => (
                                                                                <span
                                                                                    key={topic}
                                                                                    className="badge badge-success"
                                                                                >
                                                                                    ✓ {topic}
                                                                                </span>
                                                                            )
                                                                        )}

                                                                    </div>

                                                                </div>
                                                            )}

                                                            {/* MISSING TOPICS */}
                                                            {result.missingTopics.length > 0 && (
                                                                <div className="mt-4">

                                                                    <p className="font-semibold">
                                                                        Missing Topics:
                                                                    </p>

                                                                    <div className="flex flex-wrap gap-2 mt-2">

                                                                        {result.missingTopics.map(
                                                                            (topic) => (
                                                                                <span
                                                                                    key={topic}
                                                                                    className="badge badge-warning"
                                                                                >
                                                                                    ⚠ {topic}
                                                                                </span>
                                                                            )
                                                                        )}

                                                                    </div>

                                                                </div>
                                                            )}

                                                        </>
                                                    )}

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-center gap-4 mt-10">

                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSubmitted(false);
                                        setStarted(false);
                                        setCurrentQuestion(0);
                                        setAnswers({});
                                        setSkippedQuestions([]);
                                        setEvaluationResults({});
                                        setTimeLeft(QUESTION_TIME);
                                    }}
                                >
                                    Retake Interview
                                </button>

                                <Link
                                    to="/"
                                    className="btn btn-outline"
                                >
                                    Back to Home
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    // =========================================================
    // INTERVIEW PAGE
    // =========================================================

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold">
                        Mock Interview
                    </h1>

                    <p className="text-base-content/70 mt-2">
                        Practice one question at a time.
                    </p>

                </div>

                {/* STATS */}
                <div className="stats shadow">

                    <div className="stat">

                        <div className="stat-title">
                            Answered
                        </div>

                        <div className="stat-value text-success">
                            {answeredCount}
                        </div>

                    </div>

                    <div className="stat">

                        <div className="stat-title">
                            Skipped
                        </div>

                        <div className="stat-value text-warning">
                            {skippedCount}
                        </div>

                    </div>

                    <div className="stat">

                        <div className="stat-title">
                            Remaining
                        </div>

                        <div className="stat-value text-info">
                            {remainingCount}
                        </div>

                    </div>

                </div>

                {/* PROGRESS */}
                <div className="mb-6 mt-6">

                    <div className="flex justify-between mb-2">

                        <span>
                            Question {currentQuestion + 1} of{" "}
                            {interviewQuestions.length}
                        </span>

                        <span>
                            {Math.round(progress)}%
                        </span>

                    </div>

                    <div className="flex justify-end mb-4">

                        <div
                            className={`badge badge-lg ${timeLeft <= 30
                                ? "badge-error"
                                : "badge-primary"
                                }`}
                        >
                            ⏱ {minutes}:{seconds}
                        </div>

                    </div>

                    <progress
                        className="progress progress-primary w-full"
                        value={progress}
                        max="100"
                    />

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* QUESTION */}
                    <div className="lg:col-span-3">

                        <div className="card bg-base-100 shadow-xl">

                            <div className="card-body">

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-2xl font-bold">
                                            Question {currentQuestion + 1}
                                        </h2>

                                        <p className="text-sm opacity-70">
                                            {question.category || "General"}
                                        </p>

                                    </div>

                                    <div
                                        className={`badge badge-primary ${question.difficulty === "Easy"
                                            ? "badge-success"
                                            : question.difficulty === "Medium"
                                                ? "badge-warning"
                                                : "badge-error"
                                            }`}
                                    >
                                        {question.difficulty}
                                    </div>

                                </div>

                                <p className="text-lg mt-6 leading-8">
                                    {question.question}
                                </p>

                                <p className="text-sm text-success">
                                    Answered {answeredCount} /{" "}
                                    {interviewQuestions.length}
                                </p>

                                {/* ANSWER */}
                                <textarea
                                    className="textarea textarea-bordered w-full mt-8 min-h-[180px]"
                                    placeholder="Write your answer here..."
                                    value={answers[question.id] || ""}
                                    onChange={(e) => {

                                        setAnswers((prev) => ({
                                            ...prev,
                                            [question.id]: e.target.value
                                        }));

                                        setSkippedQuestions((prev) =>
                                            prev.filter(
                                                (id) => id !== question.id
                                            )
                                        );

                                    }}
                                />

                                {/* VOICE */}
                                <VoiceRecorder
                                    question={question}
                                    answers={answers}
                                    setAnswers={setAnswers}
                                />

                                {/* BUTTONS */}
                                <div className="flex justify-between mt-8">

                                    <button
                                        className="btn"
                                        disabled={currentQuestion === 0}
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        className="btn btn-warning"
                                        onClick={handleSkip}
                                    >
                                        Skip
                                    </button>

                                    {currentQuestion ===
                                        interviewQuestions.length - 1 ? (

                                        <button
                                            className="btn btn-success"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>

                                    ) : (

                                        <button
                                            className="btn btn-primary"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>

                                    )}

                                </div>

                                {/* COUNTERS */}
                                <div className="flex justify-between text-sm mt-4">

                                    <span className="text-success">
                                        Answered: {answeredCount}
                                    </span>

                                    <span className="text-warning">
                                        Skipped: {skippedCount}
                                    </span>

                                    <span className="text-info">
                                        Remaining: {remainingCount}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* QUESTION PALETTE */}
                    <div className="lg:col-span-1">

                        <div className="card bg-base-100 shadow-xl sticky top-24">

                            <div className="card-body">

                                <div className="flex justify-between items-center">

                                    <h2 className="font-bold text-lg">
                                        Question Palette
                                    </h2>

                                    <span className="badge badge-primary">
                                        {interviewQuestions.length}
                                    </span>

                                </div>

                                <div className="grid grid-cols-5 gap-3 mt-4">

                                    {interviewQuestions.map((q, index) => {

                                        const status =
                                            getQuestionStatus(q, index);

                                        return (

                                            <button
                                                key={q.id}
                                                onClick={() =>
                                                    setCurrentQuestion(index)
                                                }
                                                className={`
                                                    btn
                                                    btn-circle
                                                    ${status === "current"
                                                        ? "ring-2 ring-primary ring-offset-2"
                                                        : ""
                                                    }
                                                    ${status === "answered"
                                                        ? "btn-success"
                                                        : ""
                                                    }
                                                    ${status === "skipped"
                                                        ? "btn-warning"
                                                        : ""
                                                    }
                                                    ${status === "unvisited"
                                                        ? "btn-outline"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                {index + 1}
                                            </button>

                                        );
                                    })}

                                </div>

                                <div className="divider"></div>

                                <div className="space-y-3">

                                    <div className="flex items-center gap-2">

                                        <button className="btn btn-circle btn-success btn-xs"></button>

                                        <span>
                                            Answered
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <button className="btn btn-circle btn-warning btn-xs"></button>

                                        <span>
                                            Skipped
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <button className="btn btn-circle btn-outline btn-xs"></button>

                                        <span>
                                            Not Visited
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Interview;