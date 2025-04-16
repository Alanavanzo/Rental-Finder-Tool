import React, { useEffect, useState } from 'react';
import Individual_favourite from '../components/Individual_favourite';
import Add_favourite from '../components/Add_favourite';

const Favourite = () => {
    const [favouriteList, setFavouriteList] = useState(() => {

        const favouriteListLocal = localStorage.getItem("favouriteListStored")
        if (favouriteListLocal == null) return []

        return JSON.parse(favouriteListLocal)

    });
    console.log(favouriteList)

    useEffect(() => {
        localStorage.setItem("favouriteListStored", JSON.stringify(favouriteList));

    }, [favouriteList]);

    // TODO add ability for users to name the properties
    function addFavourite(link_input, name_input) {
        const isFoundInThisList = favouriteList.some(ing => ing.link === link_input); // will be true if link is already in list  
        if(!isFoundInThisList){
        setFavouriteList((currentFavourites) => {
            return [
                ...currentFavourites,
                {id: crypto.randomUUID(), name: name_input, link: link_input}
            ]
        })
    }
    else{
        return ("cannotAdd")        // cannot add .. return original list 
    }
    }

        // function to delete a favourite from the list
        function deleteFavourite(id) {
            setFavouriteList(currentFavourites => {
                return currentFavourites.filter(favourite => favourite.id !== id)
            })
        }

  return (
    <div>
        <span className='topicHeader'>Add a New Favourite!</span>
        <br></br>
        <div>
            <Add_favourite addFavourite={addFavourite}/>
        </div>
        <br></br>
        <span className='topicHeader'>Your Favourites</span>
        <br></br>
            <div className="row">

                {favouriteList.length === 0 && <div style={{textAlign: "center"}}>No Favourites</div>}
                {favouriteList.map(favourite => {
                    return (
                        <Individual_favourite
                        {...favourite}
                    key={favourite.id}
                    link = {favourite.link}
                    name = {favourite.name}
                    deleteFavourite={deleteFavourite}
                        />
                            )
                    })}

            </div>
    </div>
  );
};

// Export the component
export default Favourite;