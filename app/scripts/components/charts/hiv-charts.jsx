import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import HivChart from './hiv-barchar';
import MetricSummary from './metric-summary-chart';


const HivCharts = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <MetricSummary icon="hiv.png" metric={this.props.data.length} title="chart.hiv.title"/>
        </div>
        <div className="row">
          <div className="mainChart">
            <HivChart facilities={this.props.data} viewMode={this.props.viewMode} />
          </div>
        </div>
      </div>);
  },
});

export default HivCharts;
