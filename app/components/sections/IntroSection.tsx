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
    <div className="flex flex-col justify-center items-center relative gap-50 md:p-20 -translate-y-20 bg-transparent">
      <div className="flex flex-row md:flex-row gap-8 items-start">
        <img
          src="https://enhancv.com/_next/static/images/ats-checker-716fd8ba725f0a2f6ed622ea30fb0538.svg"
          className="w-lg mt-8 -translate-y-40 h-auto sticky top-[40vh] rounded-lg"
          alt="ATS Checker"
        />
        <div className="flex flex-col gap-8 leading-7 max-w-xl">
          <p className="font-semibold text-5xl tracking-wide pt-5">
            Who are we? What is RezBuddy's Resume Analyzer??
          </p>
          <span className="text-gray-500 font-medium">
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
              <p className="text-gray-500 font-medium">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=" relative md:p-20 -translate-y-20 bg-transparent ">
        <div className="flex flex-row  md:flex-row gap-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
          </div>
          <div className="flex flex-col items-center justify-center gap-8 leading-7 max-w-xl ">
            <p className="font-semibold text-5xl tracking-wide pt-5">
              Get an ATS understanding Check
            </p>
            <span className="text-gray-500 font-medium">
              Part of the resume checker score we assign is based on the
              parsability rate of your resume. We’ve reverse-engineered the most
              popular applicant tracking systems currently used and we look for
              signs of ATS compatibility.
              <br /> For each resume uploaded, we look for skills and keywords
              connected to the job and industry you’re applying for, readable
              contact information, file type, and length. Then, we’ll give you
              suggestions on how to improve your resume.
            </span>
          </div>
          <img
            src="https://enhancv.com/_next/static/images/resume-348c033dc738da343f6621e474f48a87.svg"
            className="w-2xl translate-x-30 mt-8 h-auto rounded-lg"
            alt="resume stack"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
