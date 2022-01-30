import React, {useState, createContext} from 'react';

export const VenueInfoContext = createContext();

export const VenueInfoContextProvider = props => {
    
    const [venue, setVenue] = useState([])
    return (
        <VenueInfoContext.Provider value ={{venue, setVenue}}>
            {props.children}
        </VenueInfoContext.Provider>
    )
}