import React, {useState, createContext} from 'react';

export const PlayerInfoContext = createContext();

export const PlayerInfoContextProvider = props => {
    
    const [player, setPlayer] = useState([])
    return (
        <PlayerInfoContext.Provider value ={{player, setPlayer}}>
            {props.children}
        </PlayerInfoContext.Provider>
    )
}