import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {VenueInningContext} from "../context/VenueInningContext";
import { useParams } from "react-router-dom";
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

export const Venue_stat_average_first_inning = (props) => {
    const parameters = useParams();
    const {venueInning, setVenueInning} = useContext(VenueInningContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/venue/inning/${parameters.id}`);
                console.log(response);
                setVenueInning(response.data.data.venue);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div class="w-50 container fluid" >
             <Line
          data={{
            labels: venueInning.map(el => el.season_year),
            datasets: [
              {
                label: venueInning.map(el => el.venue_name)[0] || 'no venue',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: venueInning.map(el=> el.avg_score)
              }
            ]
          }}
          options={{
            title:{
              display:true,
              text:'Average first innings score',
              fontSize:30
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
</div>);
};

export default Venue_stat_average_first_inning;