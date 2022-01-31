import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {VenuesContext} from "../context/VenuesContext";
import { useHistory } from "react-router-dom";

export const Venues_list = (props) => {
    const history = useHistory();
    const {venues, setVenues} = useContext(VenuesContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get("/venues/");
                setVenues(response.data.data.venues);
            } 
            finally {
            }
        };
        fetchData();
    }, []);

    const handleVenueSelect = (id) => {
        history.push(`/venue/${id}`);
    }
  return (<div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Venue Names</th>
                </tr>
            </thead>
            <tbody>
                {venues && venues.map(el => {return(
                     <tr onClick={() => handleVenueSelect(el.venue_id)} key = {el.venue_id}>
                     <td> {el.venue_name}</td>
                 </tr>
                )
                })}
            </tbody>
        </table>
  </div>);
};

export default Venues_list;
