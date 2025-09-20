import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";

export default function ResultsTable({ evaluations = [] }) {
  const [filter, setFilter] = useState("");
  const [minScore, setMinScore] = useState("");

  const filtered = useMemo(() => {
    return evaluations.filter(ev => {
      if (filter && !ev.eval.verdict.toLowerCase().includes(filter.toLowerCase()) && !ev.resume.name.toLowerCase().includes(filter.toLowerCase())) return false;
      if (minScore && Number(ev.eval.score) < Number(minScore)) return false;
      return true;
    });
  }, [evaluations, filter, minScore]);

  const csvData = filtered.map(ev => ({
    candidate: ev.resume.name,
    regno: ev.resume.regno || "",
    jd_id: ev.eval.jd_id,
    score: ev.eval.score,
    verdict: ev.eval.verdict,
    missing_skills: (ev.eval.missing_must || []).join("; "),
    suggestions: ev.eval.suggestions || ""
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <input placeholder="Search by candidate or verdict" value={filter} onChange={e=>setFilter(e.target.value)} className="p-2 border rounded"/>
          <input placeholder="Min score" type="number" value={minScore} onChange={e=>setMinScore(e.target.value)} className="p-2 border rounded w-28" />
        </div>
        <div>
          <CSVLink className="px-3 py-2 bg-indigo-600 text-white rounded" filename="evaluations.csv" data={csvData}>Export CSV</CSVLink>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border">Candidate</th>
              <th className="p-2 border">Reg No</th>
              <th className="p-2 border">JD</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Verdict</th>
              <th className="p-2 border">Missing Skills</th>
              <th className="p-2 border">Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border">{ev.resume.name}</td>
                <td className="p-2 border">{ev.resume.regno || "-"}</td>
                <td className="p-2 border">{ev.eval.jd_id}</td>
                <td className="p-2 border font-semibold">{ev.eval.score}</td>
                <td className="p-2 border">{ev.eval.verdict}</td>
                <td className="p-2 border">{(ev.eval.missing_must || []).join(", ")}</td>
                <td className="p-2 border whitespace-pre-wrap text-sm">{ev.eval.suggestions}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="p-4 text-center text-gray-500">No evaluations yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
