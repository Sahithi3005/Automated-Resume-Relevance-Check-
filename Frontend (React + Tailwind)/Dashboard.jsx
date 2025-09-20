import React, { useEffect, useState } from "react";
import UploadJD from "../components/UploadJD";
import UploadResume from "../components/UploadResume";
import ResultsTable from "../components/ResultsTable";
import axios from "axios";
import config from "../config";

export default function Dashboard() {
  const [jds, setJds] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => { fetchJDs(); }, []);

  const fetchJDs = async () => {
    try {
      // Basic: list all JD rows — backend should provide endpoint; fallback: we store uploaded JD IDs locally.
      // We'll try a simple GET /job_descriptions (create backend route below).
      const res = await axios.get(`${config.API_BASE}/job_descriptions`);
      setJds(res.data || []);
    } catch (err) {
      console.warn("Could not fetch JDs: ", err);
      // fallback: keep jds empty until upload adds one
    }
  };

  const handleJdUploaded = (data) => {
    setJds(prev => [{ id: data.id, title: data.title, location: data.location }, ...prev]);
  };

  const handleEvaluated = (payload) => {
    // payload: { resume: {...}, eval: {...} }
    setEvaluations(prev => [{ resume: payload.resume, eval: payload.eval }, ...prev]);
  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <UploadJD onUploaded={handleJdUploaded} />
        <UploadResume jdList={jds} onEvaluated={handleEvaluated} />
      </div>
      <ResultsTable evaluations={evaluations} />
    </main>
  );
}
