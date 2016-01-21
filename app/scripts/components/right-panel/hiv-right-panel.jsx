import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import PopulationStore from '../../stores/population';
import { Result } from '../../utils/functional';
import T from '../misc/t';

const HivRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
  ],

  getPopulation() {
    return Result.sumBy(this.state.population, 'TOTAL').TOTAL;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="container other-selections">
        <h3><T k="data-type.hiv-center"/></h3>
        <div className="row">
          <MetricSummary icon="hiv.png" metric={this.props.data.length} title="chart.hiv.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="hiv.png" metric={this.props.data.length / 25} title="chart.hiv-region.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="workers.png" metric={Math.round(this.getPopulation() / this.props.data.length)} title="chart.hiv-people.title"/>
        </div>
      </div>);
  },
});

export default HivRightPanel;
