import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {VenueMatchOutlineContext} from "../context/VenueMatchOutlineContext";
import { useParams } from "react-router-dom";
import {Pie} from 'react-chartjs-2';
import 'chart.js/auto';

export const Venue_stat_match_outline = (props) => {
    const parameters = useParams();
    const {venueOutline, setVenueOutline} = useContext(VenueMatchOutlineContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/venue/outline/${parameters.id}`);
                setVenueOutline(response.data.data.venue);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div>
     <Pie
          data={{
            labels: ['Team batting 1st won', 'Team batting 2nd won', 'Draw'],
            datasets: [
              {
                label: 'Match Outline',
                backgroundColor: [
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000'
                ],
                data: [venueOutline.bat_first, venueOutline.bat_second, 0]
              }
            ]
          }}
          options={{plugins:{
            title:{
              display:true,
              text:'Match Outline',
              fontSize:30
            },
            legend:{
              display:true,
              position:'right',
              fontSize:30
            }
          }}}
        />
</div>);
};

export default Venue_stat_match_outline;