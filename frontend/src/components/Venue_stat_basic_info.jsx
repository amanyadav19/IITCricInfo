import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {VenueInfoContext} from "../context/VenueInfoContext";
import { useParams } from "react-router-dom";
export const Venue_stat_basic_info = (props) => {
    const parameters = useParams();
    const {venue, setVenue} = useContext(VenueInfoContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/venue/${parameters.id}`);
                setVenue(response.data.data.venue);
                console.log(response.data.data.venue);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div className="list-group">
  <table className="table table-hover bg-primary">
      <tr><td>{venue.venue_name}</td></tr>
      <tr><td>{venue.city_name}</td></tr>
      <tr><td>{venue.country_name}</td></tr>
  </table>
</div>);
};

export default Venue_stat_basic_info;