import React, {useState, createContext} from 'react';

export const PlayerBattingContext = createContext();

export const PlayerBattingContextProvider = props => {
    
    const [playerBat, setPlayerBat] = useState([])
    return (
        <PlayerBattingContext.Provider value ={{playerBat, setPlayerBat}}>
            {props.children}
        </PlayerBattingContext.Provider>
    )
}