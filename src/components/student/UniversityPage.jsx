import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './UniversityPage.css';

function UniversityDetails() {
    const [collegeDetails, setCollegeDetails] = useState(null);
    const { collegeId } = useParams(); // Retrieve the collegeId from URL

    useEffect(() => {
      const fetchData = async () => {
          try {
              const q = query(collection(db, "studentcolleges"), where("collegeId", "==", collegeId));
              const querySnapshot = await getDocs(q);
  
              if (!querySnapshot.empty) {
                  // Accessing collegeFieldId from the retrieved document
                  const data = querySnapshot.docs.map(doc => ({ id: doc.id, collegeFieldId: doc.data().collegeFieldId, ...doc.data() }))[0];
                  setCollegeDetails(data);
              } else {
                  console.log("No document with the matching collegeId field found");
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
  
      fetchData();
  }, [collegeId]);
  

    return (
        <div>
            {collegeDetails ? (
                <div>
                    <h2>{collegeDetails.collegeName}</h2>
                    <img src={collegeDetails.imageUrl} alt={collegeDetails.collegeName} />
                    <p>{collegeDetails.description}</p>
                    <p>{collegeDetails.location}</p>
                    <p>Start term: {collegeDetails.startTerm}</p>
                </div>
            ) : (
                <p>Loading details...</p>
            )}
        </div>
    );
}

export default UniversityDetails;
