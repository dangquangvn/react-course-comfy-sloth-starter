import React from "react";
const Error = ({ title }) => {
  return (
    <div className='section section-center text-center'>
      {title ? <h2>{title}</h2> : <h2>There was an error...</h2>}
    </div>
  );
};

export default Error;
