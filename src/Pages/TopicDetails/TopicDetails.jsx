import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FaBookOpen,
  FaLightbulb,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaRocket,
  FaClock,
} from "react-icons/fa";
const TopicDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const topicFiles = {
    1: "frontend.json",
    2: "backend.json",
    3: "fullstack.json",
    4: "mobile.json",
    5: "uiux.json",
    6: "data-analyst.json",
    7: "data-scientist.json",
    8: "ml-engineer.json",
    9: "ai-engineer.json",
    10: "devops.json",
    11: "cloud.json",
    12: "cybersecurity.json",
    13: "qa.json",
    14: "product-manager.json",
    15: "business-analyst.json",
    16: "software-engineer.json",
    17: "java.json",
    18: "python.json",
    19: "database.json",
    20: "flutter.json",
  };
  useEffect(() => {
    const file = topicFiles[id];
    fetch(`/topics/${file}`)
      .then((res) => res.json())
      .then((data) => setTopic(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!topic) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="my-4 max-w-7xl mx-auto px-5 py-10 bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100">
      {/* Hero */}

      <div className=" hero rounded-3xl mb-10 border border-base-300 shadow-xl bg-purple-50 rounded-3xl p-10">
        <div className="hero-content text-center ">
          <div>

            <div className="avatar placeholder mb-5">
              <div className="bg-primary text-primary-content rounded-full w-20">
                <span className="text-6xl justify-center items-center flex mt-3">
                  <FaBookOpen />
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold">{topic.title}</h1>

            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <div className="stats shadow mt-6">

                <div className="stat">
                  <div className="stat-title">Study Time</div>
                  <div className="stat-value text-primary">
                    {topic.studyTime}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Concepts</div>
                  <div className="stat-value">
                    {topic.concepts.length}
                  </div>
                </div>

              </div>
            </div>

            <p className="py-6 max-w-3xl">{topic.overview}</p>
          </div>
        </div>
      </div>

      {/* Concepts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaBookOpen />
          Core Concepts
        </h2>

        {topic.concepts.map((concept, index) => (
          <div
            key={index}
            className="collapse collapse-arrow border border-base-300 bg-purple-50  shadow-md hover:shadow-xl transition duration-300"
          >
            <input type="checkbox" />

            <div className="collapse-title text-xl font-semibold ">
              {concept.title}
            </div>

            <div className="collapse-content">
              <ul className="list-disc ml-6 space-y-2">
                {concept.topics.map((item, i) => (
                  // <li key={i}>{item}</li>
                  <li key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Tips + Checklist */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">

        {/* Tips */}
        <div className="card bg-purple-50 border border-base-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <FaLightbulb className="text-warning" />
              Interview Tips
            </h2>

            <ul className="space-y-3 mt-4">
              {topic.tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <FaCheckCircle className="text-success mt-1" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practice */}
        <div className="card bg-purple-50  border border-base-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <FaCheckCircle className="text-success" />
              Practice Checklist
            </h2>

            <div className="space-y-3 mt-4">
              {topic.practiceChecklist.map((item, index) => (
                <label
                  key={index}
                  className="label cursor-pointer justify-start gap-3"
                >
                  <div className="join join-vertical w-full">

                    <div className="join-item flex items-center gap-4 p-3 border rounded-lg">

                      <input
                        type="checkbox"
                        className="checkbox checkbox-success" />

                      <span>{item}</span>

                    </div>

                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Learning Resources
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {topic.resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="card bg-purple-50 border border-base-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="card-body">
                <div className="flex justify-between items-center hover:scale-105">

                  <h3 className="card-title">
                    {resource.name}
                  </h3>

                  <div className="btn btn-circle btn-sm bg-purple-400 text-white hover:bg-purple-500 transition duration-300">
                    <FaExternalLinkAlt />
                  </div>

                </div>

                <p className="text-sm break-all">
                  {resource.url}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Interview Strategy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Interview Strategy
        </h2>

        <div className="space-y-4">
          {topic.interviewStrategy.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 items-start bg-purple-50 p-4 rounded-lg border border-base-300"
            >
              <div className="badge bg-purple-400 badge-lg">
                {index + 1}
              </div>

              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Button */}
      <div className="sticky bottom-5 flex justify-center gap-5 mt-20">
        <Link
          to={`/interview/${id}`}
          className="btn bg-purple-400 btn-lg rounded-full shadow-xl">
          <FaRocket />
          Start Interview
        </Link>

        <Link
          to={`/category/${id}`}
          className="btn btn-outline btn-lg rounded-full bg-purple-50 border border-base-300 shadow-xl">
          Back
        </Link>
      </div>
    </div>
  );
};

export default TopicDetails;