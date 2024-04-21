import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './student.css';
import UniversityTable from "./AddPrograms";
import MyCard from "./card";
import ProfilePage from "./MyProfile"; // Make sure the path to ProfilePage is correct

function Student() {
  const [activeTab, setActiveTab] = React.useState("myApplication");
  const [programs, setPrograms] = useState([]); // Initialize as an empty array

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
  
  console.log(programs);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <p>Welcome to the Common App</p>
      </header>
      <nav className="tab-nav">
        <button
          className={`tab-nav-button ${activeTab === "myApplication" && "active"}`}
          onClick={() => setActiveTab("myApplication")}>
          My Application
        </button>
        <button
          className={`tab-nav-button ${activeTab === "addProgram" && "active"}`}
          onClick={() => setActiveTab("addProgram")}>
          Add Program
        </button>
        <button
          className={`tab-nav-button ${activeTab === "myProfile" && "active"}`}
          onClick={() => setActiveTab("myProfile")}>
          My Profile
        </button>
      </nav>
      <main className="dashboard-main">
        {activeTab === "myApplication" && (
          <div className="card-container">
            {programs && programs.length > 0 ? (
              programs.map((program) => (
                <MyCard key={program.id} uni={program} />
              ))              
            ) : (
              <p>No programs available.</p> // Show a message if no data is available
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

export default Student;
