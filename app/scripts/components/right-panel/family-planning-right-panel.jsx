import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const FamilyPlanningRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    metrics: PropTypes.object, // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getFamilyPlanningTotal(key) {
    return Result.sumBy(this.props.data, key)[key] || 0;
  },

  renderLoading() {
    return (<h5 className="missing-data"><T k="right-panel.loading"/></h5>);
  },

  renderNotFound(id) {
    return (<h5 className="missing-data">{id} <T k="right-panel.not-found"/></h5>);
  },

  renderRegion(selected) {
    const metrics = this.props.metrics;
    return AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => Maybe.match(details.properties.data, {
          None: () => this.renderNotFound(details.id),
          Some: data => {
            return (
              <div className="container other-selections">
                <h3><T k="data-type.family-planning"/> {selected.id}</h3>
                <ul className="family-planning">
                {Object.keys(metrics)
                  .filter((m, i) => data[i].hasOwnProperty(m))
                  .map((metric, index) => (
                    <li>
                      <MetricSummary icon="family.png" metric={data[index][metric]} title={`chart.family-planning-${metric}.title`}/>
                    </li>
                  ))
                }
                </ul>
              </div>);
          },
        }),
      }),
      [_]: this.renderLoading,
    });
  },

  renderNational() {
    const data = this.props.data;
    return (
      <div className="container other-selections">
      <h3><T k="data-type.family-planning"/></h3>
      <ul className="family-planning">
      {Object.keys(this.props.metrics)
        .filter(m => data.length > 0 && data[0].hasOwnProperty(m))
        .map(metric => (
          <li>
            <MetricSummary icon="family.png" metric={this.getFamilyPlanningTotal(metric)} title={`chart.family-planning-${metric}.title`}/>
          </li>
        ))
      }
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

export default FamilyPlanningRightPanel;
