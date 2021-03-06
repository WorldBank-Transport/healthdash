import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import MetricSummaryList from './metric-summary-list';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const DeathRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalDeath(summary) {
    return Object.keys(summary).reduce( (ret, item) => {
      ret.total += summary[item].value;
      return ret;
    }, {total: 0}).total;
  },

  sumDeath(summary) {
    return summary.reduce( (ret, item) => {
      ret.total += item[Object.keys(item).filter(key => key !== 'total')];
      return ret;
    }, {total: 0}).total;
  },

  getDeathCauses(keys) {
    const summary = Result.sumByGroupBy(this.props.data, 'DISEASE', keys);
    const deseases = Object.keys(summary).map(desease => ({
      name: desease,
      value: this.sumDeath(summary[desease], keys),
    })).sort((a, b) => b.value - a.value);
    return deseases.slice(0, 5);
  },

  renderLoading() {
    return (<h3 className="panel-system-message"><T k="right-panel.loading"/></h3>);
  },

  renderNotFound(id) {
    return (<h3 className="panel-system-message">{id} <T k="right-panel.not-found"/></h3>);
  },

  renderRegion(selected) {
    const body = AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => {
          return Maybe.match(details.properties.data, {
            None: () => this.renderNotFound(details.id),
            Some: data => {
              const death = data.value;
              const desease = {
                values: this.getDeathCauses([selected.id]),
                total: death,
              };
              return (<div>
                <div className="row">
                  <MetricSummary icon="deaths.png" metric={death} title="chart.deaths.title"/>
                </div>
                <div className="row">
                  <MetricSummaryList metric={desease} showPercentage={true} title="chart.death-deseases.title"/>
                </div>
              </div>);
            },
          });
        },
      }),
      [_]: this.renderLoading,
    });
    return (
      <div className="container other-selections">
        <h3><T k="data-type.death" /> {selected.id}</h3>
        {body}
      </div>);
  },

  renderNational() {
    if (this.props.data.length === 0) {
      return false;
    }
    const regions = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASE' && key !== 'YEAR' && key !== '_id');
    const summary = Result.sumByAll(this.props.data, regions);
    const death = this.getTotalDeath(summary);
    const desease = {
      values: this.getDeathCauses(regions),
      total: death,
    };
    return (
      <div className="container other-selections">
      <h3><T k="data-type.death" /></h3>
        <div className="row">
          <div className="col-half">
            <MetricSummary icon="deaths.png" metric={death} title="chart.deaths.title"/>
          </div>
          <div className="col-half">
            <MetricSummary icon="deaths.png" metric={Math.round(death / regions.length)} title="chart.deaths-avg.title"/>
          </div>
        </div>
        <div className="row">
          <MetricSummaryList metric={desease} showPercentage={true} title="chart.death-deseases.title"/>
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

export default DeathRightPanel;
