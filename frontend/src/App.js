import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Matches from './routes/Matches';
import Venues from './routes/Venues';
import Venue_stats from './routes/Venue_stats';
import Create_venue from './routes/Create_venue';
import { PointsTabelContextProvider } from './context/PtsTableContext';
import { MatchSummaryContextProvider } from './context/MatchSummaryContext';
import { ScoreComparisonContextProvider } from "./context/ScoreComparisonContext";
import { MatchesContextProvider } from './context/MatchesContext';
import { VenuesContextProvider } from './context/VenuesContext';
import { VenueInfoContextProvider } from './context/VenueInfoContext';
import { VenueMatchOutlineContextProvider } from './context/VenueMatchOutlineContext';
import { VenueInningContextProvider } from './context/VenueInningContext';
import { PlayerInfoContextProvider } from './context/PlayerInfoContext';
import { PlayerBattingContextProvider } from './context/PlayerBattingContext';
import { PlayerBowlingContextProvider } from './context/PlayerBowlingContext';
import { PlayerBattingGraphContextProvider } from './context/PlayerBattingGraphContext';
import { PlayerBowlingGraphContextProvider } from './context/PlayerBowlingGraphContext';
import { MatchContextProvider } from './context/MatchContext';

import Match_info from './routes/Match_info';
import Player_info from './routes/Player_info';
import Points_Table from './routes/Points_Table';

function App() {
  return (
    <PlayerBattingGraphContextProvider>
    <PlayerBowlingGraphContextProvider>
    <PlayerInfoContextProvider>
    <PlayerBattingContextProvider>
    <PlayerBowlingContextProvider>
    <VenueInningContextProvider>
    <VenueMatchOutlineContextProvider>
    <VenueInfoContextProvider>
    <VenuesContextProvider>
    <MatchesContextProvider>
    <MatchContextProvider>
    <ScoreComparisonContextProvider>
    <MatchSummaryContextProvider>
    <PointsTabelContextProvider>
    <div className='container'>
    <head>
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
      </head>
      <Router>
        <Switch>
          <Route exact path="/matches" component={Matches}/>
          <Route exact path="/matches/:id" component={Match_info}/>
          <Route exact path="/venues" component={Venues}/>
          <Route exact path="/venue/:id" component={Venue_stats}/>
          <Route exact path="/venues/add" component={Create_venue}/>
          <Route exact path="/players/:id" component={Player_info}/>
          <Route exact path="/pointstable/:year" component={Points_Table}/>
        </Switch>
      </Router>
    </div>
    </PointsTabelContextProvider>
    </MatchSummaryContextProvider>
    </ScoreComparisonContextProvider>
    </MatchContextProvider>
    </MatchesContextProvider>
    </VenuesContextProvider>
    </VenueInfoContextProvider>
    </VenueMatchOutlineContextProvider>
    </VenueInningContextProvider>
    </PlayerBowlingContextProvider>
    </PlayerBattingContextProvider>
    </PlayerInfoContextProvider>
    </PlayerBowlingGraphContextProvider>
    </PlayerBattingGraphContextProvider>
  );
}

export default App;