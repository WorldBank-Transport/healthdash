import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import DeathRightPanel from './death-right-panel';
import FacilitiesRightPanel from './facilities-right-panel';
import HivRightPanel from './hiv-right-panel';

import DeliveriesRightPanel from './deliveries-right-panel';
import FamilyPlanningRightPanel from './family-planning-right-panel';
import HealthWorkersRightPanel from './health-workers-right-panel';
import IpdRightPanel from './ipd-right-panel';
import OpdRightPanel from './opd-right-panel';
import TetanusRightPanel from './tetanus-right-panel';
import MetricSelector from '../filters/metric-selector';

require('stylesheets/right-panel/right-panel');

const RightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    metrics: PropTypes.object,  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return (
        <div className="right-panel">
          <MetricSelector metrics={this.props.metrics}/>
          {DataTypes.match(this.props.dataType, {
            Death: () => (<DeathRightPanel {...this.props}/>),
            FamilyPlanning: () => (<FamilyPlanningRightPanel {...this.props}/>),
            Deliveries: () => (<DeliveriesRightPanel {...this.props}/>),
            HealthWorkers: () => (<HealthWorkersRightPanel {...this.props}/>),
            IPD: () => (<IpdRightPanel {...this.props}/>),
            OPD: () => (<OpdRightPanel {...this.props}/>),
            Tetanus: () => (<TetanusRightPanel {...this.props}/>),
            HivCenter: () => (<HivRightPanel {...this.props}/>),
            Facilities: () => (<FacilitiesRightPanel {...this.props}/>),
          })}
        </div>
      );
  },
});

export default RightPanel;