import React, { useEffect, useState } from 'react';


function Add_favourite({addFavourite}) {
    const [userNewFavourite, setNewFavourite] = useState('');

    const handleNewFavourite = (e) => {
        setNewFavourite(e.target.value);
      };
    
    function handleNewFavSave() {
        addFavourite(userNewFavourite);
    }
    
    return (
        <div className="row">
            <input 
                type="text" 
                placeholder={"Enter property link ... "}
                onChange={handleNewFavourite} 
            />
            <button onClick={handleNewFavSave}>Add</button>
        </div>
    );
}

export default Add_favourite;
