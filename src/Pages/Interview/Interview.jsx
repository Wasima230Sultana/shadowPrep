

import { useLoaderData } from "react-router";
import { useState } from "react";

const Interview = () => {

    const questions = useLoaderData();
const [visitedQuestions, setVisitedQuestions] = useState([0]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedCount, setSelectedCount] = useState(10);
    const [started, setStarted] = useState(false);
    // const question = questions[currentQuestion];
    const interviewQuestions = questions.slice(0, selectedCount);
const question = interviewQuestions[currentQuestion] || {};
    if (!questions?.length) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
      const options = [5, 10, 15, 20];
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
    const progress =
        ((currentQuestion + 1) / interviewQuestions.length) * 100

   const handleNext = () => {
  if (currentQuestion < interviewQuestions.length - 1) {
    const next = currentQuestion + 1;

    if (!visitedQuestions.includes(next)) {
      setVisitedQuestions((prev) => [...prev, next]);
    }

    setCurrentQuestion(next);
  }
};

 const handlePrevious = () => {
  if (currentQuestion > 0) {
    const prev = currentQuestion - 1;

    if (!visitedQuestions.includes(prev)) {
      setVisitedQuestions((v) => [...v, prev]);
    }

    setCurrentQuestion(prev);
  }
};
const skippedCount = visitedQuestions.filter((index) => {
  const id = interviewQuestions[index]?.id;
  return !answers[id]?.trim();
}).length;
const remainingCount = interviewQuestions.length - answeredCount;
    const handleSubmit = () => {
       console.log("Interview Submitted");

    console.log(answers);
    };
     const answeredCount = Object.values(answers).filter(
            answer => answer.trim() !== ""
        ).length;
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

                <div className="mb-6">

                    <div className="flex justify-between mb-2">

                        <span>
                            Question {currentQuestion + 1} of {interviewQuestions.length}
                        </span>

                        <span>
                            {Math.round(progress)}%
                        </span>

                    </div>

                    <progress
                        className="progress progress-primary w-full"
                        value={progress}
                        max="100"
                    />

                </div>

                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body">
                        <div className="flex justify-between items-center">

                            <h2 className="text-2xl font-bold">

    Question {currentQuestion + 1}

</h2>

                            <div  
                           className= {`badge badge-primary badge
${
question.difficulty==="Easy"
? "badge-success"
: question.difficulty==="Medium"
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

                            className="textarea textarea-bordered w-full mt-8 min-h-[180px]"

                            placeholder="Write your answer here..."

                            value={answers[question.id] || ""}

                            onChange={(e) =>
                                setAnswers(prev => ({
                                    ...prev,
                                    [question.id]: e.target.value,
                                }))
                            }

                        />
                        {/* <div className="flex justify-between mt-8">

                            <button
                                className="btn"
                                disabled={currentQuestion === 0}
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>

                            {
                                currentQuestion === interviewQuestions.length - 1 ?

                                    <button
                                        className="btn btn-success"
                                        onClick={handleSubmit}
                                    >
                                        Submit Interview
                                    </button>

                                    :

                                    <button
                                        className="btn btn-primary"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>

                            }
                            <div>
                                

                            </div>

                        </div> */}
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

        </div>
    );
};

export default Interview;