import React from 'react';
import VenueStat3 from '../components/Venue_stat_average_first_inning';
import VenueStat1 from '../components/Venue_stat_basic_info';
import VenueStat2 from '../components/Venue_stat_match_outline';


export const Venue_stats = () => {
  return <div>
    <h2>
      Basic Information
    </h2>
      <VenueStat1/>
      <h2>
      Outline of matches
    </h2>
      <VenueStat2/>
      <h2>
      Average First Innings Score
    </h2>
      <VenueStat3/>
  </div>;
};

export default Venue_stats;