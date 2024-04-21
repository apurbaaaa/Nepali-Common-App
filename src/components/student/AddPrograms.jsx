import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@mui/material';
import { db } from '../../firebase/firebase'; // Adjust this path as necessary
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../firebase/AuthContext'; // Ensure this is the correct path for Auth context

const UniversityTable = () => {
  const [search, setSearch] = useState('');
  const [programs, setPrograms] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applications"));
        const loadedPrograms = querySnapshot.docs.map(doc => ({
          collegeId: doc.id,
          collegeName: doc.data().collegeName,
          location: doc.data().location,
          description: doc.data().description,
          startTerm: doc.data().startTerm,
          imageUrl: doc.data().imageUrl,
        }));
        setPrograms(loadedPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddCollege = async (program) => {
    if (!currentUser) {
      alert('You must be logged in to add colleges.');
      return;
    }

    const userDocRef = doc(db, "students", currentUser.uid);
    const collegeListRef = collection(userDocRef, "collegeList");
    const collegeDocRef = doc(collegeListRef);

    try {
      await setDoc(collegeDocRef, {
        name: program.collegeName, // ensure field name matches
        location: program.location,
        startTerm: program.startTerm
      });
      alert(`College added successfully: ${program.collegeName}`);
    } catch (error) {
      console.error("Error adding college to My Colleges", error);
      alert('Failed to add college. Please try again.');
    }
  };

  const filteredData = programs.filter(program =>
    program.collegeName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
      <TextField
        fullWidth
        label="Search Programs"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>College Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Start Term</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((program) => (
            <TableRow key={program.collegeId}>
              <TableCell>{program.collegeName || 'Unknown Name'}</TableCell>
              <TableCell>{program.location || 'Unknown Location'}</TableCell>
              <TableCell>{program.startTerm || 'Unknown Term'}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddCollege(program)}
                >
                  Add College
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UniversityTable;
