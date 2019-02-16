import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Feed from './pages/Feed';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/feed" component={Feed} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
