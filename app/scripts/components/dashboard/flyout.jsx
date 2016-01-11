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

require('stylesheets/dashboard/flyout');


const Flyout = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  renderLoading() {
    return (
      <h3>Loading data...</h3>
    );
  },

  renderNotFound(id) {
    return (
      <h3>Could not find data for id '{id}'</h3>
    );
  },

  renderPointsPopup(details) {
    return (
      <div>
        <span className="flyout-section"><T k="flyout.facility-name"/><h3>{details.FACILITY_NAME}</h3></span>
        <span className="flyout-section"><T k="flyout.id"/>: <h3>{details.FACILITY_ID_NUMBER}</h3></span>
        <span className="flyout-section"><T k="flyout.common-name"/>: <h3>{details['COMMON FACILITY HEALTH NAME']}</h3></span>
        <span className="flyout-section"><T k="flyout.type"/>: <h3>{details['FACILITY TYPE']}</h3></span>
        <span className="flyout-section"><T k="flyout.ownership"/>: <h3>{details.OWNERSHIP}</h3></span>
        <span className="flyout-section"><T k="flyout.status"/>: <h3>{details.OPERATING_STATUS}</h3></span>
        <span className="flyout-section"><T k="flyout.location"/>: <h3>{JSON.stringify(details.position)}</h3></span>
        <span className="flyout-section"><T k="flyout.council"/>: <h3>{details.COUNCIL}</h3></span>
        <span className="flyout-section"><T k="flyout.zone"/>: <h3>{details.ZONE}</h3></span>
        <span className="flyout-section"><T k="flyout.region"/>: <h3>{details.REGION}</h3></span>
      </div>);
  },

  defaultPolyRender(region, number, title) {
    return (<div>
        <span className="flyout-section"><T k="flyout.region"/>: <h3>{region}</h3></span>
        <span className="flyout-section"><T k={title}/>: <h3>{number}</h3></span>
      </div>);
  },

  renderPolygonsPopup(details) {
    return Maybe.match(details.properties.data, {
      None: () => this.renderNotFound(details.id),
      Some: data => DataTypes.match(this.props.dataType, {
        Death: () => this.defaultPolyRender(details.id, data.value, 'flyout.death.length'),
        FamilyPlanning: () => (<FamilyPlanningFlyout data={data} region={details.id}/>),
        Deliveries: () => (<DeliveriesFlyout data={data} region={details.id}/>),
        HealthWorkers: () => this.defaultPolyRender(details.id, data.value, 'flyout.workers.length'),
        IPD: () => this.defaultPolyRender(details.id, data.value, 'flyout.ipd.length'),
        OPD: () => this.defaultPolyRender(details.id, data.value, 'flyout.opd.length'),
        Tetanus: () => (<TetanusFlyout data={data} region={details.id}/>),
        HivCenter: () => this.defaultPolyRender(details.id, data.length, 'flyout.hiv.length'),
        Facilities: () => (<FacilitiesFlyout data={data} region={details.id}/>),
        [_]: () => (<div><h3>Poly flyout</h3>{JSON.stringify(data)}</div>),
      }),
    });
  },

  render() {
    return Maybe.match(this.props.selected, {
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
