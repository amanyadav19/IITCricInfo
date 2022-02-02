import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { MatchSummaryContext } from "../context/MatchSummaryContext";
import { useParams } from "react-router-dom";
import {Pie} from 'react-chartjs-2';
import 'chart.js/auto';

export const Match_Summary_Stats = (props) => {
    const parameters = useParams();
    const {matchSummary, setMatchSummary} = useContext(MatchSummaryContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/venue/outline/${parameters.id}`); //////////
                setMatchSummary(response.data.data.venue); ////////////////
                // console.console.log(response.data.data.venue);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div class="w-50 container fluid" >
     <Pie
          data={{
            labels: ['Ones', 'Two', 'Fours', 'Sixes', 'Extra Runs'],
            datasets: [
              {
                label: 'Match Outline',
                backgroundColor: [
                  'rgb(255, 205, 86)',
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000'
                ],
                data: [10, 20, 30, 40, 50]
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

export default Match_Summary_Stats;