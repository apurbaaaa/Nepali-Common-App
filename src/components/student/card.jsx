import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase/firebase'; // Import Firebase Storage instance
import './card.css';

const MyCard = ({ uni }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const getImageUrl = async () => {
            try {
                // Construct path to the image in Firebase Storage
                const imagePath = `collegeimages/${uni.imageUrl}`;

                // Get download URL of the image
                console.log(storage); // Log storage object for troubleshooting
                const url = await storage.ref(imagePath).getDownloadURL();
                setImageUrl(url);
            } catch (error) {
                console.error('Error getting image URL:', error);
            }
        };

        getImageUrl();
    }, [uni.imageUrl]);

    const handleClick = () => {
        // Handle click action if needed
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="image-container">
                {imageUrl ? (
                    <img className="image" src={imageUrl} alt={uni.collegeName} />
                ) : (
                    <div>Loading image...</div>
                )}
            </div>
            <div className="content">
                <h1 className="title">{uni.collegeName || 'No Name Provided'}</h1>
                <div className="requirements">
                    <strong>Location: </strong>
                    <p>{uni.location || 'Unknown Location'}</p>
                </div>
                <div className="description">
                    <strong>Description: </strong>
                    <p>{uni.description || 'No description available.'}</p>
                </div>
            </div>
        </div>
    );
};

export default MyCard;
