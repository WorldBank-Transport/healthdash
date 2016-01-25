import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import HealthFacilitiesCharts from './health-facilities-charts';
import HivChart from './hiv-barchar';
import DeathCharts from './death-charts';
import DeliveriesBarChart from './deliveries-barchar';
import FamilyCharts from './family-charts';
import HealthWorkersCharts from './health-workers-charts';
import IpdCharts from './ipd-charts';
import OpdCharts from './opd-charts';
import Tt2Charts from './tetanus-charts';
import HighCharts from 'highcharts';
import { Icon } from 'react-font-awesome';
import T from '../misc/t';

require('highcharts/modules/exporting')(HighCharts);
require('highcharts/modules/treemap')(HighCharts);
require('highcharts/modules/drilldown')(HighCharts);
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
            HealthWorkers: () => (<HealthWorkersCharts {...this.props}/>),
            IPD: () => (<IpdCharts {...this.props}/>),
            OPD: () => (<OpdCharts {...this.props}/>),
            Tetanus: () => (<Tt2Charts {...this.props}/>),
            HivCenter: () => (<HivChart {...this.props}/>),
            Facilities: () => (<HealthFacilitiesCharts {...this.props}/>),
          })}
          <button className="chart-close-btn"><Icon type={`times`}/><T k="charts.toggle.opened"/></button>
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Charts;
