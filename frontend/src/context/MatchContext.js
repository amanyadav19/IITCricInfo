import React, { useState, createContext } from "react";

export const MatchContext = createContext();

export const MatchContextProvider = (props) => {
  const [firstInningBat, setFirstInningBat] = useState([]);
  const [firstInningBowl, setFirstInningBowl] = useState([]);
  const [secondInningBat, setSecondInningBat] = useState([]);
  const [secondInningBowl, setSecondInningBowl] = useState([]);

  return (
    <MatchContext.Provider
      value={{
        FirstBat: [firstInningBat, setFirstInningBat],
        FirstBowl: [firstInningBowl, setFirstInningBowl],
        SecondBat: [secondInningBat, setSecondInningBat],
        SecondBowl: [secondInningBowl, setSecondInningBowl],
      }}
    >
      {props.children}
    </MatchContext.Provider>
  );
};
