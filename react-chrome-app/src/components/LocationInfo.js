import React from 'react';
import {useState, useEffect} from "react";

// TODO --> add parameters for API call as inputs 
function LocationInfo() {

    const [resultVar, setResultVar] = useState(null);

    // TODO --> break this up so parameters can be added seperately 
    useEffect(() => {
        const url = 'https://google-map-places.p.rapidapi.com/maps/api/place/textsearch/json?query=Brighton&radius=1000&language=en&region=en&type=school';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '37415750acmshd1869b33a2a4216p10a77fjsndfcb68479b44',
                'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
            }
        };

        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
                setResultVar(result)
            } catch (error) {
                console.error(error);
            }
        };

        // if no data call fetch data 
        
        if (resultVar == null) {
            fetchData();
        } else {
            console.log(resultVar);
        }
        


/*
        const fetchData = async () => {
            try {
                // Cannot use a GET request as we are sending objects to the backend for processing
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/complexSearch`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ingredients, preferences, excIngredients})
                })
                const json = await response.json()
                console.log(json)
                setRecipeList(json);
            } catch (error) {
                console.log(error);
            }
        };
        */
    }, []);

    return (
        <div> 
            <p>This is a test</p>
        </div>
    );
}

export default LocationInfo;
