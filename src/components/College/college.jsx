// In college.jsx
import React, { useState, useEffect } from 'react';
import './college.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';




function College() {
  const [activeTab, setActiveTab] = useState("addApplication");
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      const querySnapshot = await getDocs(collection(db, "studentApplications"));
      const apps = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setApplications(apps);
    };

    fetchApplications();
  }, []);

  const goToApplicationHandling = () => {
    navigate("/handle-applications");
  };

  const goToSeeApplications = (studentId) => {
    navigate(`/see-applications/${studentId}`);

  }

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
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                  </tr>
                </thead>
                <tbody>
                {applications.map((app) => {
                    return (
                        <tr key={app.id}>
                            <td onClick={() => goToSeeApplications(app.studentId)}>
                                {app.studentDetails.name}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
              </table>
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