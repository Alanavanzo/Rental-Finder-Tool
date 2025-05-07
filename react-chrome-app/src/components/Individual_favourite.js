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
        if (ratingsList != []){
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


    return (
        <div>
            <div className='individualFavourite'>
                <button 
                    onClick={goToLink} 
                    className='nameButton' 
                    title={name}
                >
                    ✨ {name.split('-')[0].trim()}
                    {rating !== null && <span className="ratingTag">⭐ {rating}</span>}
                </button>
                <button className = "emojiButton" onClick={() => deleteFavourite(id)}>     🗑️</button>
            </div>
        </div>
    );
}

export default Individual_favourite;
