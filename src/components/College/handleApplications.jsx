import React, { useState } from 'react';
import { db, storage } from '../../firebase/firebase'; // Adjust the path as needed
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './handleApplications.css'

function HandleApplication() {
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // First upload the image to Firebase Storage
    const storageRef = ref(storage, `applications/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        // Then save the document in Firestore
        const docRef = collection(db, "applications");
        addDoc(docRef, {
          collegeName,
          location,
          description,
          imageUrl: downloadURL
        })
        .then(() => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      });
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="application-upload-form">
      <h1>Upload College Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="collegeName">College Name:</label>
          <input
            id="collegeName"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Upload Picture:</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept="image/*" // Only accept image files
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default HandleApplication;
