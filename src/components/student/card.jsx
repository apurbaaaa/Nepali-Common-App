import React from 'react';
import './card.css';


const MyCard = ({ uni }) => {
    const handleClick = () => {
        window.location.href = '/university-details';
    };

    return (
        <div className="card"  onClick={handleClick}>
            <div className="image-container">
                <img className="image" src={uni.image} alt={uni.name} />
            </div>
            <div className="content">
                <h1 className="title">
                    {uni.name}
                </h1>
                <div className="description">
                    <strong>Description: </strong>
                    <p>{uni.description}</p>
                </div>
                <div className="requirements">
                    <strong>Requirements: </strong>
                    <ul>
                        {uni.requirementsLines.map((requirements, index) => (
                            <li key={index}>
                                {requirements}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MyCard;
