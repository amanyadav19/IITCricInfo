import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { ScoreComparisonContext } from "../context/ScoreComparisonContext";
import { useParams } from "react-router-dom";
import { Line, } from "react-chartjs-2";


export const ScoreComparison = (props) => {
    const parameters = useParams();
    const { scoreComparison, setScoreComparison } = useContext(ScoreComparisonContext);

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/score_comparison/${parameters.id}`);
                setScoreComparison(response.data.data.comparison);
                // console.console.log(response.data.results);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (
  <div className="list-group">
        <Line
        data={{
            labels: scoreComparison.map(el => el.over_id),
            datasets: [
            {
                label: 'Runs',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: scoreComparison.map(el => el.runs)
            },
            {
                label: 'Runs',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
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
            position:'right'
            }}
        }}
        />

  </div>
  );
};

export default ScoreComparison;


