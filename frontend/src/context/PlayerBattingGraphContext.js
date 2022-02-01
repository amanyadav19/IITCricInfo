import React, {useState, createContext} from 'react';

export const PlayerBattingGraphContext = createContext();

export const PlayerBattingGraphContextProvider = props => {
    
    const [playerBatGraph, setPlayerBatGraph] = useState([])
    return (
        <PlayerBattingGraphContext.Provider value ={{playerBatGraph, setPlayerBatGraph}}>
            {props.children}
        </PlayerBattingGraphContext.Provider>
    )
}