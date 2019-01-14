import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Stories from './Stories';
import SearchStories from './SearchStories';

const Index = () => <div>
<div className="interactions">
      <SearchStories />
    </div>
    <Stories /></div>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
const NoMatch = () => <h2>No Match</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Redirect to="/" />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
