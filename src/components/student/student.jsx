import React from "react";
import './student.css'
import UniversityTable from "./AddPrograms";
import MyCard from "./card";
const uni = [
  {
      name: "University of Example",
      image: "https://example.com/image1.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum quam vel ipsum efficitur, eu mollis nunc feugiat.",
      requirementsLines: [
          "Minimum GPA: 3.5",
          "SAT Score: 1300",
          "TOEFL Score: 90",
          "Letter of Recommendation: 2",
      ]
  },
  {
      name: "Another University",
      image: "https://example.com/image2.jpg",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi.",
      requirementsLines: [
          "Minimum GPA: 3.0",
          "ACT Score: 28",
          "IELTS Score: 7.0",
          "Personal Statement Required",
      ]
  },
  {
      name: "University of Ipsum",
      image: "https://example.com/image3.jpg",
      description: "Vivamus non libero ut mauris fermentum tristique. Vestibulum nec dui a nisi dictum gravida.",
      requirementsLines: [
          "Minimum GPA: 3.2",
          "GRE Score: 310",
          "Portfolio Required",
          "Interview Process",
      ]
  }
];
const programs = [
  {
    name: 'Adelphi University',
    country: 'United States',
    city: 'Garden City',
    state: 'NY',
    startTerm: 'Fall 2024',
    deadline: '07/28/2024',
    applicationFee: 'No fee',
    admissionPlan: 'Rolling',
  },
  {
    name: 'Agnes Scott College',
    country: 'United States',
    city: 'Decatur',
    state: 'GA',
    startTerm: 'Fall 2024',
    deadline: '06/01/2024',
    applicationFee: 'No fee',
    admissionPlan: 'Rolling',
  },
  {
    name: 'Alaska Pacific University',
    country: 'United States',
    city: 'Anchorage',
    state: 'AK',
    startTerm: 'Fall 2024',
    deadline: 'Rolling',
    applicationFee: '35 Fee',
    admissionPlan: 'Rolling',
  },
];

function Student() {
  const [activeTab, setActiveTab] = React.useState("myApplication");

  return (
    <div className="dashboard-container">
        <header className="dashboard-header">
          <p>Welcome to the Common App</p>
        </header>
        <nav className="tab-nav">
            <button
                className={`tab-nav-button ${activeTab === "myApplication" && "active"}`} onClick={() => setActiveTab("myApplication")}>
                My Application
            </button>
            <button
                className={`tab-nav-button ${activeTab === "addProgram" && "active"}`} onClick={() => setActiveTab("addProgram")}>
                Add Program
            </button>
            <button
                className={`tab-nav-button ${activeTab === "checkStatus" && "active"}`} onClick={() => setActiveTab("checkStatus")}>
                Check Status
            </button>
        </nav>
      <main className="dashboard-main">


      {activeTab === "myApplication" && (
        <div className="card-container">
          {uni.map((university, index) => (
            <MyCard key={index} uni={university} />
          ))}
        </div>
    )}

      {activeTab === "addProgram" && (
        <section className="add-program-form">
          <h2>Add Program</h2>
          <div className="university-table-container">
            <UniversityTable programs={programs} />
          </div>
        </section>
        )}

        {activeTab === "checkStatus" && (
          <section className="check-status-form">
            <h2>Check Status</h2>
            <form>
              {/* Add form fields here */}
            </form>
          </section>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>© 2023 Common App</p>
      </footer>
    </div>
  );
}

export default Student;
