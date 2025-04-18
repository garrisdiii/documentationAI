import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";

const timeOptions = ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'];
const moodOptions = ['Happy', 'Sad', 'Calm', 'Energetic', 'Anxious', 'Frustrated', 'Playful', 'Tired', 'Cooperative', 'Distracted', 'Excited', 'Irritable'];

export default function ProgressNoteForm() {
  const [participant, setParticipant] = useState("");
  const [arrival, setArrival] = useState("");
  const [leave, setLeave] = useState("");
  const [mood, setMood] = useState([]);
  const [goals, setGoals] = useState("");
  const [incidents, setIncidents] = useState("");
  const [note, setNote] = useState("");

  const handleMoodChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setMood(value);
  };

  const generateNote = async () => {
    const prompt = `
Caregiver Daily Progress Note:
Participant Name: ${participant}
Arrival Time: ${arrival}
Leave Time: ${leave}
Mood(s): ${mood.join(", ")}
Goal Progress: ${goals}
Incident Report: ${incidents}

Please write a professional and narrative-style progress note based on this information.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const narrative = data.choices?.[0]?.message?.content || "Error generating note.";
    setNote(narrative);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Participant Name</label>
            <Input type="text" value={participant} onChange={(e) => setParticipant(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Arrival Time</label>
            <select value={arrival} onChange={(e) => setArrival(e.target.value)} className="w-full border rounded p-2">
              <option value="">Select time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Leave Time</label>
            <select value={leave} onChange={(e) => setLeave(e.target.value)} className="w-full border rounded p-2">
              <option value="">Select time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mood(s)</label>
            <select multiple value={mood} onChange={handleMoodChange} className="w-full border rounded p-2 h-32">
              {moodOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Goal Progress</label>
            <Textarea value={goals} onChange={(e) => setGoals(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Incident Report</label>
            <Textarea value={incidents} onChange={(e) => setIncidents(e.target.value)} />
          </div>

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