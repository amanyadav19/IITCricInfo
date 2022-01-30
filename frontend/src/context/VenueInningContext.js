import React, {useState, createContext} from 'react';

export const VenueInningContext = createContext();

export const VenueInningContextProvider = props => {
    
    const [venueInning, setVenueInning] = useState([])
    return (
        <VenueInningContext.Provider value ={{venueInning, setVenueInning}}>
            {props.children}
        </VenueInningContext.Provider>
    )
}