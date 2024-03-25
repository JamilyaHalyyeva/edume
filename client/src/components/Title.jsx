import React from 'react';

export const Title = ({ subtitle, title }) => {
  return (
    <div className="text-orange-500 text-center" >
      <h3 className="font-normal tracking-wider uppercase text-orange-500">{subtitle}</h3>
      <h2 className="text-2xl mt-5 mb-5 uppercase font-semibold md:text-lg">{title}</h2>
    </div>
  );
};



