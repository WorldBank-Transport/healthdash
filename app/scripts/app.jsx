/* eslint react/jsx-sort-props: 0 */  // Routes: path, component order is nicer
import React from 'react';
//import 'babel-core/polyfill';
import Router, { Redirect, Route } from 'react-router';
import history from './history';
// Route components
import Root from './components/root';
// static page components:
import StaticLayout from './components/static/layout';
import Homepage from './components/static/homepage';
import Data from './components/static/data';
import SpeakOut from './components/static/speak-out';
import NotFound from './components/static/not-found';
// dashboard views
import DashRoot from './components/dashboard/dash-root';


React.render((
  <Router history={history}>
    <Route component={Root}>

      <Route component={StaticLayout}>
        <Route path="/" component={Homepage} />
        <Route path="data/" component={Data} />
        <Route path="speak-out/" component={SpeakOut} />
      </Route>

      <Route path="/dash/" component={DashRoot}>
        {/*<Route path="points/health/" component={PointsMap}/>*/}
      </Route>

      <Route component={StaticLayout}>
        <Route path="*" component={NotFound} />
      </Route>

    </Route>
  </Router>
), document.body);
