import React, { useState } from 'react';
import { db, storage } from '../../firebase/firebase'; // Adjust the path as needed
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './handleApplications.css';

function HandleApplication() {
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startTerm, setStartTerm] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [message, setMessage] = useState(''); // User feedback message

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const collegeId = localStorage.getItem('collegeId'); // Retrieve collegeId from local storage

    if (!collegeId) {
      setLoading(false);
      alert("Error: College ID is missing. Please log in again.");
      return;
    }

    if (!file) {
      setLoading(false);
      alert("Please upload an image file.");
      return;
    }

    const filename = `${collegeId}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `collegeimages/${filename}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const docRef = collection(db, "applications");
        addDoc(docRef, {
          collegeName,
          location,
          description,
          startTerm,
          imageUrl: downloadURL,
          collegeId
        })
        .then(() => {
          console.log("Application submitted successfully.");
          setMessage('Application submitted successfully!');
          resetForm();
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setMessage('Error submitting application. Please try again.');
          setLoading(false);
        });
      });
    }).catch((error) => {
      console.error("Error uploading image: ", error);
      setMessage('Failed to upload image. Please try again.');
      setLoading(false);
    });
  };

  const resetForm = () => {
    setCollegeName('');
    setLocation('');
    setDescription('');
    setStartTerm('');
    setFile(null);
    document.getElementById('file').value = null;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="application-upload-form">
      <h1>Upload College Application</h1>
      <form onSubmit={handleSubmit}>
        {message && <p>{message}</p>}
        <div className="input-container">
          <input 
            type="text" 
            id="collegeName" 
            value={collegeName} 
            name="text" 
            className="input" 
            placeholder="College Name" 
            onChange={(e) => setCollegeName(e.target.value)}
            required/>
        </div>
        <div className="input-container">
          <input 
            name="text" 
            className="input" 
            placeholder="Location:"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            required
          />
        </div>
        <div className="input-container">
          <input 
            name="text" 
            className="input" 
            placeholder="Start Term:"
            id="startTerm"
            value={startTerm}
            onChange={(e) => setStartTerm(e.target.value)}
            type="text"
            required
          />
        </div>
        <div className="input-container">
          <textarea
            name="text" 
            className="input textarea" 
            placeholder="Description:"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div class="input-container">
          <input
            type="file" 
            name="text" 
            class="input" 
            placeholder="Upload Image"
            id="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
      </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default HandleApplication;
