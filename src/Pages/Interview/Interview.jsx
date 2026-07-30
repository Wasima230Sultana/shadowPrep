import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import VoiceRecorder from "../../VoiceRecorder/VoiceRecorder";
const Interview = () => {
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

    useEffect(() => {
        if (!started) return;

        setTimeLeft(QUESTION_TIME);
    }, [currentQuestion, started]);

    if (!questions?.length) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    const interviewQuestions = questions.slice(0, selectedCount);
    const question = interviewQuestions[currentQuestion] || {};
    const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100;
    const answeredCount = Object.values(answers).filter(
        answer => answer.trim() !== ""
    ).length;
    const skippedCount = skippedQuestions.length;
    const remainingCount = interviewQuestions.filter((q) => {
        return (
            !answers[q.id]?.trim() &&
            !skippedQuestions.includes(q.id)
        );
    }).length; const minutes = Math.floor(timeLeft / 60);
    const totalQuestions = interviewQuestions.length;

    const score = Math.round(
        (answeredCount / totalQuestions) * 100
    );
    const seconds = String(timeLeft % 60).padStart(2, "0");

    const handleNext = () => {
        if (currentQuestion < interviewQuestions.length - 1) {
            const next = currentQuestion + 1;
            // if (!visitedQuestions.includes(next)) {
            //     setVisitedQuestions(prev => [...prev, next]);
            // }
            setCurrentQuestion(next);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            const prev = currentQuestion - 1;
            setCurrentQuestion(prev);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleSkip = () => {
        const id = question.id;
        if (!skippedQuestions.includes(id)) {
            setSkippedQuestions(prev => [...prev, id]);
        }
        if (currentQuestion < interviewQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

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
                            onChange={(e) => setSelectedCount(Number(e.target.value))}
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
                                setCurrentQuestion(0);
                                setAnswers({});
                                setSkippedQuestions([]);
                                setTimeLeft(QUESTION_TIME);
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
    if (submitted) {
        return (
            <div className="min-h-screen bg-base-200 flex justify-center items-center px-4">

                <div className="card bg-base-100 shadow-2xl w-full max-w-3xl">

                    <div className="card-body">

                        <div className="text-center text-6xl mb-4">
                            🏆
                        </div>

                        <h1 className="text-4xl font-bold text-center">
                            Interview Completed
                        </h1>

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
                                    Remaining
                                </div>

                                <div className="stat-value text-info">
                                    {remainingCount}
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Total</div>

                                <div className="stat-value">
                                    {interviewQuestions.length}
                                </div>
                            </div>

                        </div>

                        <div className="text-center mt-10">

                            <h2 className="text-6xl font-bold text-primary">
                                {score}%
                            </h2>
                            <p className="text-lg mt-2">
                                {answeredCount} of {interviewQuestions.length} questions answered
                            </p>
                            <p className="mt-3">
                                Overall Completion Score
                            </p>

                        </div>

                        <div className="flex justify-center mt-6">

                            <div
                                className={`badge badge-lg ${score >= 80
                                        ? "badge-success"
                                        : score >= 60
                                            ? "badge-warning"
                                            : "badge-error"
                                    }`}
                            >
                                {score >= 80
                                    ? "Excellent"
                                    : score >= 60
                                        ? "Good"
                                        : "Needs Improvement"}
                            </div>

                        </div>

                        <div className="flex justify-center gap-4 mt-8">

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setSubmitted(false);
                                    setStarted(false);
                                    setCurrentQuestion(0);
                                    setAnswers({});
                                    setSkippedQuestions([]);
                                    setTimeLeft(QUESTION_TIME);
                                }}
                            >
                                Retake Interview
                            </button>

                            <Link to="/" className="btn btn-outline">
                                Back to Home
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold">
                        Mock Interview
                    </h1>

                    <p className="text-base-content/70 mt-2">
                        Practice one question at a time.
                    </p>

                </div>
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
                <div className="mb-6">

                    <div className="flex justify-between mb-2">

                        <span>
                            Question {currentQuestion + 1} of {interviewQuestions.length}
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        {/* Question Card */}
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

                                    <div className={`badge badge-primary badge
${question.difficulty === "Easy"
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
                                    Answered {answeredCount} / {interviewQuestions.length}
                                </p>
                                <textarea
                                    className="textarea textarea-bordered w-full mt-8 
                                    min-h-[180px]"
                                    placeholder="Write your answer here..."
                                    value={answers[question.id] || ""}
                                    onChange={(e) => {
                                        setAnswers(prev => ({
                                            ...prev,
                                            [question.id]: e.target.value,
                                        }));

                                        setSkippedQuestions(prev =>
                                            prev.filter(id => id !== question.id)
                                        );
                                    }}
                                />
                               <VoiceRecorder
    question={question}
    answers={answers}
    setAnswers={setAnswers}
/>

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

                                    {
                                        currentQuestion === interviewQuestions.length - 1 ?

                                            <button
                                                className="btn btn-success"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>

                                            :

                                            <button
                                                className="btn btn-primary"
                                                onClick={handleNext}
                                            >
                                                Next
                                            </button>

                                    }

                                </div>
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

                    <div className="lg:col-span-1">
                        {/* Question Palette */}
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

                                        const status = getQuestionStatus(q, index);

                                        return (

                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentQuestion(index)}
                                                className={`
                btn
                btn-circle
                ${status === "current" ? "ring-2 ring-primary ring-offset-2" : ""}
                ${status === "answered" ? "btn-success" : ""}
                ${status === "skipped" ? "btn-warning" : ""}
                ${status === "unvisited" ? "btn-outline" : ""}
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

                                        <span>Answered</span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <button className="btn btn-circle btn-warning btn-xs"></button>

                                        <span>Skipped</span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <button className="btn btn-circle btn-outline btn-xs"></button>

                                        <span>Not Visited</span>

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