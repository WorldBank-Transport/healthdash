import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import HealthFacilitiesCharts from './health-facilities-charts';
import HivChart from './hiv-barchar';
import DeathCharts from './death-charts';
import DeliveriesBarChart from './deliveries-barchar';
import FamilyCharts from './family-charts';
import HealthWorkersBarChart from './health-workers-barchart';
import IpdByAgeChart from './ipd-by-age-chart';
import OpdByAgeChart from './opd-by-age-chart';
import TetanusBarChart from './tetanus-barchar';

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
            Death: () => (<DeathCharts {...this.props}/>),
            FamilyPlanning: () => (<FamilyCharts {...this.props}/>),
            Deliveries: () => (<DeliveriesBarChart {...this.props}/>),
            HealthWorkers: () => (<HealthWorkersBarChart {...this.props}/>),
            IPD: () => (<IpdByAgeChart {...this.props}/>),
            OPD: () => (<OpdByAgeChart {...this.props}/>),
            Tetanus: () => (<TetanusBarChart {...this.props}/>),
            HivCenter: () => (<HivChart {...this.props}/>),
            Facilities: () => (<HealthFacilitiesCharts {...this.props}/>),
          })}
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Charts;
