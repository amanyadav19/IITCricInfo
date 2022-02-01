import React, {useState, createContext} from 'react';

export const PlayerBowlingGraphContext = createContext();

export const PlayerBowlingGraphContextProvider = props => {
    
    const [playerBowlGraph, setPlayerBowlGraph] = useState([])
    return (
        <PlayerBowlingGraphContext.Provider value ={{playerBowlGraph, setPlayerBowlGraph}}>
            {props.children}
        </PlayerBowlingGraphContext.Provider>
    )
}