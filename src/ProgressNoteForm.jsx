import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";

const questions = [
  { id: 1, question: "What is your name?", type: "text" },
  { id: 2, question: "What time did you arrive?", type: "text" },
  { id: 3, question: "What time did you leave?", type: "text" },
  { id: 4, question: "What was your participant's mood?", type: "text" },
  { id: 5, question: "Did you make progress on any of your participant's goals? If so, how?", type: "textarea" },
  { id: 6, question: "Any incidents or behaviors that need to be reported?", type: "textarea" },
];

export default function ProgressNoteForm() {
  const [responses, setResponses] = useState({});
  const [note, setNote] = useState("");

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const generateNote = () => {
    const name = responses[1] || "";
    const arrival = responses[2] || "";
    const leave = responses[3] || "";
    const mood = responses[4] || "";
    const goals = responses[5] || "";
    const incidents = responses[6] || "";

    const summary = `User's Name: ${name}
Date of Note Submission: ${new Date().toLocaleDateString()}
Arrival Time: ${arrival}
Leave Time: ${leave}
Total Hours: ${calculateHours(arrival, leave)}
Summarized Note: Participant was ${mood.toLowerCase()}. ${goals ? \`Goal progress included: \${goals}\` : "No goal progress noted."} ${incidents ? \`Incident Report: \${incidents}\` : "No incidents reported."}`;

    setNote(summary);
  };

  const calculateHours = (start, end) => {
    try {
      const startTime = new Date(`1970-01-01T${start}`);
      const endTime = new Date(`1970-01-01T${end}`);
      const diff = (endTime - startTime) / (1000 * 60 * 60);
      return `${diff.toFixed(2)} hours`;
    } catch {
      return "Invalid time format";
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardContent className="space-y-4">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block mb-1 font-semibold">{q.question}</label>
              {q.type === "text" ? (
                <Input
                  type="text"
                  value={responses[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ) : (
                <Textarea
                  value={responses[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              )}
            </div>
          ))}
          <Button onClick={generateNote}>Generate Note</Button>
          {note && (
            <div className="mt-4 whitespace-pre-line bg-gray-100 p-4 rounded">
              <h2 className="font-bold mb-2">Generated Note:</h2>
              <p>{note}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}