import React from 'react';
import VenueStat1 from '../components/Venue_stat_average_first_inning';
import VenueStat2 from '../components/Venue_stat_basic_info';
import VenueStat3 from '../components/Venue_stat_match_outline';


export const Venue_stats = () => {
  return <div>
      <VenueStat1/>
      <VenueStat2/>
      <VenueStat3/>
  </div>;
};

export default Venue_stats;