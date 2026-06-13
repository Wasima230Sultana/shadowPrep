import React from 'react';
import robotImg from "../assets/robot.png";
import voiceImg from "../assets/voice.png";
import feedbackImg from "../assets/feedback.png";
import progressImg from "../assets/progress.png";


const WhyChoose = () => {


    const features = [
        {
            image: robotImg,
            title: "AI Mock Interviews",
            description: "Practice with an AI interviewer that adapts to your skill level."
        },
        {
            image: feedbackImg,
            title: "Instant Feedback",
            description: "Receive detailed feedback on answers, confidence, and clarity."
        },
        {
            image: voiceImg,
            title: "Voice Analysis",
            description: "Improve speaking pace, pronunciation, and communication."
        },
        {
            image: progressImg,
            title: "Track Progress",
            description: "Monitor performance and identify areas for improvement."
        }
    ];
    return (
        <div className="bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white py-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-3">
                Why Choose <span className="text-[#8b5cf6]">ShadowPrep?</span>
            </h2>

            <p className="text-gray-300 text-center max-w-2xl mx-auto">
                Master interviews with AI-powered practice, personalized feedback,
                and real-time performance tracking.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center border-t border-white/10 pt-10">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        data-aos="fade-right"
                        data-aos-delay={index * 100}
                        className="p-6 border border-white/20 rounded-xl
bg-white/10 backdrop-blur-md
hover:bg-white/15 hover:-translate-y-2
hover:shadow-2xl hover:shadow-purple-500/20
transition-all duration-300
">
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-16 h-16 mx-auto mb-4"
                        />

                        <h3 className="text-xl font-semibold text-center mb-2">
                            {feature.title}
                        </h3>

                        <p className="text-gray-300 text-center">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
                <div>
                    <h3 className="text-3xl font-bold text-purple-400">10K+</h3>
                    <p className="text-gray-400 text-sm">Interviews Practiced</p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold text-purple-400">20+</h3>
                    <p className="text-gray-400 text-sm">Career Categories</p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold text-purple-400">95%</h3>
                    <p className="text-gray-400 text-sm">User Satisfaction</p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold text-purple-400">24/7</h3>
                    <p className="text-gray-400 text-sm">AI Support</p>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;