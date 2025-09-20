// src/components/UploadResume.jsx
import React, { useState } from "react";

const UploadResume = () => {
  const [resume, setResume] = useState(null);

  // Sample resume data (from your example: Pavan Kalyan)
  const sampleResume = {
    name: "Pavan Kalyan",
    contact: {
      email: "pavankalyan462@gmail.com",
      phone: "9876543210",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    objective:
      "Enthusiastic and detail-oriented Data Analyst with hands-on experience in Python, SQL, and data visualization. Skilled in conducting in-depth data analysis, web scraping, and building interactive dashboards. Proven ability to generate actionable insights and communicate findings clearly. Eager to contribute to a data-driven organization with strong analytical and collaboration skills.",
    skills: {
      "Languages & Tools": "Python, SQL",
      "Data Visualization": "Matplotlib, Seaborn, Power BI",
      "Libraries & Frameworks": "Pandas, NumPy, Scikit-learn, BeautifulSoup",
      "Soft Skills":
        "Analytical Thinking | Attention to Detail | Team Collaboration | Problem Solving",
    },
    education: {
      degree: "Bachelor of Science in Physics",
      year: "2020-Nov",
      university: "Bharti Vidyapeeth Pune",
    },
    projects: [
      {
        title: "Data Analysis on Used Car Listings",
        details: [
          "Scraped car data from cars24.com including make, model, mileage, and price.",
          "Performed data cleaning and exploratory data analysis (EDA) using Pandas and NumPy.",
          "Built visualizations in Seaborn and Matplotlib to identify factors influencing car prices.",
          "Derived insights to understand pricing trends by brand, mileage, and age.",
        ],
      },
      {
        title: "Analysis of Pizza Hut’s Sales Data using SQL",
        details: [
          "Analyzed sales data using SQL to uncover trends in customer preferences and sales performance.",
          "Wrote complex queries to extract revenue, top-selling items, and location-based sales data.",
          "Created reports that provided insights into regional performance and product popularity.",
        ],
      },
      {
        title: "Organizational Hierarchy Management Using SQL",
        details: [
          "Designed a relational database to model a company's organizational hierarchy.",
          "Ensured referential integrity across roles like lead managers, senior managers, and employees.",
          "Wrote complex SQL queries to join multiple tables and derive insights such as role counts per company.",
          "Used sample data for demonstration purposes, emphasizing schema design and query logic.",
        ],
      },
    ],
    certifications: [
      "Advanced Data Science with Python – FutureSkills Prime | NASSCOM | April 2025",
    ],
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />

      {resume && (
        <p className="text-green-600 font-semibold mb-4">
          File Uploaded: {resume.name}
        </p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">📄 Sample Resume Preview</h2>
      <div className="border p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold">{sampleResume.name}</h3>
        <p>
          {sampleResume.contact.email} | {sampleResume.contact.phone} |{" "}
          {sampleResume.contact.linkedin} | {sampleResume.contact.github}
        </p>

        <h4 className="font-semibold mt-4">Objective</h4>
        <p>{sampleResume.objective}</p>

        <h4 className="font-semibold mt-4">Skills</h4>
        <ul className="list-disc list-inside">
          {Object.entries(sampleResume.skills).map(([category, skill], index) => (
            <li key={index}>
              <strong>{category}:</strong> {skill}
            </li>
          ))}
        </ul>

        <h4 className="font-semibold mt-4">Education</h4>
        <p>
          {sampleResume.education.degree}, {sampleResume.education.university} (
          {sampleResume.education.year})
        </p>

        <h4 className="font-semibold mt-4">Projects</h4>
        {sampleResume.projects.map((proj, i) => (
          <div key={i} className="mb-2">
            <strong>{proj.title}</strong>
            <ul className="list-disc list-inside ml-4">
              {proj.details.map((detail, j) => (
                <li key={j}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}

        <h4 className="font-semibold mt-4">Certifications</h4>
        <ul className="list-disc list-inside">
          {sampleResume.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadResume;
