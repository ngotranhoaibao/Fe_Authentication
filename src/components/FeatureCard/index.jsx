import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="shadow-sm rounded-lg border border-gray-100 p-5 space-y-2">
      <h1 className="font-bold">{title}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
