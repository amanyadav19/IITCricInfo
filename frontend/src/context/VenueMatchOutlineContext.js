import React, {useState, createContext} from 'react';

export const VenueMatchOutlineContext = createContext();

export const VenueMatchOutlineContextProvider = props => {
    
    const [venueOutline, setVenueOutline] = useState([])
    return (
        <VenueMatchOutlineContext.Provider value ={{venueOutline, setVenueOutline}}>
            {props.children}
        </VenueMatchOutlineContext.Provider>
    )
}