import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './student.css';
import UniversityTable from "./AddPrograms";
import MyCard from "./card";
import ProfilePage from "./MyProfile";

function Student() {
  const [activeTab, setActiveTab] = React.useState("myApplication");
  const [programs, setPrograms] = useState([]);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applications"));
        const loadedPrograms = querySnapshot.docs.map(doc => ({
          id: doc.id,
          collegeName: doc.data().collegeName,
          location: doc.data().location,
          description: doc.data().description,
          startTerm: doc.data().startTerm,
          imageUrl: doc.data().imageUrl,
          collegeId: doc.data().collegeId,
        }));
        setPrograms(loadedPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "studentcolleges"));
        const loadedColleges = querySnapshot.docs.map(doc => ({
          id: doc.id,
          collegeName: doc.data().collegeName,
          location: doc.data().location,
          description: doc.data().description,
          startTerm: doc.data().startTerm,
          imageUrl: doc.data().imageUrl,
          collegeId: doc.data().collegeId,
        }));
        setColleges(loadedColleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <p>Welcome to the Common App</p>
      </header>
      <nav className="tab-nav">
        <button
          className={tab-nav-button ${activeTab === "myApplication" && "active"}}
          onClick={() => setActiveTab("myApplication")}>
          My Application
        </button>
        <button
          className={tab-nav-button ${activeTab === "addProgram" && "active"}}
          onClick={() => setActiveTab("addProgram")}>
          Add Program
        </button>
        <button>
          className={tab-nav-button ${activeTab === "myProfile" && "active"}}
          onClick={() => setActiveTab("myProfile")}>
          My Profile
        </button>
      </nav>
      <main className="dashboard-main">
        {activeTab === "myApplication" && (
          <div className="card-container">
            {colleges.length > 0 ? (
              colleges.map((college) => (
                <MyCard key={college.collegeId} uni={college} />
              ))
            ) : (
              <p>No colleges added yet.</p>
            )}
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

        {activeTab === "myProfile" && (
          <ProfilePage />
        )}
      </main>

      <footer className="dashboard-footer">
        <p>© 2023 Common App</p>
      </footer>
    </div>
  );
}

export default Student;