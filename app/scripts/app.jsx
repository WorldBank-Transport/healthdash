/*eslint-disable */
import React from 'react';
import Router, { Route } from 'react-router';
import 'babel-core/polyfill';
import 'intl';
import history from './history';
import DataTypes from './constants/data-types';
import ViewModes from './constants/view-modes';
import { setView } from './actions/view';
import { clear } from './actions/filters';
import { restoreShare } from './actions/share';
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
import PointsMap from './components/dashboard/points-map';
import PolygonsMap from './components/dashboard/polygons-map';

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setPointsView(nextState) {
  clear();
  setView({
    viewMode: ViewModes.Points(),
    dataType: DataTypes.fromParam(nextState.params.dataType),
  });
}

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setShare(nextState) {
  restoreShare(nextState.params.shareId);
}

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setPolysView(nextState) {
  clear();
  setView({
    viewMode: ViewModes.fromParam(nextState.params.polyType),
    dataType: DataTypes.fromParam(nextState.params.dataType),
  });
}

/**
 * @returns {void}
 */
function intlPoly() {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js'], function(require) {
      require('intl');
      require('intl/locale-data/jsonp/en');
    });
}

React.render((
  <Router history={history} onEnter={intlPoly}>
    <Route component={Root} onEnter={intlPoly}>

      <Route component={StaticLayout}>
        <Route path="/" component={Homepage} />
        <Route path="data/" component={Data} />
        <Route path="speak-out/" component={SpeakOut} />
        <Route path="share/:shareId/" component={Homepage} onEnter={setShare} />
      </Route>

      <Route path="/dash/" component={DashRoot} onEnter={intlPoly}>
        <Route path="points/:dataType/" component={PointsMap} onEnter={setPointsView} />
        <Route path=":polyType/:dataType/" component={PolygonsMap} onEnter={setPolysView} />
      </Route>

      <Route component={StaticLayout}>
        <Route path="*" component={NotFound} />
      </Route>

    </Route>
  </Router>
), document.body);
