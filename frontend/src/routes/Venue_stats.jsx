import React from 'react';
import VenueStat3 from '../components/Venue_stat_average_first_inning';
import VenueStat1 from '../components/Venue_stat_basic_info';
import VenueStat2 from '../components/Venue_stat_match_outline';


export const Venue_stats = () => {
  return <div>
    <br></br>
    <center>
    <h2>
      Basic Information
    </h2>
    </center>
      <VenueStat1/>
      <br></br>
      <div class="container">
      <div class="row">
        <div class="col-sm">
          <center>
          <h2>
          Outline of matches
          </h2>
          </center>
          <VenueStat2/>
        </div>
        <div class="col-sm">
        <center>
        <h2>
        Average First Innings Score
        </h2>
        </center>
        <VenueStat3/>
        </div>
      </div>
    </div>
  </div>;
};

export default Venue_stats;