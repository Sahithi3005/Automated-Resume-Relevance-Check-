import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Loader from "./Loader";

export default function UploadResume({ jdList = [], onEvaluated }) {
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [selectedJd, setSelectedJd] = useState(jdList.length ? jdList[0].id : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jdList && jdList.length && !selectedJd) setSelectedJd(jdList[0].id);
  }, [jdList]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a resume file.");
    if (!selectedJd) return alert("Select a job description to evaluate against.");

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name || "Anonymous");
      if (regno) fd.append("regno", regno);
      if (location) fd.append("location", location);
      fd.append("file", file);

      // 1) upload resume
      const r1 = await axios.post(`${config.API_BASE}/upload_resume`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      const resumeId = r1.data.id;

      // 2) evaluate
      const params = new URLSearchParams();
      params.append("resume_id", resumeId);
      params.append("jd_id", selectedJd);
      const r2 = await axios.post(`${config.API_BASE}/evaluate`, params.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

      alert(`Evaluation done — Score: ${r2.data.score}`);
      onEvaluated && onEvaluated({ resume: r1.data, eval: r2.data });
    } catch (err) {
      console.error(err);
      alert("Upload or evaluation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow" onSubmit={handleUpload}>
      <h3 className="text-lg font-semibold mb-3">Upload Resume & Evaluate</h3>
      <label className="block text-sm">Candidate Name</label>
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="A. DURGESH"/>
      <label className="block text-sm">Registration No (optional)</label>
      <input value={regno} onChange={e=>setRegno(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="23L31A4304"/>
      <label className="block text-sm">Location (optional)</label>
      <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <label className="block text-sm">Select Job</label>
      <select value={selectedJd} onChange={e=>setSelectedJd(e.target.value)} className="w-full p-2 border rounded mb-2">
        <option value="">-- Select JD --</option>
        {jdList.map(j => <option key={j.id} value={j.id}>{j.title} {j.location ? `(${j.location})` : ""}</option>)}
      </select>

      <label className="block text-sm">Resume file</label>
      <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="mb-4"/>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Accepted: PDF / DOCX</div>
        <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>
          {loading ? <div className="flex items-center gap-2"><Loader size={2} />Processing...</div> : "Upload & Evaluate"}
        </button>
      </div>
    </form>
  );
}
