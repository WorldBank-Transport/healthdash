import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import PopulationStore from '../../stores/population';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const HealthWorkersRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    hrwDensities: PropTypes.array,
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
    IntlMixin,
  ],

  getTotalWorkers(summary) {
    if (this.props.data.length > 0) {
      return Object.keys(summary).reduce( (ret, item) => {
        ret.total += summary[item].value;
        return ret;
      }, {total: 0}).total;
    } else {
      return 0;
    }
  },

  getPopulation() {
    return Result.sumBy(this.state.population, 'TOTAL').TOTAL;
  },

  renderDensities(selectedRegion) {
    return (
      <div>
        <span className="flyout-label"><T k="flyout.workers.densities"/></span>
        <ul>
          {this.props.hrwDensities
            .filter(item => item['HEALTH WORKERS'] !== 'TOTAL POPULATION')
            .map(item => (<li><span className="flyout-label">{item['HEALTH WORKERS']}</span><span className="flyout-data"><FormattedNumber value={item[selectedRegion]}/></span></li>))
          }
        </ul>
      </div>
    );
  },

  renderLoading() {
    return (<h3 className="panel-system-message"><T k="right-panel.loading"/></h3>);
  },

  renderNotFound(id) {
    return (<h3 className="panel-system-message">{id} <T k="right-panel.not-found"/></h3>);
  },

  renderNational() {
    if (this.props.data.length === 0) {
      return false;
    }
    const keys = Object.keys(this.props.data[0]).filter(key => key !== 'HEALTH WORKERS' && key !== 'YEAR' && key !== '_id');
    const summary = Result.sumByAll(this.props.data, keys);
    return (
      <div className="container other-selections">
        <h3><T k="data-type.health-workers" /></h3>
        <div className="row">
          <MetricSummary icon="workers.png" metric={this.getTotalWorkers(summary)} title="chart.workers.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="workers.png" metric={Math.round(this.getTotalWorkers(summary) / keys.length)} title="chart.workers-avg.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="workers.png" metric={Math.round(this.getPopulation() / this.getTotalWorkers(summary))} title="chart.workers-people.title"/>
        </div>
      </div>);
  },

  renderRegion(selected) {
    const header = AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => Maybe.match(details.properties.data, {
          None: () => this.renderNotFound(details.id),
          Some: data => {
            const workers = data.value;
            const population = Result.sumBy(this.state.population.filter(r => r.REGION === selected.id), 'TOTAL').TOTAL;
            return (<div>
              <div className="row">
                <MetricSummary icon="workers.png" metric={workers} title="chart.workers.title"/>
              </div>
              <div className="row">
                <MetricSummary icon="workers.png" metric={Math.round(population / workers)} title="chart.workers-people.title"/>
              </div></div>);
          },
        }),
      }),
      [_]: this.renderLoading,
    });
    return (
      <div className="container other-selections">
        <h3><T k="data-type.health-workers" /> {selected.id}</h3>
        {header}
        <div className="row">{this.renderDensities(selected.id)}</div>
      </div>
    );
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => this.renderNational(),
      Some: (selected) => this.renderRegion(selected),
    });
  },

});

export default HealthWorkersRightPanel;
