import React, { useState, useEffect } from 'react';

function Individual_favourite({id, link, name, deleteFavourite, ratingsList = []}) {
    const [visitLink, setVisitLink] = useState(false)

    const [rating, setRating] = useState(null);

    useEffect(() => {
        if (visitLink) {
            window.location.href = link;
        }
    
      }, [visitLink]);

      useEffect(() => {
        if (ratingsList != [] && name){
            const matchedRating = ratingsList.find(item =>    // Try to find a rating where the address is included in the name
                item.address && (name.toLowerCase().includes(item.address.toLowerCase()) || name.toLowerCase().includes(item.property.toLowerCase()))
            );

            if (matchedRating) {
                setRating(matchedRating.score);
            }
        }
    }, [ratingsList]);

    const goToLink = () => {
        setVisitLink(true)
    }
    
    const nameToDisplay = (typeof name === 'string' && name.includes('-')) ? name.split('-')[0].trim() : name;

    return (
        <div>
            <div className="individualFavourite">
                {rating !== null && (
                    <div className="ratingTag">
                          <div className="ratingItem">⭐</div>
                          <div className="ratingItem">{rating}</div>
                    </div>
                )}
                <div className="textWrapper">
                    <button 
                    onClick={goToLink} 
                    className="nameButton" 
                    title={name}
                    >
                    {nameToDisplay}
                    </button>
                </div>
                <div className="emojiWrapper">
                    <button 
                    className="emojiButton" 
                    onClick={() => deleteFavourite(id)}
                    >
                    🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Individual_favourite;
