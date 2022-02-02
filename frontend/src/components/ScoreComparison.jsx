import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { ScoreComparisonContext } from "../context/ScoreComparisonContext";
import { useParams } from "react-router-dom";
import { Line, } from "react-chartjs-2";


export const ScoreComparison = (props) => {
    const parameters = useParams();
    const { scoreComparison, scoreComparisonTwo } = useContext(ScoreComparisonContext);
    const [ firstInningRuns, setFirstInningRuns] = scoreComparison
    const [ secondInningRuns, setSecondInningRuns] = scoreComparisonTwo

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/score_comparison/${parameters.id}`);
                setFirstInningRuns(response.data.data.inningOne);
                setSecondInningRuns(response.data.data.inningTwo);
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
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            datasets: [
            {
                label: 'Runs',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: firstInningRuns.map(el => el.runs)
            },
            {
                label: 'Runs',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: secondInningRuns.map(el => el.runs)
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


