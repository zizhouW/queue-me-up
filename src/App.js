import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import CreateQueue from "./pages/create-queue/CreateQueue";
import Home from "./pages/home/Home";
import Queue from "./pages/queue/Queue";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create">
            <CreateQueue />
          </Route>
          <Route path="/queue/:queueId">
            <Queue />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
