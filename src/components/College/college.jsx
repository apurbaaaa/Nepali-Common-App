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
        <section className="application-form">
            <div className="app">
              <button className="big-button" onClick={goToApplicationHandling}>+ Add Application</button>
            </div>
          </section>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-nav-button ${activeTab === "seeApplications" ? "active" : ""}`} 
          onClick={() => setActiveTab("seeApplications")}>
          See Applications
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === "seeApplications" && (
          <section className="see-applications-table">
            <h2>View Applications</h2>
              <div className="responsive-table-container">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Age</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                    <tr key={app.id} onClick={() => goToSeeApplications(app.studentId)}>
                      <td>{app.studentDetails.name}</td>
                      <td>{app.studentDetails.age}</td>
                      <td>{app.studentDetails.address}</td>
                      <td>{app.studentDetails.email}</td>
                      <td>{app.studentDetails.phone}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        }
      </main>

      <footer className="dashboard-footer">
        <p>© 2024 College App</p>
      </footer>
    </div>
  );
}

export default College;