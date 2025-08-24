import React from "react";

const IntroSection = () => {
  const introPoints: {
    id: number;
    title: string;
    description: string;
  }[] = [
    {
      id: 1,
      title: "Who are we?",
      description:
        "RezBuddy is a student led project aimed to helping job seekers and students get their dream company by optimizing their resumes as per the company's ATS.",
    },
    {
      id: 2,
      title: "How do we do it?",
      description:
        "We are backed by AI models which are trained on various ATS and generate a results. We use leading NLP models like sonnet-4 and GPT-4 with custom fine tuning to get the accurate score.",
    },
    {
      id: 3,
      title: "What you get?",
      description:
        "You get a detailed report on how well your resume is optimized for ATS, along with AI-powered suggestions to improve it. You also get a score out of 100 which indicates how well your resume is optimized for ATS.",
    },
    {
      id: 4,
      title: "What we base our interpretation on?",
      description:
        "Similar to an ATS, we analyze and attempt to comprehend your resume. The greater our understanding of your resume, the more effectively it aligns with a company’s ATS.",
    },
    {
      id: 5,
      title: "What our analyzer identifies",
      description:
        "Although an ATS doesn’t look for spelling mistakes and poorly crafted content, recruitment managers certainly do. The second part of our score is based on the quantifiable achievements you have in your resume and the quality of the written content.",
    },
  ];

  return (
    <div className=" relative md:p-20 -translate-y-20 bg-transparent">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src="https://enhancv.com/_next/static/images/ats-checker-716fd8ba725f0a2f6ed622ea30fb0538.svg"
          className="w-lg mt-8 -translate-y-40 h-auto sticky top-[40vh] rounded-lg"
          alt="ATS Checker"
        />
        <div className="flex flex-col gap-8 leading-7 max-w-xl">
          <p className="font-semibold text-5xl tracking-wide pt-5">
            Who are we? What is RezBuddy's Resume Analyzer??
          </p>
          <span>
            Getting rejected after applying even having apt skills and
            experience? This could be due to low score of your resume given by
            company's ATS. <br />
            That’s why the success of your resume is highly dependent on how
            optimized your resume is for the job you’re applying for, the resume
            template you’re using, and what skills and keywords you have
            included. <br />A Resume Checker is a tool or software used to
            evaluate and improve resumes. It checks for proper formatting,
            relevant keywords (important for Application Tracking Systems),
            grammar and spelling errors, and content relevance.
          </span>

          {/* Dynamic rendering */}
          {introPoints.map(({ id, title, description }) => (
            <div key={id} className="flex flex-col gap-5">
              <div className="flex rounded-full bg-[#CDF0E4] w-14 h-14 items-center justify-center text-2xl text-[#329A71] font-semibold">
                {id}
              </div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
