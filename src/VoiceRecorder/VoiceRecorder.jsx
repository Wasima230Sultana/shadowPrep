import React, { useEffect, useState } from "react";

const VoiceRecorder = ({ question, answers, setAnswers }) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported.");
            return;
        }

        const recognitionInstance = new SpeechRecognition();

        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onresult = (event) => {

    let transcript = "";

    for (let i = 0; i < event.results.length; i++) {

        transcript += event.results[i][0].transcript;

    }

    if (!question?.id) return;

    setAnswers(prev => ({
        ...prev,
        [question.id]: transcript.trim(),
    }));

};

        recognitionInstance.onend = () => {
            setIsListening(false);
        };

        setRecognition(recognitionInstance);

        return () => {
            recognitionInstance.stop();
        };
    }, [question?.id, setAnswers]);

    const startListening = () => {
        if (!recognition || isListening) return;

        recognition.start();
        setIsListening(true);
    };

    const stopListening = () => {
        if (!recognition || !isListening) return;

        recognition.stop();
        setIsListening(false);
    };
const speakQuestion = () => {
    if (!question?.question) return;

    // Stop any speech already playing
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(question.question);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
};
   return (
    <div className="mt-6">

        <div className="flex flex-wrap gap-3">

            <button
                className="btn btn-primary"
                onClick={speakQuestion}
            >
                🔊 Read Question
            </button>

            <button
                className="btn btn-success"
                onClick={startListening}
                disabled={isListening}
            >
                🎤 Start Recording
            </button>

            <button
                className="btn btn-error"
                onClick={stopListening}
                disabled={!isListening}
            >
                ⏹ Stop Recording
            </button>

        </div>

        <div className="mt-5">

            <h3 className="font-semibold">
                Voice Answer
            </h3>

            <div className="border rounded-xl p-4 min-h-28 bg-base-200">

                {answers[question?.id] || "Start speaking..."}

            </div>

        </div>

        {isListening && (

            <div className="mt-3 flex items-center gap-2 text-success">

                <span className="loading loading-spinner loading-sm"></span>

                <span>Listening...</span>

            </div>

        )}

    </div>
);
};

export default VoiceRecorder;