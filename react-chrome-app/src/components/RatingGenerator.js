import React, { useEffect, useState } from 'react';

const RatingGenerator = ({pricePW, location}) => {
    const [rating, setRating] = useState('');

    useEffect(() => {
      setRating('☆☆☆☆☆');
    }, []);

    /*
    Generate ratings 
    */
  
  
  return (
    <div>
      <h3>{rating}</h3>
    </div>
  );
};

// Export the component
export default RatingGenerator;