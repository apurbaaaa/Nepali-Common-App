import React from 'react';
import './card.css';

const MyCard = ({ uni }) => {
    const handleClick = () => {
        window.location.href = '/university-details';  // Consider using React Router for navigation if it's a React SPA
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="image-container">
                {/* Check for uni.image and uni.name existence before using them */}
                <img className="image" src={uni.image || 'default_image.png'} alt={uni.name || 'Default Name'} />
            </div>
            <div className="content">
                <h1 className="title">
                    {uni.name || 'No Name Provided'}
                </h1>
                <div className="description">
                    <strong>Description: </strong>
                    <p>{uni.description || 'No description available.'}</p>
                </div>
                <div className="requirements">
                    <strong>Requirements: </strong>
                    {uni.requirementsLines && Array.isArray(uni.requirementsLines) ? (
                        <ul>
                            {uni.requirementsLines.map((requirement, index) => (
                                <li key={index}>
                                    {requirement}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No requirements listed.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyCard;
