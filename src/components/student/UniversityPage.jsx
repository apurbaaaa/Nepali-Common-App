import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid'; 
import './UniversityPage.css';

function UniversityDetails() {
    const [collegeDetails, setCollegeDetails] = useState(null);
    const { collegeId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
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
            const studentQuery = query(collection(db, "studentdetails")); 
            const studentSnapshot = await getDocs(studentQuery);
            console.log("Snapshot empty:", studentSnapshot.empty);
            console.log("Snapshot size:", studentSnapshot.size);
            if (!studentSnapshot.empty) {
                studentSnapshot.forEach(async (doc) => {
                    const uniqueStudentId = uuidv4(); 
                    await addDoc(collection(db, "studentApplications"), {
                        studentId: uniqueStudentId,
                        collegeId: collegeId,
                        studentDetails: doc.data()
                    });
                });
                window.alert("Application submitted successfully!");
            } else {
                console.log("No student details found in the database");
            }

        } catch (error) {
            console.error("Error submitting applications:", error);
        }
    };

    return (
        <div className="university-container">
            {collegeDetails ? (
                <div className="university-template">
                    <div className="university-image">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/miniproject-d9f18.appspot.com/o/collegeimages%2FffCYDJnt25YAN4dn6ZsmWrGpl5f1_1714030391881_Lord%20Buddha%20Hd%20Images%20Wallpaper%20Pics%20Photos%20Greetings.jpeg?alt=media&token=f73fed58-51d8-4249-9884-10b77447d333"
} alt={collegeDetails.collegeName} />
                    </div>
                    <div className="university-details">
                        <h2 className="university-name">{collegeDetails.collegeName}</h2>
                        <p className="detail">{collegeDetails.description}</p>
                        <p className="detail">Location: <span className="value">{collegeDetails.location}</span></p>
                        <p className="detail">Start Term: <span className="value">{collegeDetails.startTerm}</span></p>
                        <button className="submit-button" onClick={handleSubmit}>Submit Application</button>
                    </div>
                </div>
            ) : (
                <p>Loading details...</p>
            )}
        </div>
    );
}

export default UniversityDetails;
