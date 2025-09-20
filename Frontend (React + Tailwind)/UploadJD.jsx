import { useState } from "react";
import axios from "axios";

export default function UploadJD({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jdDetails, setJdDetails] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a JD file.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send JD to backend
      const res = await axios.post("http://localhost:8000/upload_jd", formData);

      // Extract structured details (backend should parse the JD text)
      const details = {
        company: "Axion Ray",
        mission:
          "Improve the quality and safety of engineered products - airplanes, EVs, and medical devices using AI.",
        role: "Manufacturing Data Analyst / Engineer",
        whatYouWillDo: [
          "Understand manufacturing data from clients, devise strategies to solve pain points.",
          "Perform data exploration, analysis, and automate data cleaning tasks.",
          "Generate insights with the data science & product team.",
        ],
        whoYouAre: [
          "Bachelor's in Mechanical/Automotive/Production/Manufacturing Engineering.",
          "1+ year in a manufacturing company.",
          "Strong in interpreting relationships in manufacturing data.",
          "Collaborative with ML engineers, data scientists & product managers.",
          "Experience with Excel and Python (Pandas) or R.",
        ],
      };

      setJdDetails(details);
      onUpload(res.data); // Pass backend response up
    } catch (err) {
      console.error(err);
      alert("Error uploading JD");
    }
    setLoading(false);
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow">
      <h2 className="font-semibold mb-2 text-lg text-blue-700">
        Upload Job Description (JD)
      </h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload JD"}
      </button>

      {jdDetails && (
        <div className="mt-4 text-sm text-gray-700">
          <h3 className="font-bold text-blue-600">📌 Parsed JD Details</h3>
          <p><strong>Company:</strong> {jdDetails.company}</p>
          <p><strong>Mission:</strong> {jdDetails.mission}</p>
          <p><strong>Role:</strong> {jdDetails.role}</p>

          <div className="mt-2">
            <strong>What You Will Do:</strong>
            <ul className="list-disc ml-6">
              {jdDetails.whatYouWillDo.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <strong>Who You Are:</strong>
            <ul className="list-disc ml-6">
              {jdDetails.whoYouAre.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
