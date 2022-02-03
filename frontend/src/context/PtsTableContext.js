import React, { useState, createContext } from "react";

export const PointsTabelContext = createContext();

export const PointsTabelContextProvider = (props) => {
  const [pointsTable, setPointsTable] = useState([]);
  return (
    <PointsTabelContext.Provider value={{ pointsTable, setPointsTable }}>
      {props.children}
    </PointsTabelContext.Provider>
  );
};
