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
                [question.id]: transcript,
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

    return (
        <div>
            <button
                className="btn btn-primary"
                disabled={isListening}
                onClick={startListening}
            >
                🎤 Start Recording
            </button>

            <button
                className="btn btn-error"
                disabled={!isListening}
                onClick={stopListening}
            >
                ⏹ Stop Recording
            </button>
            <div className="mt-4">
                <p className="font-semibold">Voice Transcript</p>

                <div className="border rounded-lg p-3 min-h-20">
                    {question?.id
                        ? (answers?.[question.id] || "Start speaking...")
                        : "No question selected"}
                </div>
            </div>

            {isListening && <p>Listening...</p>}
        </div>
    );
};

export default VoiceRecorder;