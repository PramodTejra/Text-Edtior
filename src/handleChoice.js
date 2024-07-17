import React, { useState } from 'react';
import App from './App'; // Adjust the path to where your App component is located

const ParentComponent = () => {
  const [answer, setAnswer] = useState("");

  const handleChoice = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <App answer={answer} handleChoice={handleChoice} />
  );
};

export default ParentComponent;
