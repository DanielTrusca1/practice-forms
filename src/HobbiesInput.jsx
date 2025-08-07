import React, { useState } from "react";

const HobbiesInput = () => {
  const [hobbies, setHobbies] = useState([""]);

  const updateHobby = (index, value) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = value;
    setHobbies(newHobbies);
  };

  const addHobby = () => {
    setHobbies([...hobbies, ""]);
  };

  const removeHobby = (index) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(newHobbies.length ? newHobbies : [""]);
  };

  return (
    <div className="hobbies-container">
      {hobbies.map((hobby, i) => (
        <div className="hobby-row" key={i}>
          <input
            className="hobby-input"
            type="text"
            value={hobby}
            onChange={(e) => updateHobby(i, e.target.value)}
            placeholder="Enter hobby"
          />
          <button
            type="button"
            onClick={() => removeHobby(i)}
            className="hobby-button remove"
          >
            X
          </button>
          {i === hobbies.length - 1 && (
            <button
              type="button"
              onClick={addHobby}
              className="hobby-button add"
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HobbiesInput;
