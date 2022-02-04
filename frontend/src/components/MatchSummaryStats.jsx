import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { MatchSummaryContext } from "../context/MatchSummaryContext";
import { useParams } from "react-router-dom";
import {Pie} from 'react-chartjs-2';
import 'chart.js/auto';

export const Match_Summary_Stats = (props) => {
    const parameters = useParams();
    const { MatchSummary, ExtraRuns, MatchSummaryTwo, ExtraRunsTwo } = useContext(MatchSummaryContext);
    const [ matchSummary, setMatchSummary] = MatchSummary
    const [ extraRuns, setExtraRuns] = ExtraRuns
    const [ matchSummaryTwo, setMatchSummaryTwo] = MatchSummaryTwo
    const [ extraRunsTwo, setExtraRunsTwo] = ExtraRunsTwo

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/match_summary/${parameters.id}`);
                setMatchSummary(response.data.data.summaryOne);
                setExtraRuns(response.data.data.extraRunsOne)
                setMatchSummaryTwo(response.data.data.summaryTwo);
                setExtraRunsTwo(response.data.data.extraRunsTwo)
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div class="w-50 container fluid" >
     <Pie
          data={{
            labels: matchSummary.map(el => el.runtype),
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
                data: matchSummary.map(el => el.runscored)
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

    <Pie
          data={{
            labels: matchSummaryTwo.map(el => el.runtype),
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
                data: matchSummaryTwo.map(el => el.runscored)
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