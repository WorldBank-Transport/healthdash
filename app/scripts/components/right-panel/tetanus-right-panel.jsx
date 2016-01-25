import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import ChartsLink from '../boilerplate/charts-link';
import T from '../misc/t';

const metrics = ['TT2 VACCINATION COVERAGE', 'TOTAL ATTENDANCE', 'TT2 VACCINATION COVERAGE', '% TT2 VACCINATION COVERAGE'];

const TetanusRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTetanusValue(stats, m) {
    return Math.round(stats[m].value || 0);
  },

  render() {
    const stats = Result.sumByAll(this.props.data, metrics);
    return (
      <div className="container other-selections">
        <h3><T k="data-type.tetanous"/></h3>
        <ul className="tetanus-list">
        {metrics.map(m => (
          <li>
            <MetricSummary icon="tetanus.png" metric={this.getTetanusValue(stats, m)} title={`chart.tetanus-${m}.title`}/>
          </li>
        ))}
        </ul>
        <div className="row">
          <button className="charts-trigger" href=""><ChartsLink /></button>
        </div>
      </div>);
  },
});

export default TetanusRightPanel;
