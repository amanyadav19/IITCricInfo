import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { useParams } from "react-router-dom";
import { PointsTabelContext } from "../context/PtsTableContext";

export const PtsTable = (props) => {
    const parameters = useParams();
    const {pointsTable, setPointsTable} = useContext(PointsTabelContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/pointstable/${parameters.year}`);
                setPointsTable(response.data.data.results);
            } 
            finally {
            }
        };
        fetchData();
    }, []);

return (
    <>
    <center><h1 style={{margin:20, fontSize:50}}>Points Table - {parameters.year}</h1></center>

    <div class="container-fluid table-responsive py-3 container">
        <div class="table-resposive">
        <table className="table table-hover table-bordered table-striped">
            <thead class="thead-dark">
                <tr className="bg-primary">
                    <th scope="col">Team Name</th>
                    <th scope="col">Match Played</th>
                    <th scope="col">Won</th>
                    <th scope="col">Lost</th>
                    <th scope="col">Tied</th>
                    <th scope="col">NRR</th>
                    <th scope="col">Points</th>
                </tr>
            </thead>
            <tbody>
                {pointsTable && pointsTable.map(el => {return(
                     <tr key = {el.team_id}>
                    <td>{el.team_name}</td>
                    <td>{el.match_played}</td>
                    <td>{el.won}</td>
                    <td>{el.lost}</td>
                    <td>{el.tied}</td>
                    <td>{el.nrr}</td>
                    <td>{el.pts}</td>
                 </tr>
                )
                })}
            </tbody>
        </table>
        </div>
    </div>
    </>
    );
};

export default PtsTable;
