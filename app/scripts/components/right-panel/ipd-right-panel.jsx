import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const IpdRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalIpd(keys) {
    const summary = Result.sumByAll(this.props.data, keys);
    return Object.keys(summary).reduce( (ret, item) => {
      ret.total += summary[item].value;
      return ret;
    }, {total: 0}).total;
  },

  getTotalIpdByAge(statsByAge, keys) {
    return statsByAge.reduce( (ret, item, i) => {
      ret.total += item[keys[i]];
      return ret;
    }, {total: 0}).total;
  },

  renderLoading() {
    return (<h3><T k="right-panel.loading"/></h3>);
  },

  renderNotFound(id) {
    return (<h3>{id} <T k="right-panel.not-found"/></h3>);
  },

  renderRegion(selected) {
    return AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => Maybe.match(details.properties.data, {
          None: () => this.renderNotFound(details.id),
          Some: data => {
            const statsByAge = Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', [selected.id]);
            return (
              <div className="container other-selections">
                <h3><T k="data-type.ipd"/> {selected.id}</h3>
                <div className="row">
                  <MetricSummary icon="ipd.png" metric={data.value} title="chart.ipd.title"/>
                </div>
                <ul className="ipd-list">
                {Object.keys(statsByAge).map(age => (
                  <li>
                    <MetricSummary icon="ipd.png" metric={statsByAge[age][0][selected.id]} title={`chart.ipd-${age}.title`}/>
                  </li>
                ))}
                </ul>
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
    const keys = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    const statsByAge = Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', keys);
    const total = this.getTotalIpd(keys);
    return (
      <div className="container other-selections">
      <h3><T k="data-type.ipd"/></h3>
        <div className="row">
          <MetricSummary icon="ipd.png" metric={total} title="chart.ipd.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="ipd.png" metric={Math.round(total / keys.length)} title="chart.ipd-region.title"/>
        </div>
        <ul className="ipd-list">
        {Object.keys(statsByAge).map(age => (
          <li>
            <MetricSummary icon="ipd.png" metric={this.getTotalIpdByAge(statsByAge[age], keys)} title={`chart.ipd-${age}.title`}/>
          </li>
        ))}
        </ul>
      </div>);
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => this.renderNational(),
      Some: (selected) => this.renderRegion(selected),
    });
  },
});

export default IpdRightPanel;
