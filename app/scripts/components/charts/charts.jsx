import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import FacilitiesCharts from './facilities-charts';
import HivCharts from './hiv-charts';
import DeathCharts from './death-charts';
import DeliveriesCharts from './deliveries-charts';

require('stylesheets/charts/charts');

const Charts = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  renderDefault(type) { // TODO remove me when we finish with all types
    return (<h2>Charts for {type.toParam()}</h2>);
  },

  render() {
    return (
        <div className="charts">
          {DataTypes.match(this.props.dataType, {
            Death: () => (<DeathCharts {...this.props}/>),
            FamilyPlanning: () => this.renderDefault(this.props.dataType),
            Deliveries: () => (<DeliveriesCharts {...this.props}/>),
            HealthWorkers: () => this.renderDefault(this.props.dataType),
            IPD: () => this.renderDefault(this.props.dataType),
            OPD: () => this.renderDefault(this.props.dataType),
            Tetanous: () => this.renderDefault(this.props.dataType),
            HivCenter: () => (<HivCharts {...this.props}/>),
            Facilities: () => (<FacilitiesCharts {...this.props}/>),
          })}
        </div>
      );
  },
});

export default Charts;
