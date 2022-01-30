import React, {useState, createContext} from 'react';

export const VenuesContext = createContext();

export const VenuesContextProvider = props => {
    
    const [venues, setVenues] = useState([])
    return (
        <VenuesContext.Provider value ={{venues, setVenues}}>
            {props.children}
        </VenuesContext.Provider>
    )
}