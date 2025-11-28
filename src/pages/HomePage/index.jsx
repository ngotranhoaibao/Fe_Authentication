import React from "react";
import FeatureCard from "@/components/FeatureCard";

const HomePage = () => {
  const features = [
    {
      title: "Dashboard Analytics",
      description:
        "A short sentence explaining the benefit of the analytics feature.",
    },
    {
      title: "Project Management",
      description:
        "A short sentence explaining the benefit of the project management feature.",
    },
    {
      title: "Team Collaboration",
      description:
        "A short sentence explaining the benefit of the team collaboration feature.",
    },
  ];

  return (
    <div className="p-5">
      <div className="text-center my-10 md:my-16 lg:my-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to the App
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          A brief, one-to-two-sentence summary of the application's purpose or
          value proposition to get you started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-20">
        {features.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
