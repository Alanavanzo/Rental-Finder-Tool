import React from 'react';

const SchoolList = ({ schools }) => {
  if (!schools || schools.length === 0) return <p>No schools available.</p>;

  return (
    <div>
      <ul>
        {schools.map((school, index) => (
          <li key={index}>
            <p className='leftSmallText'>
            <strong>{school.name}:</strong> {school.rating}/5
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;
