import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const OpdRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalOpd(keys) {
    const summary = Result.sumByAll(this.props.data, keys);
    return Object.keys(summary).reduce( (ret, item) => {
      ret.total += summary[item].value;
      return ret;
    }, {total: 0}).total;
  },

  getTotalOpdByAge(statsByAge, keys) {
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
                <h3><T k="data-type.opd"/> {selected.id}</h3>
                <div className="row">
                  <MetricSummary icon="opd.png" metric={data.value} title="chart.opd.title"/>
                </div>
                <ul className="opd-list">
                {Object.keys(statsByAge).map(age => (
                  <li>
                    <MetricSummary icon="opd.png" metric={statsByAge[age][0][selected.id]} title={`chart.opd-${age}.title`}/>
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
    const total = this.getTotalOpd(keys);
    const statsByAge = Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', keys);
    return (
      <div className="container other-selections">
      <h3><T k="data-type.opd"/></h3>
        <div className="row">
          <MetricSummary icon="opd.png" metric={total} title="chart.opd.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="opd.png" metric={Math.round(total / keys.length)} title="chart.opd-region.title"/>
        </div>
        <ul className="opd-list">
        {Object.keys(statsByAge).map(age => (
          <li>
            <MetricSummary icon="opd.png" metric={this.getTotalOpdByAge(statsByAge[age], keys)} title={`chart.opd-${age}.title`}/>
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

export default OpdRightPanel;
