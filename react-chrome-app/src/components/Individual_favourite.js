import React from 'react';


function Individual_favourite({id, link, deleteFavourite}) {
    return (
        <div>
            <div>
                <span>{link}</span>
                <button className = "emojiButton" onClick={() => deleteFavourite(id)}>     🗑️</button>
            </div>
        </div>
    );
}

export default Individual_favourite;
