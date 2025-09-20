import React, { useState } from "react";
import axios from "axios";
import config from "../config";

export default function UploadJD({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [must, setMust] = useState("");
  const [good, setGood] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!title.trim()) return "Please provide a job title.";
    if (!must.trim()) return "Add at least one must-have skill (comma separated).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      if (location) fd.append("location", location);
      fd.append("must_have", must);
      fd.append("good_to_have", good);
      if (file) fd.append("file", file);
      const res = await axios.post(`${config.API_BASE}/upload_jd`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert(`JD uploaded (id ${res.data.id}).`);
      onUploaded && onUploaded(res.data);
      setTitle(""); setLocation(""); setMust(""); setGood(""); setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-3">Upload Job Description</h3>
      <label className="block text-sm">Job Title</label>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="e.g. ML Engineer"/>
      <label className="block text-sm">Location (optional)</label>
      <input value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Hyderabad"/>
      <label className="block text-sm">Must-have skills (comma separated)</label>
      <input value={must} onChange={(e)=>setMust(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Python, PyTorch, SQL"/>
      <label className="block text-sm">Good-to-have skills (comma separated)</label>
      <input value={good} onChange={(e)=>setGood(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="AWS, Docker"/>
      <label className="block text-sm">Optional JD file (PDF/DOCX)</label>
      <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="mb-4"/>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
          {loading ? "Uploading..." : "Upload JD"}
        </button>
      </div>
    </form>
  );
}
