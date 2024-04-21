import React from "react";
import './student.css'
import UniversityTable from "./AddPrograms";

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

const Widget = ({ title, subtitle, icon }) => {
  return (
    <div className="widget">
      <div className="widget__icon">
        <i className={icon} />
      </div>
      <div className="widget__content">
        <h3 className="widget__title">{title}</h3>
        <p className="widget__subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

function Student() {
  const [activeTab, setActiveTab] = React.useState("myApplication");

  return (
    <div className="dashboard-container">
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
                className={`tab-nav-button ${activeTab === "submitApplication" && "active"}`} onClick={() => setActiveTab("submitApplication")}>
                Submit Application
            </button>
            <button
                className={`tab-nav-button ${activeTab === "checkStatus" && "active"}`} onClick={() => setActiveTab("checkStatus")}>
                Check Status
            </button>
        </nav>
            <header className="dashboard-header">
            <p>Welcome to the Common App</p>
        </header>
      <main className="dashboard-main">


        {activeTab === "myApplication" && (
          <section className="application-form">
            <div className="app">
              <Widget title="Total Orders" subtitle="1,256" icon="fas fa-shopping-bag" />
              <Widget title="Total Revenue" subtitle="$12,567" icon="fas fa-dollar-sign" />
              <Widget title="Avg. Order Value" subtitle="$56.75" icon="fas fa-calculator" />
            </div>
          </section>
        )}

        {activeTab === "addProgram" && (
          <section className="add-program-form">
            <h2>Add Program</h2>
            <div className="university-table-container">
              <UniversityTable programs={programs} />
            </div>
          </section>
        )}

        {activeTab === "submitApplication" && (
          <section className="submit-application-form">
            <h2>Submit Application</h2>
            <form>
              {/* Add form fields here */}
            </form>
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
