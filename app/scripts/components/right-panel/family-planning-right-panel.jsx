import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';

const FamilyPlanningRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    metrics: PropTypes.object, // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  getFamilyPlanningTotal(key) {
    return Result.sumBy(this.props.data, key)[key] || 0;
  },

  render() {
    return (
      <div className="container other-selections">
      <h3><T k="data-type.family-planning"/></h3>
      <ul className="family-planning">
      {Object.keys(this.props.metrics)
        .filter(m => this.props.data > 0 && this.props.data.hasOwnProperty(m))
        .map(metric => (
          <li>
            <MetricSummary icon="family.png" metric={this.getFamilyPlanningTotal(metric)} title={`chart.family-planning-${metric}.title`}/>
          </li>
        ))
      }
      </ul>
      </div>);
  },
});

export default FamilyPlanningRightPanel;
