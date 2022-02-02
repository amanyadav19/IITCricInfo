import React, { useState, createContext } from "react";

export const InningContext = createContext();

export const InningContextProvider = (props) => {
  const [firstInningBat, setFirstInningBat] = useState([]);
  const [firstInningBowl, setFirstInningBowl] = useState([]);
  const [secondInningBat, setSecondInningBat] = useState([]);
  const [secondInningBowl, setSecondInningBowl] = useState([]);

  return (
      <InningContext.Provider value={{ FirstBat: [firstInningBat, setFirstInningBat], FirstBowl : [firstInningBowl, setFirstInningBowl], SecondBat: [secondInningBat, setSecondInningBat], SecondBowl: [secondInningBowl, setSecondInningBowl] }}>
        {props.children}
      </InningContext.Provider>
  );
};
