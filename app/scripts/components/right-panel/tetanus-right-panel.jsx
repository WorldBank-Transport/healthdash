import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const metrics = ['TT2 VACCINATION COVERAGE', 'TOTAL ATTENDANCE', 'TT2 VACCINATION COVERAGE', '% TT2 VACCINATION COVERAGE'];
const selectedMetrics = ['PROJECTED CLIENTS', 'TOTAL ATTENDANCE', 'TT2 VACCINATION COVERAGE', '% TT2 VACCINATION COVERAGE'];

const TetanusRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTetanusValue(stats, m) {
    return Math.round(stats[m].value || 0);
  },

  renderLoading() {
    return (<h5 className="missing-data"><T k="right-panel.loading"/></h5>);
  },

  renderNotFound(id) {
    return (<h5 className="missing-data">{id} <T k="right-panel.not-found"/></h5>);
  },

  renderRegion(selected) {
    return AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => Maybe.match(details.properties.data, {
          None: () => this.renderNotFound(details.id),
          Some: data => {
            return (
              <div className="container other-selections">
                <h3><T k="data-type.tetanous"/> {selected.id}</h3>
                <ul className="tetanus-list">
                {selectedMetrics.map((m, i) => (
                  <li>
                    <MetricSummary icon="tetanus.png" metric={data[i][m]} title={`chart.tetanus-${m}.title`}/>
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
      </div>);
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => this.renderNational(),
      Some: (selected) => this.renderRegion(selected),
    });
  },
});

export default TetanusRightPanel;
