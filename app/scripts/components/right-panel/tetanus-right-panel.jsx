import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';

const TetanusRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  getTetanus() {
    return Result.sumBy(this.props.data, 'TT2 VACCINATION COVERAGE')['TT2 VACCINATION COVERAGE'];
  },

  render() {
    return (
      <div className="container other-selections">
        <div className="row">
          <MetricSummary icon="tetanus.png" metric={this.getTetanus()} title="chart.tetanus.title"/>
        </div>
      </div>);
  },
});

export default TetanusRightPanel;
