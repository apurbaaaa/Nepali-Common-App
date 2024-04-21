// In college.jsx
import React from "react";
import './college.css';
import { useNavigate } from 'react-router-dom';

function College() {
  const [activeTab, setActiveTab] = React.useState("addApplication");
  const navigate = useNavigate();

  const goToApplicationHandling = () => {
    navigate("/handle-applications");  // This path must match the route defined in App.js
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <p>Welcome to the Common App</p>
      </header>

      <nav className="tab-nav">
        <button
            className={`tab-nav-button ${activeTab === "addApplication" ? "active" : ""}`} 
            onClick={() => setActiveTab("addApplication")}>
            Add Application
        </button>
        <button
            className={`tab-nav-button ${activeTab === "seeApplications" ? "active" : ""}`} 
            onClick={() => setActiveTab("seeApplications")}>
            See Applications
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === "addApplication" && (
          <section className="application-form">
            <div className="app">
              <button className="big-button" onClick={goToApplicationHandling}>+ Add Application</button>
            </div>
          </section>
        )}

        {activeTab === "seeApplications" && (
          <section className="add-program-form">
            <h2>View Applications</h2>
            <div className="university-table-container">
                Content goes here
            </div>
          </section>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>© 2024 College App</p>
      </footer>
    </div>
  );
}

export default College;
