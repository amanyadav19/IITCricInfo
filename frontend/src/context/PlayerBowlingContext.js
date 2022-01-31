import React, {useState, createContext} from 'react';

export const PlayerBowlingContext = createContext();

export const PlayerBowlingContextProvider = props => {
    
    const [playerBowl, setPlayerBowl] = useState([])
    return (
        <PlayerBowlingContext.Provider value ={{playerBowl, setPlayerBowl}}>
            {props.children}
        </PlayerBowlingContext.Provider>
    )
}