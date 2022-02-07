import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
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
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

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
    <div>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
      </head>
      <Router>
      <Navbar bg="dark" variant="dark" sticky="top">
                                <Navbar.Brand href="/matches">IITCricInfo</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto">
                                    <Nav.Link href="/matches">Matches</Nav.Link>
                                    <Nav.Link href="/venues">Venues</Nav.Link>
                                    <Nav.Link href="/venues/add">Add Venue</Nav.Link>
                                    <NavDropdown title="Points Table" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/pointstable/2011">2011</NavDropdown.Item>
                                        <NavDropdown.Item href="/pointstable/2013">2013</NavDropdown.Item>
                                        <NavDropdown.Item href="/pointstable/2015">2015</NavDropdown.Item>
                                        <NavDropdown.Item href="/pointstable/2017">2017</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
        <Switch><Route exact path="/">
        <Redirect to="/matches"/>
        </Route>
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