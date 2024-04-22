import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './seeApplications.css';

const SeeApplicationsPage = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams(); // Retrieve studentId from the URL parameters

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        // Query Firestore to find the document where studentId matches
        const q = query(collection(db, 'studentApplications'), where('studentId', '==', studentId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Extract studentDetails from the first document in the snapshot
          const docData = querySnapshot.docs[0].data();
          setStudentDetails(docData.studentDetails); // Accessing studentDetails from the retrieved document
        } else {
          console.log('No document found with studentId:', studentId);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
      setLoading(false);
    };

    fetchStudentDetails();
  }, [studentId]); // Dependency array ensures this effect runs when studentId changes

  const handleOpenMail = () => {
    if (studentDetails && studentDetails.email) {
      window.open(`mailto:${studentDetails.email}`);
    } else {
      console.error('No email address found.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentDetails) {
    return <div>No student details found.</div>;
  }

  // Render the student details
  return (
    <><br/><br/><br/><br/><div className="custom-card">
      <h1 className="custom-card-title">Student Details</h1>
      <div className="custom-card-content">
        <p><strong>Name:</strong> {studentDetails.name}</p>
        <p><strong>Email:</strong> {studentDetails.email}</p>
        <p><strong>Phone:</strong> {studentDetails.phone}</p>
        <p><strong>Address:</strong> {studentDetails.address}</p>
        <p><strong>Age:</strong> {studentDetails.age}</p>
        <p><strong>Extra-Curricular Activities:</strong> {studentDetails.eca}</p>
        <p><strong>Education Details:</strong> {studentDetails.educationDetails}</p>
        <p><strong>Father's Name:</strong> {studentDetails.fatherName}</p>
        <p><strong>Father's Phone:</strong> {studentDetails.fatherPhone}</p>
        <p><strong>Mother's Name:</strong> {studentDetails.motherName}</p>
        <p><strong>Mother's Phone:</strong> {studentDetails.motherPhone}</p>
        {/* Add more details as needed */}
        <button className="custom-card-button" onClick={handleOpenMail}>Open Mail</button>
      </div>
    </div></>
  );
};

export default SeeApplicationsPage;
