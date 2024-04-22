import React from 'react';
import './UniversityPage.css';

function UniversityInfo({ university }) {
  const { image, name, location, description, requirements } = university;

  return (
    <div className="university-info">
      <img src={image} alt={name} className="university-image" />
      <div className="university-text-container">
        <h1 className="university-name">{uni.collegeName}</h1>
        <p className="university-location">{location}</p>
        <p className="university-description">{description}</p>
        <p className="university-requirements">{requirements}</p>
      </div>
      <button className="university-submit-button">Submit</button>
    </div>
  );
}

function UniversityContainer({ university }) {
  return (
    <div className="university-container">
      <UniversityInfo university={university} />
    </div>
  );
}

export default UniversityContainer;
  