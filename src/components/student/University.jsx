import React from 'react';
import './University.css';

function UniversityInfo({ image, name, location, description, requirements }) {
    return (
      <div className="university-info">
        <img src={image} alt={name} className="university-image" />
        <div className="university-text-container">
          <h1 className="university-name">{name}</h1>
          <p className="university-location">{location}</p>
          <p className="university-description">{description}</p>
          <p className="university-requirements">{requirements}</p>
        </div>
        <button className="university-submit-button">Submit</button>
      </div>
    );
  }

function UniversityContainer() {
    return (
      <div className="university-container">
        <UniversityInfo
          image="https://example.com/university-image.jpg"
          name="University Name"
          location="University Location"
          description="University Description"
          requirements="University Requirements"
        />
      </div>
    );
  }
export default UniversityContainer;