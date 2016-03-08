import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import PopulationStore from '../../stores/population';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const HivRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
  ],

  getPopulation() {
    return Result.sumBy(this.state.population, 'TOTAL').TOTAL;
  },

  renderLoading() {
    return (<h3 className="panel-system-message"><T k="right-panel.loading"/></h3>);
  },

  renderNotFound(id) {
    return (<h3 className="panel-system-message">{id} <T k="right-panel.not-found"/></h3>);
  },

  renderRegion(selected) {
    return AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => Maybe.match(details.properties.data, {
          None: () => this.renderNotFound(details.id),
          Some: data => {
            const population = Result.sumBy(this.state.population.filter(r => r.REGION === selected.id), 'TOTAL').TOTAL;
            return (
              <div className="container other-selections">
                <h3><T k="data-type.hiv-center"/> {selected.id}</h3>
                <div className="row">
                  <MetricSummary icon="hiv.png" metric={data.length} title="chart.hiv.title"/>
                </div>
                <div className="row">
                  <MetricSummary icon="workers.png" metric={Math.round(population / data.length)} title="chart.hiv-people.title"/>
                </div>
              </div>);
          },
        }),
      }),
      [_]: this.renderLoading,
    });
  },

  renderNational() {
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

  render() {
    return Maybe.match(this.props.selected, {
      None: () => this.renderNational(),
      Some: (selected) => this.renderRegion(selected),
    });
  },

});

export default HivRightPanel;
