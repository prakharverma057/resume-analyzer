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
    <div className={`${title} rounded-xl bg-white p-3 m-3`}>
      <div className="flex flex-col gap-4">
        <div className="flex rounded-full bg-[#CDF0E4] w-14 h-14 items-center justify-center text-2xl text-[#329A71]">
          {logo}
        </div>
        <p className="mt-4 text-xl font-semibold">{title}</p>
        {points.map((point) => (
          <span className="inline-flex" key={point}>
            <img src="/icons/checked.svg" alt="Checked" className="w-6 mr-3" />
            {point}
          </span>
        ))}
      </div>
    </div>
  );
};
const FeatureSection = () => {
  return (
    <div className="min-w-screen h-screen bg-cover flex items-center justify-center overflow-hidden ">
      <div className=" bg-gradient-to-r p-15 from-black to-[#5545B1] ">
        <div className="flex flex-col">
          <div className="flex flex-col gap-7">
            <span className="font-semibold text-center text-5xl p-10 text-white">
              Our AI-powered resume checker goes <br />
              beyond typos and punctuation
            </span>
            <p className="text-gray-200 flex justify-center items-center text-2xl">
              We’ve built-in ChatGPT to help you create a resume that’s tailored
              to the position you’re applying for.
            </p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col">
              <span className="text-gray-100 gap-3 p-10 text-lg text-wrap">
                <p className="text-3xl font-semibold">
                  Resume optimization checklist
                </p>
                <p className="text-lg text-wrap mt-4 max-w-sm">
                  We check for 16 crucial things across 5 different categories
                  on your resume including content, file type, and keywords in
                  the most important sections of your resume. Here’s a full list
                  of the checks you’ll receive:
                </p>
              </span>
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

            <div className="flex flex-col">
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

            <div className="flex flex-col">
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
                  "Resume design",
                  "Tonality",
                  "Usage of active voice",
                  "Usage of buzzwords and cliches",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
