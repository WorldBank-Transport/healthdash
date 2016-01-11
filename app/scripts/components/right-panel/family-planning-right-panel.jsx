import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';

const FamilyPlanningRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  getFamilyPlanningTotal() {
    return Result.sumBy(this.props.data, 'TOTAL FAMILY PLANNING CLIENTS')['TOTAL FAMILY PLANNING CLIENTS'];
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <MetricSummary icon="family.png" metric={this.getFamilyPlanningTotal()} title="chart.family-planning.title"/>
        </div>
      </div>);
  },
});

export default FamilyPlanningRightPanel;
