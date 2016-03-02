/*eslint-disable react/no-set-state */
import React, { PropTypes } from 'react';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import T from '../misc/t';
import FacilitiesFlyout from './facilities-flyout';
import FamilyPlanningFlyout from './family-planning-flyout';
import DeliveriesFlyout from './deliveries-flyout';
import TetanusFlyout from './tetanus-flyout';
import HealthWorkerFlyout from './health-worker-flyout';
import { Result } from '../../utils/functional';
import Rating from './rating';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/dashboard/flyout');


const Flyout = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    hover: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    hrwDensities: PropTypes.array,
    population: PropTypes.array,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [IntlMixin],

  renderLoading() {
    return (
      <h3>Loading data...</h3>
    );
  },

  renderNotFound(id) {
    return (
      <span className="flyout-section">Could not find data for <h3>'{id}'</h3></span>
    );
  },

  renderPointsPopup(details) {
    return (
      <div>
        <header>
          <h2><T k="flyout.facility-name"/></h2><p className="word">{details.FACILITY_NAME}</p>
        </header>
        <div className="flyout-section"><h3><T k="flyout.id"/></h3><p className="word">{details.FACILITY_ID_NUMBER}</p></div>
        <div className="flyout-section"><h3><T k="flyout.rating"/></h3><p className="word"><Rating facility={details} /></p></div>
        <div className="flyout-section"><h3><T k="flyout.common-name"/></h3><p className="word">{details['COMMON FACILITY HEALTH NAME']}</p></div>
        <div className="flyout-section"><h3><T k="flyout.type"/></h3><p className="word">{details['FACILITY TYPE']}</p></div>
        <div className="flyout-section"><h3><T k="flyout.ownership"/></h3><p className="word">{details.OWNERSHIP}</p></div>
        <div className="flyout-section"><h3><T k="flyout.status"/></h3><p className="word">{details.OPERATING_STATUS}</p></div>
        <div className="flyout-section"><h3><T k="flyout.location"/></h3><p className="word">{JSON.stringify(details.position)}</p></div>
        <div className="flyout-section"><h3><T k="flyout.council"/></h3><p className="word">{details.COUNCIL}</p></div>
        <div className="flyout-section"><h3><T k="flyout.zone"/></h3><p className="word">{details.ZONE}</p></div>
        <div className="flyout-section"><h3><T k="flyout.region"/></h3><p className="word">{details.REGION}</p></div>
      </div>);
  },

  defaultPolyRender(region, number, title, population) {
    return (<div>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.region"/>:</span><span className="flyout-data">{region}</span></span>
        <span className="flyout-section"><span className="flyout-label"><T k={title}/>:</span><span className="flyout-data"><FormattedNumber value={number} /></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.population"/>:</span><span className="flyout-data"><FormattedNumber value={population} /></span></span>
      </div>);
  },

  renderPolygonsPopup(details) {
    const polyType = ViewModes.getDrillDown(this.props.viewMode);
    const popAgg = Result.sumByGroupBy(this.props.population, polyType, ['TOTAL']);
    const popPoly = popAgg[details.id] || [{TOTAL: 0}];

    return Maybe.match(details.properties.data, {
      None: () => this.renderNotFound(details.id),
      Some: data => DataTypes.match(this.props.dataType, {
        Death: () => this.defaultPolyRender(details.id, data.value, 'flyout.death.length', popPoly[0].TOTAL),
        FamilyPlanning: () => (<FamilyPlanningFlyout data={data} region={details.id}/>),
        Deliveries: () => (<DeliveriesFlyout data={data} region={details.id}/>),
        HealthWorkers: () => (<HealthWorkerFlyout data={data} hrwDensities={this.props.hrwDensities} population={popPoly[0].TOTAL} region={details.id}/>),
        IPD: () => this.defaultPolyRender(details.id, data.value, 'flyout.ipd.length', popPoly[0].TOTAL),
        OPD: () => this.defaultPolyRender(details.id, data.value, 'flyout.opd.length', popPoly[0].TOTAL),
        Tetanus: () => (<TetanusFlyout data={data} region={details.id}/>),
        HivCenter: () => this.defaultPolyRender(details.id, data.length, 'flyout.hiv.length', popPoly[0].TOTAL),
        Facilities: () => (<FacilitiesFlyout data={data} population={popPoly[0].TOTAL} region={details.id}/>),
        [_]: () => (<div><h3>Poly flyout</h3>{JSON.stringify(data)}</div>),
      }),
    });
  },

  render() {
    return Maybe.match(this.props.hover, {
      None: () => (  // no popup selected, render nothing
        <div style={{display: 'none'}}></div>
      ),
      Some: selected => (
      <div className="flyout">
        <div className="flyout-inner">
          {AsyncState.match(selected.loadState, {
            Finished: () => Maybe.match(selected.details, {
              None: () => this.renderNotFound(selected.id),
              Some: details => ViewModes.match(this.props.viewMode, {
                Points: () => this.renderPointsPopup(details),
                [_]: () => this.renderPolygonsPopup(details),
              }),
            }),
            [_]: this.renderLoading,
          })}
        </div>
      </div>
      ),
    });
  },
});

export default Flyout;
