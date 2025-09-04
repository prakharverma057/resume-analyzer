import jsPDF from "jspdf";

export const formatFeedback = (fb: any): string => {
  if (!fb) return "No feedback available.";

  let text = `📊 Overall Resume Score: ${fb.overallScore || "N/A"} / 100\n\n`;

  const sections = ["ATS", "content", "structure", "skills", "toneAndStyle"];

  sections.forEach((section) => {
    if (fb[section]) {
      text += `--- ${section.toUpperCase()} ---\n`;
      text += `Score: ${fb[section].score || "N/A"}\n\n`;

      if (fb[section].tips && fb[section].tips.length > 0) {
        text += "Tips:\n";

        fb[section].tips.forEach(
          (
            tipObj: {
              type: string;
              tip: string;
              explanation?: string;
            },
            i: number
          ) => {
            const label = tipObj.type === "good" ? "✅" : "⚠️";
            text += `${label} ${i + 1}. ${tipObj.tip}\n`;
            if (tipObj.explanation) {
              text += `    → ${tipObj.explanation}\n`;
            }
          }
        );
      }

      text += "\n";
    }
  });

  return text.trim();
};

export const downloadFeedbackReport = (feedback: any) => {
  if (!feedback) {
    alert("No feedback available to download.");
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Resume Feedback Report", 20, 20);

  // Body
  doc.setFontSize(12);
  const formatted = formatFeedback(feedback);
  const splitFeedback = doc.splitTextToSize(formatted, 170);
  doc.text(splitFeedback, 20, 40);

  // Save file
  doc.save("resume-feedback.pdf");
};
