import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import HealthFacilitiesChart from './health-facilities-barchar';
import HivChart from './hiv-barchar';
import DeathByAgeChart from './death-by-age-chart';
import DeliveriesBarChart from './deliveries-barchar';
import FamilityBarChart from './family-barchar';
import HealthWorkersBarChart from './health-workers-barchart';
import IpdByAgeChart from './ipd-by-age-chart';
import OpdByAgeChart from './opd-by-age-chart';
import TetanusBarChart from './tetanus-barchar';
import MetricSelector from '../filters/metric-selector';

require('stylesheets/charts/charts');

const Charts = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    metrics: PropTypes.object,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="charts">
          {DataTypes.match(this.props.dataType, {
            Death: () => (<DeathByAgeChart {...this.props}/>),
            FamilyPlanning: () => (<FamilityBarChart {...this.props}/>),
            Deliveries: () => (<DeliveriesBarChart {...this.props}/>),
            HealthWorkers: () => (<HealthWorkersBarChart {...this.props}/>),
            IPD: () => (<IpdByAgeChart {...this.props}/>),
            OPD: () => (<OpdByAgeChart {...this.props}/>),
            Tetanus: () => (<TetanusBarChart {...this.props}/>),
            HivCenter: () => (<HivChart {...this.props}/>),
            Facilities: () => (<HealthFacilitiesChart {...this.props}/>),
          })}
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Charts;
