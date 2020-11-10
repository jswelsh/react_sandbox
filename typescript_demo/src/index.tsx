
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserList } from './UserList';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<BrowserRouter>
  <Switch>
    <Route
      exact
      path='/'
      render={(props) => <App userType='admin' username='h4x0r' {...props} />}
    />
  </Switch>
  <Switch>
    <Route
      exact
      path='/userlist'
      render={(props) => <UserList {...props} />}
    />
  </Switch>
</BrowserRouter>,
document.getElementById('root')
);

//serviceWorker.unregister();