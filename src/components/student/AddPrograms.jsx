import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

const UniversityTable = ({ programs }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = programs.filter((program) =>
    program.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
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
            <TableCell>Program Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Start Term</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Application Fee</TableCell>
            <TableCell>Admission Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((program) => (
            <TableRow key={program.name}>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.country}</TableCell>
              <TableCell>{program.city}</TableCell>
              <TableCell>{program.state}</TableCell>
              <TableCell>{program.startTerm}</TableCell>
              <TableCell>{program.deadline}</TableCell>
              <TableCell>{program.applicationFee}</TableCell>
              <TableCell>{program.admissionPlan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UniversityTable;
