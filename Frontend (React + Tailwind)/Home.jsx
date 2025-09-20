import React from "react";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-3">Automated Resume Relevance Check</h1>
      <p className="text-gray-600 mb-6">
        Upload Job Descriptions and Resumes, get a 0–100 relevance score, missing skills and personalized suggestions.
      </p>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold">Features</h3>
        <ul className="list-disc list-inside mt-3 text-left text-gray-700">
          <li>Hybrid scoring: hard (keyword/fuzzy) + semantic (embeddings)</li>
          <li>Actionable suggestions (LLM or fallback templates)</li>
          <li>Search, filter and export shortlisted candidates (CSV)</li>
          <li>Simple & responsive dashboard for placement team</li>
        </ul>
      </div>
    </main>
  );
}
