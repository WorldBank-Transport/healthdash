import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import YearSelector from '../filters/year-selector';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';

const OpdRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalOpd() {
    if (this.props.data.length > 0) {
      const keys = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
      const summary = Result.sumByAll(this.props.data, keys);
      return Object.keys(summary).reduce( (ret, item) => {
        ret.total += summary[item].value;
        return ret;
      }, {total: 0}).total;
    } else {
      return 0;
    }
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <MetricSummary icon="opd.png" metric={this.getTotalOpd()} title="chart.opd.title"/>
        </div>
      </div>);
  },
});

export default OpdRightPanel;
