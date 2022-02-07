import React, {useState, useEffect, useContext} from "react";
import Path from "../apis/Path";
import {MatchesContext} from "../context/MatchesContext";
import { useHistory } from "react-router-dom";

export const Match_list = (props) => {
    const history = useHistory();
    const {matches, setMatches} = useContext(MatchesContext);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ maxPageNo, setMaxPageNo ] = useState();

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get("/matches/");
                setMatches(response.data.data.matches);
                setMaxPageNo(Math.ceil(response.data.data.totalResults/10.0));
            } 
            finally {
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchNewData = async() => {
            try{
                const response = await Path.get(`/matches/page/${currentPage}`);
                setMatches(response.data.data.matches);
            } 
            finally {
            }
        };
        fetchNewData();
    }, [currentPage])
    
    const handleMatchSelect = (id) => {
        history.push(`/matches/${id}`);
    }

    const handlePrev = () => {
        if(currentPage>0)
            setCurrentPage(currentPage-1);
    }

    const handleNext = () => {
        if(currentPage<maxPageNo-1)
            setCurrentPage(currentPage+1);
    }

  return (
  <>
  <center><b><h1 style={{fontFamily: 'sans-serif', margin:30, fontSize:60}}>
      Match List
  </h1></b>
  </center>

  <div class="container-fluid table-responsive py-3" style={{paddingLeft:200, paddingRight:200}}>
        <table className="table table-hover table-bordered table-striped" id="match_list">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" class="col-2">Team 1</th>
                    <th scope="col" class="col-2">Team 2</th>
                    <th scope="col" class="col-3">Stadium Name</th>
                    <th scope="col" class="col-2">City Name</th>
                    <th scope="col" class="col-3">Result</th>
                </tr>
            </thead>
            <tbody>
                {matches && matches.map(el => {return(
                     <tr onClick={() => handleMatchSelect(el.match_id)} key = {el.match_id}>
                    <td>{el.team1}</td>
                    <td>{el.team2}</td>
                    <td>{el.stadium_name}</td>
                    <td>{el.city_name}</td>
                    <td>{el.result}</td>
                 </tr>
                )
                })}
            </tbody>
        </table>
  </div>


  <div class="container w-25">

    <center>
    <div class="row">
    <div class="col">
    <button type="button" class="btn btn-primary btn-lg " onClick={() => handlePrev()}>
        Previous
    </button>
    </div>
    <div class="col">
    <button type="button" class="btn btn-primary btn-lg" onClick={() => handleNext()}>
        Next
    </button>
    </div>
    </div>
    </center>
  </div>
  </>
  );
};

export default Match_list;
