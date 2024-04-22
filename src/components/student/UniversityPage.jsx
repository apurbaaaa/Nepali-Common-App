import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './UniversityPage.css';

function UniversityDetails() {
    const [collegeDetails, setCollegeDetails] = useState(null);
    const { collegeId } = useParams(); // Retrieve the collegeId from URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch college details
                const collegeQuery = query(collection(db, "studentcolleges"), where("collegeId", "==", collegeId));
                const collegeSnapshot = await getDocs(collegeQuery);
                if (!collegeSnapshot.empty) {
                    const collegeData = collegeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
                    setCollegeDetails(collegeData);
                } else {
                    console.log("No document with the matching collegeId field found");
                }
            } catch (error) {
                console.error("Error fetching college data:", error);
            }
        };

        fetchData();
    }, [collegeId]);

    const handleSubmit = async () => {
        try {
            // Fetch student details from Firestore
            const studentQuery = query(collection(db, "studentDetails"));
            const studentSnapshot = await getDocs(studentQuery);
            if (!studentSnapshot.empty) {
                studentSnapshot.forEach(async (doc) => {
                    // Upload student application to studentApplications collection
                    await addDoc(collection(db, "studentApplications"), {
                        collegeId: collegeId,
                        studentDetails: doc.data()
                    });
                });
                // Alert indicating successful submission
                window.alert("Application submitted successfully!");
            } else {
                console.log("No student details found in the database");
            }
        } catch (error) {
            console.error("Error submitting applications:", error);
        }
    };

    return (
        <div>
            {collegeDetails ? (
                <div>
                    <h2>{collegeDetails.collegeName}</h2>
                    <img src={collegeDetails.imageUrl} alt={collegeDetails.collegeName} />
                    <p>{collegeDetails.description}</p>
                    <p>{collegeDetails.location}</p>
                    <p>Start term: {collegeDetails.startTerm}</p>
                    <button onClick={handleSubmit}>Submit Application</button>
                </div>
            ) : (
                <p>Loading details...</p>
            )}
        </div>
    );
}

export default UniversityDetails;
