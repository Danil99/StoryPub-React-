import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NotFound from './components/NotFound';

import PhotoGrid from './containers/PhotoGridContainer';
import PersonalPage from './containers/PersonalPageContainer';
import LoginContainer from './containers/LoginContainer';
import HeaderContainer from './containers/HeaderContainer';
import AccountPageContainer from './containers/AccountPageContainer';
import SettingsContainer from './containers/SettingsContainer';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          {
            Boolean(localStorage.jwtToken) ?
              <Route path="/" component={HeaderContainer} />
                :
                  false
          }

          <Switch>
            <Route path="/settings" component={SettingsContainer} />

            {
              Boolean(localStorage.jwtToken) ?
                <Redirect from="/login" to="/" />
                  :
                    false
            }
            <Route path="/login" component={LoginContainer} />
            {
              !Boolean(localStorage.jwtToken) ?
                <Redirect from="/" to="/login" />
                  :
                    false
            }

            <Route exact path="/:user" component={AccountPageContainer} />

            <Route exact path="/" component={PhotoGrid} />
            <Route path="/view/:title" component={PersonalPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App;
