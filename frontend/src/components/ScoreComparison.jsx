import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { ScoreComparisonContext } from "../context/ScoreComparisonContext";
import { useParams } from "react-router-dom";
import { Line, } from "react-chartjs-2";


export const ScoreComparison = (props) => {
    const parameters = useParams();
    const { scoreComparison, scoreComparisonTwo, InningOneWickets, InningTwoWickets } = useContext(ScoreComparisonContext);
    const [ firstInningRuns, setFirstInningRuns] = scoreComparison
    const [ secondInningRuns, setSecondInningRuns] = scoreComparisonTwo
    const [ inningOneWickets, setInningOneWickets ] = InningOneWickets
    const [ inningTwoWickets, setInningTwoWickets ] = InningTwoWickets

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/score_comparison/${parameters.id}`);
                setFirstInningRuns(response.data.data.inningOne);
                setSecondInningRuns(response.data.data.inningTwo);
                setInningOneWickets(response.data.data.inningOneWickets);
                setInningTwoWickets(response.data.data.inningTwoWickets);
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
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                data: firstInningRuns.map(el => el.total_score),
                pointRadius: inningOneWickets.map(el => el.dotradius),
            },
            {
                label: 'Runs',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgb(255,0,0)',
                borderWidth: 2,
                data: secondInningRuns.map(el => el.total_score),
                pointRadius: inningTwoWickets.map(el => el.dotradius),
            }
            ]
        }}
        options={
            {
            plugins:{
            title:{
            display:true,
            text:'Runs Scored in each match',
            fontSize:20
            },
            
            legend:{
            display:true,
            position:'right'
            }
        }    
        }
        }
        />

  </div>
  );
};

export default ScoreComparison;


