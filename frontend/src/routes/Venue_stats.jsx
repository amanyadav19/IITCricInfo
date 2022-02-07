import React from 'react';
import VenueStat3 from '../components/Venue_stat_average_first_inning';
import VenueStat1 from '../components/Venue_stat_basic_info';
import VenueStat2 from '../components/Venue_stat_match_outline';


export const Venue_stats = () => {
  return <div>
    <br></br>

    <center><h1 style={{margin:20, fontSize:40}}>Basic Information</h1></center>
    <div class="container">
      <VenueStat1/>
      </div>
      <br></br>
      <div class="container">
      <div class="row">
        <div class="col-sm container-fluid">
        <center><h1 style={{margin:20, fontSize:40}}>Outline of matches</h1></center>
        <center><div  class="chart-container py-5 w-75">
          <VenueStat2/>
          </div>
        </center>
        </div>
        <div class="col-sm chart-container">
        <center><h1 style={{margin:20, fontSize:40}}>Average First Innings Score</h1></center>
        <center>
        <div  class="chart-container py-5 w-75">
        <VenueStat3/>
        </div>
        </center>
        </div>
      </div>
    </div>
  </div>;
};

export default Venue_stats;