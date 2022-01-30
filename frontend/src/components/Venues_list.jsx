import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {VenuesContext} from "../context/VenuesContext";
import {Link} from "react-router-dom";

export const Venues_list = (props) => {
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
                     <td><Link to="/venue/1"> {el.venue_name} </Link></td>
                 </tr>
                )
                })}
            </tbody>
        </table>
  </div>);
};

export default Venues_list;
