import React, { useState, useEffect } from 'react';

function Individual_favourite({id, link, name, deleteFavourite}) {
    const [visitLink, setVisitLink] = useState(false)

    useEffect(() => {
        if (visitLink) {
            window.location.href = link;
        }
    
      }, [visitLink]);

      const goToLink = () => {
        setVisitLink(true)
      }

    return (
        <div>
            <div>
                <button onClick={goToLink}>{name}</button>
                <button className = "emojiButton" onClick={() => deleteFavourite(id)}>     🗑️</button>
            </div>
        </div>
    );
}

export default Individual_favourite;
