import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {PlayerBattingGraphContext} from "../context/PlayerBattingGraphContext";
import { useParams } from "react-router-dom";
import { Bar, } from "react-chartjs-2";

export const PlayerBattingGraphStatistics = (props) => {
    const {playerBatGraph, setPlayerBatGraph} = useContext(PlayerBattingGraphContext);

    const parameters = useParams();
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/players/bat_stat_graph/${parameters.id}`);
                setPlayerBatGraph(response.data.data.player);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div  >
      <Bar
          data={{
            labels: playerBatGraph.map(el => el.match_id),
            datasets: [
              {
                label: 'Runs',
                backgroundColor: playerBatGraph.map(el => el.color),
                borderWidth: 2,
                data: playerBatGraph.map(el => el.runs_per_match)
              }
            ]
          }}
          options={{
              plugins:{
            title:{
              display:true,
              text:'Runs Scored in each match',
              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom'
            }},
            scales: {
              y: [{
                title: {
                  display: true,
                  text: 'Your Title'
                }
              }]
            },
          }}
          width={"190%"}
        />
</div>);
};

export default PlayerBattingGraphStatistics;