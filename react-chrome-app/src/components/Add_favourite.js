import React, { useEffect, useState } from 'react';

// TODO add a back button for when property name has been added but not link 
function Add_favourite({addFavourite}) {
    const [part1, setPart1] = useState(true);
    const [userNewFavouriteLink, setNewFavourite] = useState('');
    const [userNewFavouriteName, setNewFavouriteName] = useState('');

    const handleNewFavouriteName = (e) => {
        setNewFavouriteName(e.target.value);
      };

    const handleNewFavourite = (e) => {
        setNewFavourite(e.target.value);
      };
    
    function handleNewFavSave() {
        addFavourite(userNewFavouriteLink, userNewFavouriteName);
        setNewFavourite('');
        setNewFavouriteName('');
        setPart1(true);
    }

    function handleNewName(){
        setPart1(false);
    }
    
    return (
        <div className="row">
            {part1 ? 
                <div>
                    <input 
                        type="text" 
                        placeholder={"Enter property name ... "}
                        value = {userNewFavouriteName}
                        className = 'propertyInputFieldLong'
                        onChange={handleNewFavouriteName} 
                    />
                    <button onClick={handleNewName} className='vibrantButton'>next</button>
                </div> 
            
            
            : <div>
                <input 
                    type="text" 
                    placeholder={"Enter property link ... "}
                    value = {userNewFavouriteLink}
                    className='propertyInputFieldLong'
                    onChange={handleNewFavourite} 
                />
                <button onClick={handleNewFavSave} className='vibrantButton'>Add</button>
                </div>}
        </div>
    );
}

export default Add_favourite;
