import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 50
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="resume-title">
      <div className="category grid grid-cols-3 justify-between items-center space-y-3 px-5">
        <p>{title}</p>
        <p className="text-2xl justify-center flex">
          <span className={textColor}>{score}</span>/100
        </p>
        <div className="flex justify-end">
          <ScoreBadge score={score} />
        </div>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-gray-200/30 rounded-2xl shadow-xl w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p> This score is calculated based on the variables listed below</p>
        </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
