import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {PlayerBowlingGraphContext} from "../context/PlayerBowlingGraphContext";
import { useParams } from "react-router-dom";
import { Chart } from "react-chartjs-2";
export const PlayerBowlingGraphStatistics = (props) => {
    const {playerBowlGraph, setPlayerBowlGraph} = useContext(PlayerBowlingGraphContext);

    const parameters = useParams();
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/players/bowl_stat_graph/${parameters.id}`);
                setPlayerBowlGraph(response.data.data.player);
                console.log(response.data.data.player);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div><Chart
    data={{
      labels: playerBowlGraph.map(el => el.match_id),
      datasets: [
        {
            type: 'line',
            label: 'Wickets taken',
            backgroundColor: 'rgba(0,200,0,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: playerBowlGraph.map(el => el.wickets),
        
        },
        {
            type: 'bar',
            label: 'Runs Conceded',
            backgroundColor: 'rgba(0,0,255,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: playerBowlGraph.map(el => el.runs_scored),
          }
      ]
    }}
    width = {"500%"}
    options={{
        plugins:{
      title:{
        display:true,
        text:'Wickets taken and Runs conceded in each match',
        fontSize:20
      },
      legend:{
        display:true,
        position:'bottom'
      }}
    }}
  />
</div>);
};

export default PlayerBowlingGraphStatistics;