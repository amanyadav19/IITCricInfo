import React, {useEffect, useContext} from "react";
import VenueList from "../apis/VenueList";
import {VenuesContext} from "../context/VenuesContext";

export const Venues_list = (props) => {
    const {venues, setVenues} = useContext(VenuesContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await VenueList.get("/");
                setVenues(response.data.data.venues);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Venue Names</th>
                </tr>
            </thead>
            <tbody>
                {venues && venues.map(el => {return(
                     <tr key = {el.venue_id}>
                     <td>{el.venue_name}</td>
                 </tr>
                )
                })}
            </tbody>
        </table>
  </div>);
};

export default Venues_list;
