import React, { useState } from 'react';
import axios from 'axios';
import './UniversityPage.css'; 

const SubmitButton = ({ personDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Make a POST request with Axios
      const response = await axios.post('https://api.example.com/person', personDetails);
      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="submit-button-container">
      <button
        className={`submit-button ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''} ${isError ? 'error' : ''}`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : isSuccess ? 'Success!' : isError ? 'Error. Try Again' : 'Submit'}
      </button>
    </div>
  );
};

const UniversityPage = () => {
  const university = {
    image: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Sample University",
    location: "Sample Location",
    description: "Sample Description",
    requirements: "Sample Requirements"
  };

  const { image, name, location, description, requirements } = university;

  return (
    <div className="university-template">
      <div className="university-image">
        <img src={image} alt={name} />
      </div>
      <div className="university-details">
        <h1 className="university-name">{name}</h1>
        <div className="detail">
          <h1 className="label">Location:</h1>
          <h3 className="value">{location}</h3>
        </div>
        <div className="detail">
          <h1 className="label">Description:</h1>
          <h3 className="value">{description}</h3>
        </div>
        <div className="detail">
          <h1 className="label">Requirements:</h1>
          <h3 className="value">{requirements}</h3>
        </div>
      </div>
      <SubmitButton personDetails={{ /* pass person details here */ }} />
      <br></br>
    </div>
  );
}

export default UniversityPage;
