import React from 'react';
import { useEffect, useState } from "react";
// can import css files here if needed 
import TestComponent1 from '../components/TestComponent1';


function Homepage() {

    const [preferenceList, setPreferenceList] = useState(() => {
        const localValue = localStorage.getItem("PREFERENCES")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });


    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("PREFERENCES", JSON.stringify(preferenceList))
    }, [preferenceList]);

    // function to add preferences to list
    function addPreference(name) {
        const isFoundInThisList = preferenceList.some(ing => ing.title === name); 
        if(!isFoundInThisList){
            console.log("preference added to list ")
        setPreferenceList((currentPreferences) => {
            return [
                ...currentPreferences,
                {id: crypto.randomUUID(), title: name}
            ]
        })
    }
    else{
        console.log("preference already in the list - not added again")
    }
    }

    // function to delete ingredients from list
    function deletePreference(id) {
        setPreferenceList(currentIngredients => {
            return currentIngredients.filter(ingredient => ingredient.id !== id)
        })
    }

    return (
        <p>test</p>
    );
}

export default HomepagePreferences;
