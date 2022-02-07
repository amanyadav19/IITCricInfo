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
                const response = await Path.get(`/venue/info/${parameters.id}`);
                console.log(response.data.data.venue);
                setVenue(response.data.data.venue);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div class="container-fluid">
  <div class="table-responsive">
  <table className="table table-hover table-bordered table-striped">
      <tbody>
      <tr><td>Venue Name</td><td>{venue.venue_name}</td></tr>
      <tr><td>Venue Address</td><td>{venue.city_name}, {venue.country_name}</td></tr>
      <tr><td>Capacity</td><td>{venue.capacity}</td></tr>
      <tr><td>Total matches played</td><td>{venue.matches_played}</td></tr>
      <tr><td>Highest total recorded</td><td>{venue.max_total}</td></tr>
      <tr><td>Lowest total recorded</td><td>{venue.min_total}</td></tr>
      <tr><td>Highest scored chased</td><td>{venue.max_runs_chased}</td></tr>
      </tbody>
  </table>
</div>
</div>);
};

export default Venue_stat_basic_info;