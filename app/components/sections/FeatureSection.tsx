import React, { type ReactElement } from "react";

const FeatureCard = ({
  logo,
  points,
  title,
}: {
  logo: ReactElement;
  points: string[];
  title: string;
}) => {
  return (
    <div className={`${title} rounded-xl bg-white p-3 m-2 lg:m-3 flex-1`}>
      <div className="flex flex-col gap-4">
        <div className="flex rounded-full bg-[#CDF0E4] w-14 h-14 items-center justify-center text-2xl text-[#329A71]">
          {logo}
        </div>
        <p className="mt-4 text-xl font-semibold">{title}</p>
        {points.map((point) => (
          <span className="inline-flex items-start" key={point}>
            <img
              src="/icons/checked.svg"
              alt="Checked"
              className="w-6 mr-3 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm sm:text-base">{point}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="no-x-scroll min-h-screen max-w-[100%] w-full bg-cover bg-gradient-to-r from-black to-[#5545B1] flex items-center justify-center overflow-x-hidden">
      <div className="min-w-full w-full px-4 sm:px-8 lg:px-16 py-10">
        {/* Header */}
        <div className="flex flex-col gap-7">
          <h2 className="font-semibold text-center text-2xl sm:text-3xl lg:text-5xl text-white leading-tight">
            Our AI-powered resume checker goes{" "}
            <br className="hidden sm:block" />
            beyond typos and punctuation
          </h2>
          <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl text-center max-w-3xl mx-auto">
            We've built-in ChatGPT to help you create a resume that's tailored
            to the position you're applying for.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 flex flex-col lg:flex-row justify-center items-stretch gap-6">
          <div className="flex flex-col gap-6 flex-1">
            <div className="text-gray-100 p-4 sm:p-6">
              <p className="text-2xl sm:text-3xl font-semibold">
                Resume optimization checklist
              </p>
              <p className="text-base sm:text-lg mt-4 max-w-sm">
                We check for 16 crucial things across 5 different categories on
                your resume including content, file type, and keywords in the
                most important sections of your resume. Here's a full list of
                the checks you'll receive:
              </p>
            </div>
            <FeatureCard
              logo={
                <i
                  className="fa-solid fa-pen-fancy"
                  style={{ color: "#63E6BE" }}
                ></i>
              }
              title="Content"
              points={[
                "ATS parse rate",
                "Repetition of words and phrases",
                "Spelling and grammar",
                "Quantifying impact in experience section with examples",
              ]}
            />
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <FeatureCard
              logo={
                <i
                  className="fa-solid fa-file-pdf"
                  style={{ color: "#63E6BE" }}
                ></i>
              }
              title="Format"
              points={[
                "File format and size",
                "Resume length",
                "Long bullet points with suggestions on how to shorten",
              ]}
            />
            <FeatureCard
              logo={
                <i
                  className="fa-solid fa-lightbulb"
                  style={{ color: "#63E6BE" }}
                ></i>
              }
              title="Skills"
              points={["Hard skills", "Soft skills"]}
            />
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <FeatureCard
              logo={
                <i
                  className="fa-solid fa-file-word"
                  style={{ color: "#63E6BE" }}
                ></i>
              }
              title="Resume section"
              points={[
                "Contact information",
                "Essential sections",
                "Personality showcase with tips on how to improve",
              ]}
            />
            <FeatureCard
              logo={
                <i className="fa-solid fa-a" style={{ color: "#63E6BE" }}></i>
              }
              title="Tone & Style"
              points={[
                "Repetition of words and phrases",
                "Tonality",
                "Usage of active voice",
                "Usage of buzzwords and cliches",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
