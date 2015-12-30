import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import YearSelector from '../filters/year-selector';
import TetanusBarChart from './tetanus-barchar';
import MetricSummary from './metric-summary-chart';
import { Result } from '../../utils/functional';

const TetanusCharts = React.createClass({
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
      <div className="container">
        <div className="row">
          <YearSelector />
        </div>
        <div className="row">
          <MetricSummary icon="tetanus.png" metric={this.getTetanus()} title="chart.tetanus.title"/>
        </div>
        <div className="row">
          <div className="mainChart">
            <TetanusBarChart data={this.props.data} viewMode={this.props.viewMode} />
          </div>
        </div>
      </div>);
  },
});

export default TetanusCharts;