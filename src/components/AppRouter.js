import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Trans } from '@lingui/macro';

import Stories from './Stories';
import SearchStories from './SearchStories';
import Map from './Map';
import ContactPage from './ContactPage';
import { i18n } from '../i18n';
import { doAddWorks } from '../actions/map';
import { connect } from 'react-redux';

const Index = () => <div>
    <div className="interactions">
      <SearchStories />
    </div>
    <Stories />
</div>;
const About = () => <Map></Map>;
const Users = () => <ContactPage></ContactPage>;
const NoMatch = () => <h2>No Match</h2>;

const switchLang = function(lang) {
    i18n.activate(lang);
}

const AppRouter = ({ onAddWorks }) => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"><Trans>Home</Trans></Link>
          </li>
          <li>
            <Link to="/about/"><Trans>Map</Trans></Link>
          </li>
          <li>
            <Link to="/users/"><Trans>Contact</Trans></Link>
          </li>
          <li>
            <button onClick={() => switchLang('fr')}>FR</button>
          </li>
          <li>
            <button onClick={() => switchLang('nl')}>NL</button>   
          </li>
          <li>
            <button onClick={() => onAddWorks(['coucou', 'hey'])}>RefreshMapValue</button>
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

const mapDispatchToProps = (dispatch) => ({
  onAddWorks: works => dispatch(doAddWorks(works)),
});


export default connect(
  undefined,
  mapDispatchToProps
)(AppRouter);


// export default AppRouter;
